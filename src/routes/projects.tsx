import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PROJECTS, type Project } from "@/lib/projects-data";
import { BASE_URL, breadcrumb, ldScript, url } from "@/lib/seo";

const ogImage = PROJECTS[0]?.images[0] ?? "";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects in Munich & Bavaria — Munich Construction GmbH" },
      {
        name: "description",
        content:
          "Construction, refurbishment and renovation projects by Munich Construction GmbH in Munich, Bavaria and beyond — residential, hotel, commercial and heritage buildings.",
      },
      { property: "og:title", content: "Projects — Munich Construction GmbH" },
      {
        property: "og:description",
        content: "Selected work in new construction, refurbishment and renovation across Munich and Bavaria.",
      },
      { property: "og:url", content: url("/projects") },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Projects — Munich Construction GmbH" },
      { name: "twitter:description", content: "Construction projects in Munich and Bavaria." },
      ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
    ],
    links: [{ rel: "canonical", href: url("/projects") }],
    scripts: [
      ldScript({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Construction Projects — Munich Construction GmbH",
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Place",
            name: p.name,
            address: p.location,
            url: `${BASE_URL}/projects#${p.slug}`,
          },
        })),
      }),
      ldScript(breadcrumb([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ])),
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t } = useT();
  const [activeSlug, setActiveSlug] = useState<string>(PROJECTS[0]?.slug ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Scroll-spy
  useEffect(() => {
    if (PROJECTS.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose center is nearest the viewport center
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const slug = (visible[0].target as HTMLElement).dataset.slug;
          if (slug) setActiveSlug(slug);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keep the active nav item visible (horizontal scroll on mobile)
  useEffect(() => {
    const item = navItemRefs.current[activeSlug];
    if (item && navRef.current) {
      const nav = navRef.current;
      const itemLeft = item.offsetLeft;
      const itemRight = itemLeft + item.offsetWidth;
      if (itemLeft < nav.scrollLeft || itemRight > nav.scrollLeft + nav.clientWidth) {
        nav.scrollTo({
          left: itemLeft - nav.clientWidth / 2 + item.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeSlug]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const el = sectionRefs.current[slug];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            {t("projects.eyebrow")}
          </p>
          <h1 className="font-display h-fluid-page text-balance max-w-4xl">
            {t("projects.title")}
          </h1>
          <div className="gold-divider w-24 mt-8" />
          <p className="text-white/70 text-lg mt-8 max-w-2xl leading-relaxed">
            {t("projects.lede")}
          </p>
        </div>
      </section>

      {/* Sticky project nav */}
      {PROJECTS.length > 0 && (
        <nav
          aria-label="Project navigation"
          className="sticky top-16 md:top-20 z-30 bg-ink/95 backdrop-blur border-y border-gold/20"
        >
          <div
            ref={navRef}
            className="container-wide overflow-x-auto no-scrollbar"
          >
            <ul className="flex items-stretch gap-1 md:gap-2 py-2 min-w-max">
              {PROJECTS.map((p) => {
                const active = p.slug === activeSlug;
                return (
                  <li key={p.slug} className="shrink-0">
                    <a
                      ref={(el) => {
                        navItemRefs.current[p.slug] = el;
                      }}
                      href={`#project-${p.slug}`}
                      onClick={(e) => handleNavClick(e, p.slug)}
                      className={`block px-4 md:px-5 py-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap border-b-2 transition-colors ${
                        active
                          ? "text-gold border-gold"
                          : "text-white/60 border-transparent hover:text-white"
                      }`}
                    >
                      {p.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}

      {/* Project sections */}
      {PROJECTS.length === 0 ? (
        <section className="py-20 md:py-28">
          <div className="container-wide">
            <p className="text-muted-foreground">No projects yet.</p>
          </div>
        </section>
      ) : (
        PROJECTS.map((p, idx) => (
          <ProjectSection
            key={p.slug}
            project={p}
            index={idx}
            sectionRef={(el) => (sectionRefs.current[p.slug] = el)}
          />
        ))
      )}
    </>
  );
}

interface ProjectSectionProps {
  project: Project;
  index: number;
  sectionRef: (el: HTMLElement | null) => void;
}

function ProjectSection({ project, index, sectionRef }: ProjectSectionProps) {
  const localRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setVisible(true));
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={`project-${project.slug}`}
      data-slug={project.slug}
      ref={(el) => {
        localRef.current = el;
        sectionRef(el);
      }}
      className={`min-h-[90vh] flex flex-col justify-center py-12 md:py-20 scroll-mt-32 ${
        index % 2 === 0 ? "bg-background" : "bg-secondary/40"
      }`}
    >
      <div className="container-wide w-full">
        {/* Eyebrow */}
        <div
          className={`mb-6 md:mb-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-gold">
            {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </p>
        </div>

        {/* Slideshow */}
        <div
          className={`transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <ProjectSlideshow project={project} />
        </div>

        {/* Info below */}
        <div
          className={`mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="md:col-span-2">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-balance leading-tight">
              {project.name}
            </h2>
            <div className="gold-divider w-16 mt-4 md:mt-6" />
          </div>
          {project.location && (
            <div className="md:text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-2 flex md:justify-end items-center gap-2">
                <MapPin size={11} /> Standort
              </p>
              <p className="text-foreground text-sm md:text-base leading-relaxed">
                {project.location}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectSlideshow({ project }: { project: Project }) {
  const slides = project.images;
  const total = slides.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (n: number) => setI(((n % total) + total) % total),
    [total],
  );
  const next = useCallback(() => go(i + 1), [go, i]);
  const prev = useCallback(() => go(i - 1), [go, i]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  if (total === 0) return null;

  return (
    <div
      className="relative bg-ink text-white overflow-hidden border border-gold/20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full bg-ink">
        {slides.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            aria-hidden={idx !== i}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-ink" />
            <img
              src={src}
              alt={`${project.name} — ${idx + 1}`}
              loading={idx === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-contain object-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent pointer-events-none" />

            {/* Bottom-right project label */}
            <div className="absolute right-3 bottom-3 md:right-6 md:bottom-6 max-w-[85%]">
              <div className="bg-ink/70 border border-gold/30 backdrop-blur px-3 py-2 md:px-4 md:py-2.5 text-right">
                <p className="font-display text-sm sm:text-base md:text-lg leading-tight">
                  {project.name}
                </p>
                {project.location && (
                  <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gold mt-1 truncate">
                    {project.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 size-10 md:size-11 grid place-items-center border border-gold/40 bg-ink/60 backdrop-blur text-gold hover:bg-gold hover:text-ink transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 size-10 md:size-11 grid place-items-center border border-gold/40 bg-ink/60 backdrop-blur text-gold hover:bg-gold hover:text-ink transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-3 md:top-5 right-3 md:right-5 bg-ink/70 border border-gold/30 backdrop-blur px-3 py-1.5">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gold">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 max-w-[70%] overflow-hidden">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                onClick={() => go(idx)}
                className={`h-[3px] transition-all duration-300 ${
                  idx === i ? "w-8 bg-gold" : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
