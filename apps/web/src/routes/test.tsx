import { useQuery } from "@connectrpc/connect-query";
import { Button } from "@diffy/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw, Server, Wifi } from "lucide-react";
import { useState } from "react";

import { getGreeting } from "@/_generated/diffy/v1/diffy-DemoService_connectquery";

export const Route = createFileRoute("/test")({ component: TestPage });

function TestPage() {
  const [name, setName] = useState("Winston");
  const greeting = useQuery(
    getGreeting,
    { name, attempt: 1 },
    {
      refetchOnWindowFocus: false,
    }
  );
  const generatedAt = greeting.data?.generatedAtUnixMs
    ? new Date(Number(greeting.data.generatedAtUnixMs)).toLocaleTimeString()
    : null;

  return (
    <main className="min-h-svh bg-background">
      <section className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center gap-8 px-6 py-10">
        <div className="flex max-w-2xl flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Wifi className="size-4" aria-hidden="true" />
            ConnectRPC + Rust + TanStack Query
          </div>
          <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Rust backend, typed TS frontend.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            This page calls a Rust Connect service through generated TypeScript
            descriptors and Connect Query.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="name"
                className="h-10 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Button
                className="gap-2"
                disabled={greeting.isFetching}
                onClick={() => void greeting.refetch()}
              >
                <RefreshCw
                  className={`size-4 ${greeting.isFetching ? "animate-spin" : ""}`}
                  aria-hidden="true"
                />
                Refresh
              </Button>
            </div>

            <div className="mt-5 rounded-md border bg-muted/40 p-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Response
              </p>
              {greeting.isError ? (
                <p className="mt-2 text-sm text-destructive">
                  {greeting.error.message}
                </p>
              ) : (
                <p className="mt-2 text-lg font-medium">
                  {greeting.data?.message ?? "Waiting for the backend..."}
                </p>
              )}
            </div>
          </div>

          <aside className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Server className="size-4" aria-hidden="true" />
              Backend
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Base URL</dt>
              </div>
              <div>
                <dt className="text-muted-foreground">Served by</dt>
                <dd className="font-medium">
                  {greeting.data?.servedBy ?? "Unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Generated at</dt>
                <dd className="font-medium">{generatedAt ?? "Unavailable"}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </main>
  );
}
