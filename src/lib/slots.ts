/** Client helper: always read availability from the server, never from cache. */

export type FreeSlot = { start: string; label: string };

export type SlotsResult = { ok: true; slots: FreeSlot[] } | { ok: false; error: string };

function isIsoLike(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(new Date(value).getTime());
}

export async function fetchFreeSlots(date: string, signal?: AbortSignal): Promise<SlotsResult> {
  try {
    const res = await fetch(`/api/public/consultation-slots?date=${encodeURIComponent(date)}&t=${Date.now()}`, {
      cache: "no-store",
      headers: { "cache-control": "no-cache", accept: "application/json" },
      signal,
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (!res.ok || !contentType.includes("application/json")) {
      return { ok: false, error: "availability_unavailable" };
    }

    const payload = (await res.json().catch(() => null)) as
      | { ok?: boolean; availableSlots?: unknown; slots?: unknown; error?: string }
      | null;

    if (!payload || payload.ok === false) {
      return { ok: false, error: payload?.error ?? "availability_unavailable" };
    }

    const raw = Array.isArray(payload.availableSlots)
      ? payload.availableSlots
      : Array.isArray(payload.slots)
        ? payload.slots
        : null;

    if (!raw) return { ok: false, error: "availability_unavailable" };

    const slots: FreeSlot[] = [];
    for (const entry of raw) {
      if (isIsoLike(entry)) {
        slots.push({ start: entry, label: "" });
      } else if (entry && typeof entry === "object" && isIsoLike((entry as { start?: unknown }).start)) {
        const item = entry as { start: string; label?: unknown };
        slots.push({ start: item.start, label: typeof item.label === "string" ? item.label : "" });
      }
    }

    return { ok: true, slots };
  } catch {
    return { ok: false, error: "availability_unavailable" };
  }
}
