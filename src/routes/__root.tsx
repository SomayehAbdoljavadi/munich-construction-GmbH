import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
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
import introGif from "@/assets/mc-intro.gif";

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
          email: "info@munichconstruction.de",
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
        <style
          dangerouslySetInnerHTML={{
            __html: `body.loading-active{margin:0;overflow:hidden;background:#000}body.loading-active .mc-app-root{opacity:0!important;visibility:hidden!important;pointer-events:none!important}body.loading-active .mc-app-root *,body.loading-active .mc-app-root *::before,body.loading-active .mc-app-root *::after,body.loading-leaving .mc-app-root *,body.loading-leaving .mc-app-root *::before,body.loading-leaving .mc-app-root *::after{animation-play-state:paused!important;animation-delay:0s!important}#mc-initial-loader{position:fixed;inset:0;z-index:2147483647;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#000;color:#fff}body:not(.loading-active) #mc-initial-loader{display:none}.mc-initial-gif{display:block;width:auto;height:auto;max-width:min(80vw,720px);max-height:60vh;object-fit:contain;user-select:none}.mc-initial-copy{margin-top:2rem;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 1.5rem;opacity:0;transform:translateY(12px);animation:mcInitialTextIn .6s cubic-bezier(.16,1,.3,1) 1.8s forwards}.mc-initial-name{font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.5rem,4vw,2.5rem);line-height:1.1;letter-spacing:0}.mc-initial-gold{color:#d4af37}.mc-initial-rule{margin-top:1rem;height:1px;width:4rem;background:#d4af37;transform:scaleX(0);animation:mcInitialRuleIn .6s cubic-bezier(.16,1,.3,1) 1.95s forwards}.mc-initial-tagline{margin-top:1rem;font-family:'JetBrains Mono',monospace;font-size:clamp(.625rem,1.6vw,.7rem);line-height:1.6;text-transform:uppercase;letter-spacing:.35em;color:rgba(255,255,255,.7)}body.loading-leaving #mc-initial-loader{animation:mcInitialLoaderOut .4s ease-in-out forwards}@keyframes mcInitialTextIn{to{opacity:1;transform:translateY(0)}}@keyframes mcInitialRuleIn{to{transform:scaleX(1)}}@keyframes mcInitialLoaderOut{to{opacity:0}}@media(max-width:640px){.mc-initial-gif{max-width:88vw;max-height:52vh}.mc-initial-copy{margin-top:1.5rem}.mc-initial-tagline{letter-spacing:.24em}}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mc-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}if(t==='dark'){document.documentElement.classList.add('dark');}document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className="loading-active">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{window.__mcLoaderStart=(performance&&performance.now)?performance.now():Date.now();if(sessionStorage.getItem('mc-intro-played')){document.body.classList.remove('loading-active');}}catch(e){}})();`,
          }}
        />
        <div id="mc-initial-loader" aria-hidden="true">
          <img className="mc-initial-gif" src={introGif} alt="" draggable={false} />
          <div className="mc-initial-copy">
            <div className="mc-initial-name">
              Munich Construction <span className="mc-initial-gold">GmbH</span>
            </div>
            <div className="mc-initial-rule" />
            <div className="mc-initial-tagline">
              Präzision <span className="mc-initial-gold">•</span> Struktur{" "}
              <span className="mc-initial-gold">•</span> Vertrauen
            </div>
          </div>
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <BrandIntro />
          <div
            className={`mc-app-root flex flex-col bg-background text-foreground ${
              isHome ? "h-screen overflow-hidden" : "min-h-screen"
            }`}
          >
            <SiteHeader />
            <main
              className={
                isHome
                  ? "flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth"
                  : "flex-1"
              }
            >
              <Outlet />
            </main>
            {!isHome && <SiteFooter />}
            <WhatsAppFloat />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
