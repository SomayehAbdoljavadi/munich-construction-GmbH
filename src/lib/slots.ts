/** Client helper: always read availability from the server, never from cache. */

export async function fetchFreeSlots(date: string, signal?: AbortSignal): Promise<string[]> {
  const res = await fetch(`/api/public/consultation-slots?date=${encodeURIComponent(date)}&t=${Date.now()}`, {
    cache: "no-store",
    headers: { "cache-control": "no-cache" },
    signal,
  });
  if (!res.ok) return [];
  const payload = (await res.json().catch(() => ({}))) as { slots?: string[] };
  return payload.slots ?? [];
}
