import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, Loader2, Phone, XCircle } from "lucide-react";
import { fetchFreeSlots } from "@/lib/slots";
import { useT } from "@/lib/i18n";
import { url } from "@/lib/seo";
import { BERATUNG, CONTACT, MANAGE, type L } from "@/lib/consultation-data";

type Search = { id?: string; token?: string };

export const Route = createFileRoute("/termin")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    id: typeof search["id"] === "string" ? search["id"] : undefined,
    token: typeof search["token"] === "string" ? search["token"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Beratungstermin verwalten | Munich Construction GmbH" },
      {
        name: "description",
        content:
          "Verschieben oder stornieren Sie Ihren gebuchten Beratungstermin bei Munich Construction GmbH – schnell und ohne Anruf.",
      },
      { property: "og:title", content: "Beratungstermin verwalten — Munich Construction GmbH" },
      {
        property: "og:description",
        content: "Ihren kostenlosen Beratungstermin online verschieben oder stornieren.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Beratungstermin verwalten" },
      { name: "twitter:description", content: "Termin online verschieben oder stornieren." },
    ],
    links: [{ rel: "canonical", href: url("/termin") }],
  }),
  component: ManageAppointmentPage,
});

type Booking = {
  slotStart: string;
  status: string;
  projectType: string;
  firstName: string;
  lastName: string;
  lang: "de" | "en";
};

const inputLabel = "block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3";

function isoDay(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(date);
}

function ManageAppointmentPage() {
  const { id, token } = Route.useSearch();
  const { lang } = useT();
  const l = useCallback((v: L) => v[lang === "en" ? "en" : "de"], [lang]);

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<"reschedule" | "cancel" | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [slots, setSlots] = useState<Array<{ slot_start: string }>>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(false);
  const [slotsReload, setSlotsReload] = useState(0);

  const call = useCallback(
    async (action: "load" | "reschedule" | "cancel", slotStart?: string) => {
      const res = await fetch("/api/public/consultation-manage", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, token, action, slotStart }),
      });
      const payload = (await res.json().catch(() => ({}))) as { booking?: Booking; error?: string };
      return { status: res.status, ...payload };
    },
    [id, token],
  );

  useEffect(() => {
    if (!id || !token) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    let active = true;
    call("load").then((r) => {
      if (!active) return;
      if (r.booking) setBooking(r.booking);
      else setNotFound(true);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id, token, call]);

  const days = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 28 }, (_, i) => isoDay(new Date(now.getTime() + i * 86_400_000)));
  }, []);

  useEffect(() => {
    if (!day) return;
    let active = true;
    setLoadingSlots(true);
    setSlotsError(false);
    setSlots([]);
    fetchFreeSlots(day)
      .then((result) => {
        if (!active) return;
        setSlots(result.ok ? result.slots.map((s) => ({ slot_start: s.start })) : []);
        setSlotsError(!result.ok);
        setLoadingSlots(false);
      })
      .catch(() => {
        if (!active) return;
        setSlots([]);
        setSlotsError(true);
        setLoadingSlots(false);
      });
    return () => {
      active = false;
    };
  }, [day, slotsReload]);

  const locale = lang === "en" ? "en-GB" : "de-DE";
  const fmtDay = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      timeZone: "Europe/Berlin",
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  const fmtTime = (iso: string) =>
    new Intl.DateTimeFormat(locale, { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit" }).format(
      new Date(iso),
    );

  const handleError = (code?: string) => {
    if (code === "slot_taken" || code === "slot_unavailable") setError(l(BERATUNG.slotTaken));
    else if (code === "too_late") setError(l(MANAGE.tooLate));
    else setError(l(MANAGE.failure));
  };

  const doReschedule = async () => {
    if (!slot) return;
    setBusy("reschedule");
    setError(null);
    setNotice(null);
    try {
      const r = await call("reschedule", slot);
      if (r.status === 200 && r.booking) {
        setBooking(r.booking);
        setNotice(l(MANAGE.rescheduled));
        setSlot("");
        setSlots([]);
        setDay("");
      } else {
        handleError(r.error);
        if (r.error === "slot_taken" || r.error === "slot_unavailable") setSlot("");
      }
    } catch {
      setError(l(MANAGE.failure));
    } finally {
      setBusy(null);
    }
  };

  const doCancel = async () => {
    setBusy("cancel");
    setError(null);
    setNotice(null);
    try {
      const r = await call("cancel");
      if (r.status === 200 && r.booking) setBooking(r.booking);
      else handleError(r.error);
    } catch {
      setError(l(MANAGE.failure));
    } finally {
      setBusy(null);
      setConfirmCancel(false);
    }
  };

  const cancelled = booking?.status === "cancelled";
  const past = booking ? new Date(booking.slotStart).getTime() < Date.now() : false;

  return (
    <main className="pt-28 pb-24 md:pt-36">
      <div className="container-wide max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-4">{l(MANAGE.eyebrow)}</p>
        <h1 className="font-display h-fluid-section">{l(MANAGE.title)}</h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">{l(MANAGE.intro)}</p>

        {loading && (
          <p className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> {l(MANAGE.loading)}
          </p>
        )}

        {!loading && notFound && (
          <div className="mt-10 border border-border bg-background p-8">
            <p className="text-sm text-muted-foreground leading-relaxed">{l(MANAGE.notFound)}</p>
            <Link to="/beratung" className="mt-6 inline-block bg-gold px-6 py-3 text-sm font-medium text-ink">
              {l(MANAGE.bookNew)}
            </Link>
          </div>
        )}

        {!loading && booking && (
          <>
            <div className="mt-10 border border-border bg-background p-8">
              <div className="flex items-start gap-4">
                {cancelled ? (
                  <XCircle className="h-8 w-8 text-muted-foreground" strokeWidth={1.4} />
                ) : (
                  <CheckCircle2 className="h-8 w-8 text-gold" strokeWidth={1.4} />
                )}
                <div>
                  <h2 className="font-display text-2xl">
                    {cancelled ? l(MANAGE.cancelledTitle) : l(MANAGE.current)}
                  </h2>
                  <p className="mt-3 text-sm">
                    <span className="font-medium">{fmtDay(booking.slotStart)}</span>
                    <span className="tabular-nums"> · {fmtTime(booking.slotStart)}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{booking.projectType}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                    {cancelled ? l(MANAGE.statusCancelled) : l(MANAGE.statusConfirmed)}
                  </p>
                </div>
              </div>
            </div>

            {notice && <p className="mt-6 border border-gold/40 bg-gold/10 px-4 py-3 text-sm">{notice}</p>}
            {error && <p className="mt-6 border border-destructive/40 px-4 py-3 text-sm text-destructive">{error}</p>}

            {cancelled && (
              <div className="mt-8">
                <p className="text-sm text-muted-foreground leading-relaxed">{l(MANAGE.cancelledText)}</p>
                <Link to="/beratung" className="mt-6 inline-block bg-gold px-6 py-3 text-sm font-medium text-ink">
                  {l(MANAGE.bookNew)}
                </Link>
              </div>
            )}

            {!cancelled && past && (
              <p className="mt-8 text-sm text-muted-foreground leading-relaxed">{l(MANAGE.tooLate)}</p>
            )}

            {!cancelled && !past && (
              <>
                {/* Reschedule */}
                <section className="mt-12 border border-border bg-background p-6 md:p-8">
                  <h3 className="font-display text-xl flex items-center gap-3">
                    <CalendarClock className="h-5 w-5 text-gold" strokeWidth={1.5} /> {l(MANAGE.rescheduleTitle)}
                  </h3>

                  <div className="mt-6">
                    <span className={inputLabel}>{l(BERATUNG.qDate)}</span>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                      {days.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => {
                            setDay(d);
                            setSlot("");
                          }}
                          className={`shrink-0 border px-4 py-3 text-xs transition ${
                            day === d ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                          }`}
                        >
                          <span className="block font-medium">
                            {new Intl.DateTimeFormat(locale, {
                              timeZone: "Europe/Berlin",
                              weekday: "short",
                            }).format(new Date(`${d}T12:00:00Z`))}
                          </span>
                          <span className="block tabular-nums text-muted-foreground">
                            {new Intl.DateTimeFormat(locale, {
                              timeZone: "Europe/Berlin",
                              day: "2-digit",
                              month: "2-digit",
                            }).format(new Date(`${d}T12:00:00Z`))}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {day && (
                    <div className="mt-6">
                      <span className={inputLabel}>{l(BERATUNG.qTime)}</span>
                      {loadingSlots ? (
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" /> {l(BERATUNG.loadingSlots)}
                        </p>
                      ) : slotsError ? (
                        <div className="border border-border p-4">
                          <p className="text-sm text-muted-foreground">{l(BERATUNG.slotsError)}</p>
                          <button
                            type="button"
                            onClick={() => setSlotsReload((n) => n + 1)}
                            className="mt-4 border border-gold px-5 py-2.5 text-sm text-gold hover:bg-gold/10 transition"
                          >
                            {l(BERATUNG.retry)}
                          </button>
                        </div>
                      ) : slots.length === 0 ? (
                        <p className="text-sm text-muted-foreground">{l(BERATUNG.noSlots)}</p>
                      ) : (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                          {slots.map((s) => (
                            <button
                              key={s.slot_start}
                              type="button"
                              onClick={() => setSlot(s.slot_start)}
                              className={`border px-2 py-3 text-sm tabular-nums transition ${
                                slot === s.slot_start ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                              }`}
                            >
                              {fmtTime(s.slot_start)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!slot || busy !== null}
                    onClick={doReschedule}
                    className="mt-8 bg-gold px-6 py-3 text-sm font-medium text-ink disabled:opacity-50"
                  >
                    {busy === "reschedule" ? l(MANAGE.rescheduling) : l(MANAGE.rescheduleCta)}
                  </button>
                </section>

                {/* Cancel */}
                <section className="mt-8 border border-border bg-background p-6 md:p-8">
                  <h3 className="font-display text-xl">{l(MANAGE.cancelTitle)}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{l(MANAGE.cancelIntro)}</p>
                  {confirmCancel ? (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="text-sm font-medium">{l(MANAGE.cancelConfirm)}</span>
                      <button
                        type="button"
                        disabled={busy !== null}
                        onClick={doCancel}
                        className="border border-destructive px-5 py-2.5 text-sm text-destructive disabled:opacity-50"
                      >
                        {busy === "cancel" ? l(MANAGE.cancelling) : l(BERATUNG.cancelCta)}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmCancel(false)}
                        className="px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {l(MANAGE.keepAppointment)}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmCancel(true)}
                      className="mt-6 border border-border px-6 py-3 text-sm hover:border-destructive hover:text-destructive transition"
                    >
                      {l(BERATUNG.cancelCta)}
                    </button>
                  )}
                </section>
              </>
            )}
          </>
        )}

        <a
          href={CONTACT.phoneHref}
          className="mt-12 inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-gold"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} /> {CONTACT.phoneDisplay}
        </a>
      </div>
    </main>
  );
}
