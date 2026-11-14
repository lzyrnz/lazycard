// LazyCard backend: stores each customer's page in Netlify Blobs.
// Runs at /api/card. Needs no database and no keys.
import { getStore } from "@netlify/blobs";

const RESERVED = new Set(["setup", "admin", "index", "api", "home", "favicon", "login", "assets", "static", "www"]);
const SLUG = /^[a-z0-9-]{3,24}$/;
const json = (o, s = 200) =>
  new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });

async function hash(pin, salt) {
  const d = new TextEncoder().encode(salt + ":" + pin);
  const h = await crypto.subtle.digest("SHA-256", d);
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default async (req) => {
  const store = getStore("cards");
  const url = new URL(req.url);

  if (req.method === "GET") {
    if (url.searchParams.get("ping")) return json({ ok: true });
    const slug = (url.searchParams.get("slug") || "").toLowerCase();
    if (!SLUG.test(slug)) return json({ error: "bad_slug" }, 400);
    const rec = await store.get(slug, { type: "json" });
    if (url.searchParams.get("check")) return json({ free: !rec && !RESERVED.has(slug) });
    if (!rec) return json({ error: "not_found" }, 404);
    return json({ data: rec.data });
  }

  if (req.method === "POST") {
    let b;
    try { b = await req.json(); } catch { return json({ error: "bad_json" }, 400); }
    const slug = String(b.slug || "").toLowerCase();
    if (!SLUG.test(slug) || RESERVED.has(slug)) return json({ error: "bad_slug" }, 400);
    const rec = await store.get(slug, { type: "json" });

    if (b.action === "hit") {
      if (rec) { rec.views = (rec.views || 0) + 1; await store.setJSON(slug, rec); }
      return json({ ok: true });
    }

    const pin = String(b.pin || "");
    if (!/^\d{4,8}$/.test(pin)) return json({ error: "bad_pin" }, 400);

    if (b.action === "login") {
      if (!rec) return json({ error: "not_found" }, 404);
      return (await hash(pin, rec.salt)) === rec.pin ? json({ ok: true, views: rec.views || 0 }) : json({ error: "wrong_pin" }, 403);
    }

    if (!b.data || typeof b.data !== "object" || JSON.stringify(b.data).length > 1500000) return json({ error: "too_big" }, 413);

    if (rec) {
      if ((await hash(pin, rec.salt)) !== rec.pin) return json({ error: "taken" }, 403);
      await store.setJSON(slug, { ...rec, data: b.data, updated: Date.now() });
      return json({ ok: true, updated: true });
    }
    const salt = crypto.randomUUID();
    await store.setJSON(slug, { salt, pin: await hash(pin, salt), data: b.data, views: 0, created: Date.now(), updated: Date.now() });
    return json({ ok: true, created: true });
  }

  return json({ error: "method" }, 405);
};

export const config = { path: "/api/card" };
