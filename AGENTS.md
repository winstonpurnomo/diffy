# diffy — Agent Notes

## Architecture Overview

We are a TanStack Start (Vite/Nitro) React frontend with a Rust (axum + ConnectRPC) backend. API types are shared via protobuf.

- **`apps/web`** — TanStack Start frontend. Runs on `http://localhost:3000`.
- **`apps/backend`** — Rust ConnectRPC service. Runs on `http://127.0.0.1:8080`.
- **`packages/rpc`** — Protobuf definitions (the API contract).
- **`apps/proto-watch`** — Watches `packages/rpc/**/*.proto` and regenerates TypeScript types while `pnpm dev` is running.

## Protobuf / Type Generation

The source of truth is `packages/rpc/**/*.proto`. We generate types for both Rust and TypeScript from these files.

### TypeScript (frontend)

- `buf.gen.yaml` configures `protoc-gen-es` and `protoc-gen-connect-query`.
- Output goes to `apps/web/src/_generated/`.
- Regenerate manually: `pnpm codegen` (or `pnpm --filter web codegen`).
- During `pnpm dev`, `apps/proto-watch` runs the same command on startup and whenever `.proto` files change.

### Rust (backend)

- `apps/backend/build.rs` compiles `../../packages/rpc/diffy/v1/diffy.proto` via `connectrpc_build`.
- Generated Rust files live under `target/debug/build/.../out` (Cargo `OUT_DIR`).
- `build.rs` includes `cargo:rerun-if-changed` directives so Cargo rebuilds when proto changes.
- During `pnpm dev`, `cargo watch` restarts the backend when proto, `build.rs`, or source changes.

## Frontend Wiring

### Router context (`apps/web/src/router.tsx`)

We create the transport and `QueryClient` in `getRouter()` and pass them through TanStack Router context:

```tsx
const backendUrl = import.meta.env.VITE_CONNECT_BASE_URL;
const queryClient = new QueryClient();
const transport = createConnectTransport({ baseUrl: backendUrl });

const router = createTanStackRouter({
  routeTree,
  context: { queryClient, transport },
});
```

### Root providers (`apps/web/src/routes/__root.tsx`)

The root route is defined with `createRootRouteWithContext` typed on `{ queryClient, transport }`. `RootDocument` pulls them from `useRouteContext()` and wraps the outlet:

```tsx
<TransportProvider transport={transport}>
  <QueryClientProvider client={queryClient}>
    <Outlet />
  </QueryClientProvider>
</TransportProvider>
```

This means any route can use `useQuery` from `@connectrpc/connect-query` without setting up providers again.

## Calling RPCs from Pages

Import generated descriptors and use `useQuery`:

```tsx
import { useQuery } from "@connectrpc/connect-query";
import { getGreeting } from "@/gen/diffy/v1/diffy-DemoService_connectquery";

const greeting = useQuery(getGreeting, { name: "Winston", attempt: 1 });
```

The test/demo page lives at `apps/web/src/routes/test.tsx` and is accessible at `/test`.

## Running Dev

```bash
pnpm dev
```

This starts Turbo in parallel:

- `apps/web` — Vite dev server (`vite dev --port 3000`)
- `apps/backend` — `cargo watch` + `cargo run`
- `apps/proto-watch` — watches proto files and regenerates TS types

## Adding or Changing RPCs

1. Edit `packages/rpc/**/*.proto`.
2. `proto-watch` regenerates TypeScript. `cargo watch` regenerates Rust types and restarts the backend.
3. Implement the new/changed handler in `apps/backend/src/main.rs`.
4. Use the generated types in the frontend. Type errors will surface in `pnpm typecheck` if shapes changed.

## Backend CORS

The CORS layer wraps the **full** Axum router (including the Connect fallback service). Required headers include:

- `content-type`
- `connect-protocol-version`
- `connect-timeout-ms`
- `x-user-agent`

This is already set up in `apps/backend/src/main.rs`.

## Important Files

| File                                | Role                                                           |
| ----------------------------------- | -------------------------------------------------------------- |
| `packages/rpc/diffy/v1/diffy.proto` | API contract                                                   |
| `apps/backend/build.rs`             | Rust codegen from proto                                        |
| `apps/backend/src/main.rs`          | Service implementation                                         |
| `apps/web/src/router.tsx`           | Creates transport + QueryClient, passes through router context |
| `apps/web/src/routes/__root.tsx`    | Renders providers from router context                          |
| `apps/web/src/routes/test.tsx`      | Demo page that calls the backend                               |
| `buf.yaml` / `buf.gen.yaml`         | Buf configuration for TS codegen                               |
| `turbo.json`                        | Dev task orchestration, CARGO_HOME/RUSTUP_HOME passthrough     |

## Turbo / Rust Notes

`turbo.json` passes through `CARGO_HOME` and `RUSTUP_HOME` so `cargo` resolves the same toolchain inside Turbo as in the shell. Without this, Turbo may use an older Rust toolchain.

## Editor Notes

Rust generated files are included via:

```rust
include!(concat!(env!("OUT_DIR"), "/_connectrpc.rs"));
```

The path points into `target/`, so editors can hold stale paths after `cargo clean`. In Zed, refresh Rust diagnostics with `editor: run flycheck`.

## Common Commands

```bash
pnpm dev          # Start full dev system
pnpm codegen      # One-off TS proto codegen
pnpm typecheck    # Check all workspace packages
pnpm --filter backend run typecheck   # cargo check
pnpm --filter web typecheck           # tsc --noEmit
```
