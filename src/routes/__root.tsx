import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Fehler 404</p>
        <h1 className="font-display text-6xl mt-4">Seite nicht gefunden</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 px-8 py-3 bg-foreground text-background font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl">Etwas ist schiefgelaufen</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Die Seite konnte nicht geladen werden.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-6 py-3 bg-foreground text-background font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-border font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-muted transition-colors"
          >
            Startseite
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Steiner & Co. — Bauunternehmen München" },
      {
        name: "description",
        content:
          "Steiner & Co. GmbH — Bauunternehmen aus München. Hochbau, Holzbau und Sanierung mit bayerischer Ingenieurskunst seit 1954.",
      },
      { name: "author", content: "Steiner & Co. GmbH" },
      { property: "og:title", content: "Steiner & Co. — Bauunternehmen München" },
      { property: "og:description", content: "Hochbau, Holzbau und Denkmalsanierung in München und Oberbayern. Seit 1954." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
