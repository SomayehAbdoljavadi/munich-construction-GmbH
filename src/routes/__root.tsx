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
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BrandIntro } from "@/components/BrandIntro";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gold">404</p>
        <h1 className="font-display text-5xl mt-4">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 px-8 py-3 bg-ink text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
        >
          Home
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
        <h1 className="font-display text-4xl">Something went wrong</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          We couldn't load this page.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-6 py-3 bg-ink text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
          >
            Retry
          </button>
          <a href="/" className="px-6 py-3 border border-border font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-muted transition-colors">
            Home
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
      { title: "Munich Construction GmbH — Hochwertiges Bauen in München" },
      {
        name: "description",
        content:
          "Munich Construction GmbH — Bauunternehmen aus München. Neubau, Renovierung, Sanierung, Brandschutz, Genehmigung und Werkplanung aus einer Hand.",
      },
      { name: "author", content: "Munich Construction GmbH" },
      { property: "og:title", content: "Munich Construction GmbH" },
      { property: "og:description", content: "Hochwertiges Bauen in München — Neubau, Sanierung, Brandschutz und Werkplanung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "shortcut icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GeneralContractor",
          name: "Munich Construction GmbH",
          url: "https://www.munichconstruction.de",
          telephone: "+49 89 57843675",
          email: "m.mardi@munichconstruction.de",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Theresienstraße 93",
            postalCode: "80333",
            addressLocality: "München",
            addressCountry: "DE",
          },
          areaServed: "München",
        }),
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mc-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}if(t==='dark'){document.documentElement.classList.add('dark');}document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
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
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <SiteHeader />
            <main className="flex-1">
              <Outlet />
            </main>
            <SiteFooter />
            <WhatsAppFloat />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
