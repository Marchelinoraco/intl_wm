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

if (failed) {
  console.error(`\n${failed} pemeriksaan gagal — lib/api.ts mungkin perlu disesuaikan.`);
  process.exit(1);
}
console.log("\nSemua pemeriksaan lolos.");
