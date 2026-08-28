/**
 * Gerbang cepat sebelum build: memastikan /api/intl/* production masih
 * mengembalikan bentuk yang diasumsikan lib/api.ts. Bukan pengganti build —
 * hanya menangkap perubahan kontrak API lebih awal dengan pesan jelas.
 *
 * Jalankan: node scripts/check-api.mjs
 */

const API = "https://api.welcomemanado.my.id/api/intl";
let failed = 0;

async function get(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${path}`);
  return res.json();
}

function has(obj, keys, label) {
  for (const k of keys) {
    if (!(k in obj)) {
      console.error(`  ✗ ${label}: kunci "${k}" hilang`);
      failed++;
    }
  }
}

const check = async (label, fn) => {
  try {
    await fn();
    console.log(`  ✓ ${label}`);
  } catch (e) {
    console.error(`  ✗ ${label}: ${e.message}`);
    failed++;
  }
};

console.log("Memeriksa /api/intl/* …");

await check("GET /locales → 8 bahasa", async () => {
  const r = await get("/locales");
  const expected = ["en", "ko", "zh", "fr", "de", "it", "es", "nl"];
  const missing = expected.filter((l) => !r.data.includes(l));
  if (missing.length) throw new Error(`kurang: ${missing.join(",")}`);
});

await check("GET /tours?locale=en → daftar + meta", async () => {
  const r = await get("/tours?locale=en&per_page=1");
  has(r, ["success", "data", "meta"], "tours");
  has(r.meta, ["total", "last_page", "per_page", "page"], "tours.meta");
  has(r.data[0], ["slug", "title", "description", "location", "duration_days", "duration_nights", "is_featured", "featured_badge", "cover_image", "category"], "tours.data[0]");
});

await check("GET /tours/{slug}?locale=en → detail", async () => {
  const list = await get("/tours?locale=en&per_page=1");
  const r = await get(`/tours/${list.data[0].slug}?locale=en`);
  has(r.data, ["inclusions", "exclusions", "itinerary_pdf_path", "images", "prices", "itineraries"], "tour detail");
});

await check("GET /hotels?locale=en → daftar", async () => {
  const r = await get("/hotels?locale=en&per_page=1");
  has(r.data[0], ["slug", "name", "location", "category", "stars", "facilities", "description", "primary_image", "images"], "hotels.data[0]");
  if (!Array.isArray(r.data[0].facilities)) throw new Error("facilities bukan array");
});

await check("GET /gallery?locale=en → item (image_path boleh null)", async () => {
  const r = await get("/gallery?locale=en&per_page=100");
  has(r.data[0], ["id", "title", "image_path", "video_name"], "gallery.data[0]");
  if (!r.data.some((g) => g.image_path)) throw new Error("tidak ada item galeri dengan image_path");
});

await check("GET /blog?locale=en + detail", async () => {
  const r = await get("/blog?locale=en&per_page=1");
  has(r.data[0], ["slug", "title", "excerpt", "featured_image", "author", "published_at", "category"], "blog.data[0]");
  const d = await get(`/blog/${r.data[0].slug}?locale=en`);
  has(d.data, ["content"], "blog detail");
});

await check("GET /home?locale=en → hero_images + featured_tours", async () => {
  const r = await get("/home?locale=en");
  has(r.data, ["hero_images", "featured_tours"], "home");
  if (!Array.isArray(r.data.hero_images) || !r.data.hero_images.length) throw new Error("hero_images kosong");
});

await check("GET /about?locale=en → story + team", async () => {
  const r = await get("/about?locale=en");
  has(r.data, ["story", "team"], "about");
  has(r.data.story, ["title_lead", "title_accent", "paragraph_one", "paragraph_two", "since_text", "pioneering_text"], "about.story");
});

await check("GET /about?locale=fr → story null (jenis konten belum diterjemahkan)", async () => {
  const r = await get("/about?locale=fr");
  if (r.data.story !== null) console.warn("    catatan: about.story fr TIDAK lagi null — ketersediaan berubah, tinjau availability matrix");
});

if (failed) {
  console.error(`\n${failed} pemeriksaan gagal — lib/api.ts mungkin perlu disesuaikan.`);
  process.exit(1);
}
console.log("\nSemua pemeriksaan lolos.");
