import type { Transport } from "@connectrpc/connect";
import { TransportProvider } from "@connectrpc/connect-query";
import { QueryClientProvider } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ThemeProvider } from "tanstack-theme-kit";

import appCss from "@diffy/ui/globals.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  transport: Transport;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/logo-mark.svg",
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
});

function RootDocument() {
  const { queryClient, transport } = Route.useRouteContext();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <TransportProvider transport={transport}>
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </TransportProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
