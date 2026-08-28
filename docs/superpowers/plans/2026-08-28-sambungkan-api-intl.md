# Sambungkan intl_wm ke /api/intl/* — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ganti seluruh data karangan `lib/sample-*.ts` di `intl_wm` dengan pengambilan build-time dari `/api/intl/*` production, render HTML sungguhan, SEO (sitemap/hreflang/JSON-LD), dan siapkan berkas deploy — sehingga `npm run build` menghasilkan `out/` yang bisa menggantikan halaman coming-soon di manado.tours.

**Architecture:** Next.js 14 App Router, `output: "export"` (produksi saja). Semua `fetch()` terjadi saat build di server component / `generateStaticParams` / `generateMetadata` — pengunjung situs tidak pernah memanggil API. Satu modul `lib/api.ts` per endpoint; satu modul `lib/availability.ts` menghitung ketersediaan per (jenis konten × bahasa) sekali di awal build dan memoize-nya. Bahasa yang punya paket tour → situs hidup penuh (kedelapannya hari ini); menu Hotels/Gallery/Blog/About hanya muncul untuk bahasa yang jenis itu benar-benar berisi (en/ko/zh hari ini). Tidak ada perubahan pada `api_wm`.

**Tech Stack:** Next.js 14.2 (App Router), React 18, TypeScript 5 (strict), Tailwind 3, `lucide-react`. Tidak ada dependensi baru — HTML dari API dirender lewat `dangerouslySetInnerHTML` di dalam kelas `.rich-text` yang ditulis tangan di `globals.css` (pola sama seperti `.tour-rich-content` di `client_wm`, bukan `@tailwindcss/typography`). Tidak ada test runner — verifikasi tiap task lewat `npx tsc --noEmit`, `node scripts/check-api.mjs`, dan `npm run build` + inspeksi `out/`.

**Spec:** `docs/superpowers/specs/2026-08-28-sambungkan-api-intl-design.md` (dibaca bersama plan ini).

## Global Constraints

- **8 bahasa**: `en ko zh fr de it es nl`. Bahasa Indonesia (`id`) TIDAK pernah dilayani domain ini dan bukan nilai `Locale` yang sah.
- **API base**: `https://api.welcomemanado.my.id/api/intl`. Query `?locale=<kode>` WAJIB di setiap panggilan kecuali `/locales` — middleware `ValidateIntlLocale` menolak 422 tanpa itu.
- **Build-time only**: `fetch()` hanya dari server component, `generateStaticParams`, `generateMetadata`. Tidak ada `"use client"` yang memanggil API. Tidak ada `useEffect` fetch.
- **Gagal keras**: fetch gagal (jaringan/timeout/status ≥ 400 yang tak terduga) saat build → `throw`, build berhenti. Tidak ada fallback ke data lama / halaman kosong.
- **Harga tour tidak ditampilkan**: API mengembalikan `base_price: "0.00"` (string), `price_usd: null`, `prices: []` untuk semua paket Manado. Kartu & halaman detail memakai pola "hubungi untuk harga" + tombol chat — sama seperti `client_wm/src/views/wisatalokal/TourDetail.vue`. JSON-LD tour TIDAK menyertakan `Offer`.
- **Field HTML** (dirender via `dangerouslySetInnerHTML`, BUKAN `{teks}` / `.split()`): tour `description`/`inclusions`/`exclusions`, itinerary `description`, hotel `description`, blog `content`, travel-info `description`, about `paragraph_one`/`paragraph_two`. Konten ini milik database sendiri, bukan input pengguna — bukan celah XSS.
- **`hotel.facilities`** adalah array string (JSON cast), BUKAN string `\n`-terpisah. Di-`.map()` langsung. Isinya bahasa Indonesia walau di locale en/ko/zh (belum diterjemahkan) — tampilkan apa adanya.
- **Kontak**: WhatsApp `https://wa.me/6282173738822`. KakaoTalk (ko) & WeChat (zh): belum ada channel resmi — untuk rilis pertama PAKAI tautan WhatsApp yang sama. Semua nomor/tautan hidup di satu berkas `lib/contact.ts`.
- **Form kontak dihapus** — diganti tombol click-to-chat.
- `SITE_URL = "https://manado.tours"`, `DEFAULT_LOCALE = "en"`.
- **`next/image`** tetap `unoptimized: true` (tidak ada server optimizer di static export).
- Komentar kode ditulis dalam bahasa Indonesia, mengikuti gaya berkas kerangka yang sudah ada.
- Commit sering, satu per task minimal. Branch kerja: `feat/sambungkan-api-intl` (dari `dev`).

## Ketersediaan API per 2026-08-28 (diverifikasi langsung ke production)

| locale | /locales | tours | hotels | gallery | blog | about.story |
|--------|:--------:|:-----:|:------:|:-------:|:----:|:-----------:|
| en | ✓ | 34 | 54 | 9 | 50 | ada |
| ko | ✓ | 34 | 54 | 9 | 50 | ada |
| zh | ✓ | 34 | 54 | 9 | 50 | ada |
| fr | ✓ | 34 | 0 | 0 | 0 | null |
| de | ✓ | 34 | 0 | 0 | 0 | null |
| it | ✓ | 34 | 0 | 0 | 0 | null |
| es | ✓ | 34 | 0 | 0 | 0 | null |
| nl | ✓ | 34 | 0 | 0 | 0 | null |

- `team` kosong `[]` di SEMUA bahasa (tabel `team_members` belum berisi baris aktif) — bukan celah bahasa. Bagian tim di halaman About disembunyikan bila kosong.
- Galeri: sebagian item `image_path: null` (entri video; `video_name` ternyata berisi teks lokasi, bukan nama berkas). Halaman galeri hanya merender item dengan `image_path` non-null.
- `cover_image` tour bisa `null` (paket tanpa galeri). Semua 34 paket saat ini punya cover, tapi kode tetap menangani null.

## Bentuk respons API (dicocokkan dengan Resource PHP + respons live)

Envelope daftar: `{ success: true, data: [...], meta: { page, per_page, total, last_page } }`
Envelope tunggal: `{ success: true, data: {...} }` — atau `{ success: false, message }` dengan status 404.

```jsonc
// GET /locales                          → { success, data: ["en","ko","zh","fr","de","it","es","nl"] }

// GET /tours?locale=&per_page=100       → data: TourList[]
// GET /tours/{slug}?locale=             → data: TourDetail   (atau 404 {success:false,message})
{
  "slug": "lihaga-island-white-sand-escape",
  "title": "Lihaga Island White Sand Escape",
  "description": "<h2 ...>…</h2><p ...>…</p>",         // HTML
  "location": "North Sulawesi",
  "base_price": "0.00",                                 // STRING — abaikan
  "price_usd": null,                                    // selalu null utk paket Manado
  "duration_days": 1, "duration_nights": 0, "duration_hours": null,
  "is_featured": true,
  "featured_badge": "popular",                          // "promo"|"popular"|"new"|"hot"|"limited"|"bestseller"|string|null
  "cover_image": "https://api.welcomemanado.my.id/storage/tours/manado/….png",  // bisa null
  "category": { "slug": "manado-tour", "name": "Manado Tours" },  // bisa null
  // hanya di detail:
  "inclusions": "<ul><li…><p>…</p></li></ul>",          // HTML
  "exclusions": "<ul><li>…</li></ul>",                  // HTML
  "itinerary_pdf_path": null,
  "images": ["https://api…/storage/tours/manado/….png", …],   // string[]
  "prices": [],                                         // selalu kosong utk paket Manado
  "itineraries": [
    { "day_number": 1, "title": "ITINERARY", "description": "<p …>…</p>", "hotel_info": null, "meals_info": null }
  ]
}

// GET /hotels?locale=&per_page=100      → data: Hotel[]
// GET /hotels/{slug}?locale=            → data: Hotel  (atau 404)
{
  "slug": "sintesa-peninsula",
  "name": "Sintesa Peninsula Hotel Manado",             // nama diri, tidak diterjemahkan
  "location": "Jl. Jend Sudirman, Gunung Wenang,",
  "category": "city_hotel",                             // enum mentah: "city_hotel"|"resort"|… → dipercantik di frontend
  "stars": 5,
  "facilities": ["Restoran","Kolam Renang Indoor", …],  // string[] (bahasa Indonesia)
  "description": "<p>…</p><p>…</p>",                    // HTML, bisa null
  "primary_image": "https://api…/storage/hotels/….webp",
  "images": ["https://api…/storage/hotels/….webp", …]   // string[]
}

// GET /gallery?locale=&per_page=100     → data: GalleryItem[]
{ "id": 16, "title": "…", "image_path": "https://api…/storage/gallery/items/….jpg" | null, "video_name": "Lokasi : …" | null }

// GET /blog?locale=&per_page=100        → data: BlogList[]
// GET /blog/{slug}?locale=              → data: BlogDetail  (atau 404)
{
  "slug": "sunbae-manado-…-G6miug",
  "title": "SUNBAE Manado: …",
  "excerpt": "SUNBAE Manado is a trendy hangout spot …" | null,   // teks polos
  "featured_image": "https://api…/storage/blog/….png",
  "author": "admin",                                    // sering "admin" — jangan ditampilkan
  "published_at": "2026-08-28" | null,                  // string tanggal (Y-m-d)
  "category": { "slug": "kuliner", "name": "Culinary" } | null,
  "content": "<p …>…</p>"                               // HTML, hanya di detail
}

// GET /home?locale=                     → data: { hero_images: string[], featured_tours: TourList[] }
// GET /about?locale=                    → data: { story: AboutStory | null, team: TeamMember[] }
{
  "story": {
    "title_lead": "About Us", "title_accent": "Welcome Manado Tours",
    "paragraph_one": "<p>…</p>", "paragraph_two": "<p>…</p>",        // HTML
    "experience_value": "Safety and Trust",                          // FRASA pemasaran, BUKAN angka statistik
    "experience_label": "Premium Holidays with a Personal Touch",
    "travelers_value": "Flexible & Easy to Customize",
    "travelers_label": "Dream Destination Hunters",
    "since_text": "A Trusted Travel Solution Since 2006",
    "pioneering_text": "Pioneer of Quality Travel Experiences",
    "image_url": "https://api…/storage/about/….png"
  } | null,
  "team": []                                            // selalu kosong hari ini
}
```

## File Structure

**Dibuat baru:**
| Berkas | Tanggung jawab |
|--------|----------------|
| `lib/api.ts` | Lapisan data: `API` const, helper `apiGet`, semua tipe respons, satu fungsi per endpoint (`getLocales`, `getTours`, `getTour`, `getHotels`, `getHotel`, `getGallery`, `getBlogPosts`, `getBlogPost`, `getHome`, `getAbout`). |
| `lib/availability.ts` | `getAvailability()` (memoized, 40 panggilan ringan sekali di awal build), `publishedLocales()`, `localesWith(section)`. |
| `lib/contact.ts` | Nomor & tautan chat per bahasa; `chatUrl(locale, tourTitle?)` yang membangun tautan click-to-chat dengan pesan pra-isi. |
| `lib/format.ts` | `prettifyCategory(key)` untuk enum kategori hotel mentah. |
| `components/RichText.tsx` | Membungkus `dangerouslySetInnerHTML` + kelas `.rich-text`. Satu tempat, dipakai semua field HTML. |
| `components/JsonLd.tsx` | `<script type="application/ld+json">` server component. |
| `app/sitemap.ts` | Sitemap dipetik dari `Availability` yang sama. |
| `app/robots.ts` | Izinkan semua, tunjuk sitemap. |
| `scripts/check-api.mjs` | Skrip Node polos: memanggil tiap endpoint, memeriksa kunci yang diasumsikan plan ini masih ada. Dijalankan sebelum build sebagai gerbang cepat. |

**Diubah:**
| Berkas | Perubahan |
|--------|-----------|
| `lib/locales.ts` | Buang `PUBLISHED_LOCALES` hardcoded & `isPublished`. Sisakan `ALL_LOCALES`, `Locale`, `LOCALE_LABELS`, `HREFLANG`, `DEFAULT_LOCALE`, `SITE_URL`. |
| `lib/dictionary.ts` | Bentuk ulang `Dict` (buang field form & harga, tambah `featuredTours`/`accommodation`/`pricingInfo`/`contactInquiry`). Isi `fr`/`de`/`it`/`es`/`nl` dengan terjemahan sungguhan, hapus cast `as Dict`. |
| `next.config.js` | `remotePatterns`: buang `images.unsplash.com`, tambah `api.welcomemanado.my.id`. |
| `app/globals.css` | Tambah kelas `.rich-text` (aturan `p`/`ul`/`ol`/`li`/`h2`–`h4`/`a`/`strong`). |
| `package.json` | Tambah skrip `check-api` dan `prebuild` (`node scripts/check-api.mjs`). |
| `app/[locale]/layout.tsx` | `generateStaticParams` → `publishedLocales()`. Layout jadi `async`, ambil `getAvailability()`, teruskan ke `Header`. hreflang metadata dari published locales. JSON-LD `TravelAgency`. |
| `components/Header.tsx` | `async`, terima `availability` + `locale`, sembunyikan item nav Hotels/Gallery/Blog/About untuk locale tanpa jenis itu. |
| `components/LanguageSwitcher.tsx` | Terima `availableIn: Locale[]` (default semua published); hanya render bahasa di daftar itu. |
| `components/TourCard.tsx` | Sumber gambar `cover_image` (bukan `galleries[0]`), buang harga, `description` di-strip HTML utk ringkasan, badge dari `featured_badge`. |
| `app/[locale]/page.tsx` | `getHome()` — hero images dari API, featured tours dari API. |
| `app/[locale]/tours/page.tsx` | `getTours()`. |
| `app/[locale]/tours/[slug]/page.tsx` | `getTour()`, render HTML, buang `Bullets`, kartu "hubungi untuk harga" + chat, JSON-LD `TouristTrip` (tanpa Offer). |
| `app/[locale]/hotels/page.tsx` | `getHotels()`, `localesWith("hotels")`, kategori dipercantik. |
| `app/[locale]/hotels/[slug]/page.tsx` | `getHotel()`, `facilities` array, HTML deskripsi, JSON-LD `LodgingBusiness`. |
| `app/[locale]/gallery/page.tsx` | `getGallery()`, saring `image_path` null, `localesWith("gallery")`. |
| `app/[locale]/blog/page.tsx` | `getBlogPosts()`, `localesWith("blog")`. |
| `app/[locale]/blog/[slug]/page.tsx` | `getBlogPost()`, render `content` HTML, JSON-LD `BlogPosting`. |
| `app/[locale]/about/page.tsx` | `getAbout()`, susun ulang render `story` (frasa bukan statistik, + `since_text`/`pioneering_text`, paragraf HTML), sembunyikan tim kosong, `localesWith("about")`. |
| `app/[locale]/contact/page.tsx` | Hapus `<form>`, tombol chat dari `lib/contact.ts`. |
| `deploy/nginx-manado-tours.conf` | Ganti blok coming-soon dengan `try_files $uri $uri/ $uri.html /404.html` + `map $http_accept_language` untuk redirect `/`. |
| `deploy/README.md` | Bagian "Saat situs sungguhan siap terbit" jadi prosedur utama (rsync `out/`). |
| `README.md` | Bagian "Cara menjalankan" + catatan `check-api`. |

**Dihapus:** `lib/sample-data.ts`, `lib/sample-hotels.ts`, `lib/sample-content.ts`.

---

## Task 1: Lapisan data inti — `lib/api.ts` (locales + tours) & skrip gerbang API

**Files:**
- Create: `lib/api.ts`
- Create: `scripts/check-api.mjs`
- Modify: `package.json` (skrip)
- Modify: `README.md`

**Interfaces:**
- Consumes: `Locale`, `ALL_LOCALES` dari `lib/locales.ts` (belum diubah — masih ada `PUBLISHED_LOCALES` di sana, tak dipakai task ini).
- Produces:
  - `API = "https://api.welcomemanado.my.id/api/intl"`
  - `apiGet<T>(path: string): Promise<T>` — throw pada gagal jaringan / status ≥ 400 (kecuali dipanggil lewat `apiGetOrNull`).
  - `apiGetOrNull<T>(path: string): Promise<T | null>` — `null` khusus status 404, throw sisanya.
  - Tipe `Category`, `TourList`, `TourDetail`, `Itinerary`.
  - `getLocales(): Promise<Locale[]>`
  - `getTours(locale: Locale): Promise<TourList[]>`
  - `getTour(locale: Locale, slug: string): Promise<TourDetail | null>`

- [ ] **Step 1: `npm install`** (sekali, lockfile sudah ada di repo)

Run: `cd /Users/marchelinoraco/Documents/2026/welcomeManado/intl_wm && npm install`
Expected: selesai tanpa error, `node_modules/` terisi.

- [ ] **Step 2: Tulis `lib/api.ts` (bagian inti + tours)**

```ts
import type { Locale } from "./locales";

/**
 * Lapisan data situs manado.tours. SEMUA fungsi di sini dipanggil HANYA saat
 * build (server component, generateStaticParams, generateMetadata). Pengunjung
 * situs statis tidak pernah memanggil API — halaman sudah jadi HTML.
 *
 * Bentuk tipe dicocokkan dengan Resource PHP di api_wm + respons production
 * sungguhan (lihat plan §"Bentuk respons API"), bukan tebakan.
 */

export const API = "https://api.welcomemanado.my.id/api/intl";

/** Gagal jaringan / status tak terduga → build berhenti. Tidak ada fallback. */
export async function apiGet<T>(path: string): Promise<T> {
  const url = `${API}${path}`;
  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (e) {
    throw new Error(`intl API tidak dapat dihubungi: ${url}\n  ${(e as Error).message}`);
  }
  if (!res.ok) {
    throw new Error(`intl API ${res.status} ${res.statusText}: ${url}`);
  }
  return (await res.json()) as T;
}

/** Seperti apiGet tapi 404 → null (dipakai detail lintas-bahasa untuk hreflang). */
export async function apiGetOrNull<T>(path: string): Promise<T | null> {
  const url = `${API}${path}`;
  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (e) {
    throw new Error(`intl API tidak dapat dihubungi: ${url}\n  ${(e as Error).message}`);
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`intl API ${res.status} ${res.statusText}: ${url}`);
  return (await res.json()) as T;
}

type ListEnvelope<T> = { success: boolean; data: T[]; meta: { page: number; per_page: number; total: number; last_page: number } };
type ItemEnvelope<T> = { success: boolean; data: T };

// ─── Tipe ────────────────────────────────────────────────────────────────

export type Category = { slug: string; name: string };

export type TourList = {
  slug: string;
  title: string;
  description: string; // HTML
  location: string;
  duration_days: number;
  duration_nights: number;
  duration_hours: number | null;
  is_featured: boolean;
  featured_badge: string | null;
  cover_image: string | null;
  category: Category | null;
};

export type Itinerary = {
  day_number: number;
  title: string | null;
  description: string | null; // HTML
  hotel_info: string | null;
  meals_info: string | null;
};

export type TourDetail = TourList & {
  inclusions: string | null; // HTML
  exclusions: string | null; // HTML
  itinerary_pdf_path: string | null;
  images: string[];
  itineraries: Itinerary[];
};

// ─── Endpoint ────────────────────────────────────────────────────────────

export async function getLocales(): Promise<Locale[]> {
  const res = await apiGet<{ success: boolean; data: string[] }>("/locales");
  return res.data as Locale[];
}

export async function getTours(locale: Locale): Promise<TourList[]> {
  const res = await apiGet<ListEnvelope<TourList>>(`/tours?locale=${locale}&per_page=100`);
  return res.data;
}

export async function getTour(locale: Locale, slug: string): Promise<TourDetail | null> {
  const res = await apiGetOrNull<ItemEnvelope<TourDetail>>(`/tours/${slug}?locale=${locale}`);
  return res ? res.data : null;
}
```

- [ ] **Step 3: Tulis `scripts/check-api.mjs`**

```js
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
```

- [ ] **Step 4: Tambah skrip ke `package.json`**

Sisipkan ke `"scripts"`:
```json
"check-api": "node scripts/check-api.mjs",
"prebuild": "node scripts/check-api.mjs",
```
(`prebuild` otomatis jalan sebelum `npm run build`.)

- [ ] **Step 5: Jalankan skrip + type-check**

Run: `node scripts/check-api.mjs && npx tsc --noEmit`
Expected: "Semua pemeriksaan lolos." lalu `tsc` selesai tanpa error.

- [ ] **Step 6: Catat di `README.md`**

Di bawah bagian "Build", tambah:
```markdown
## Verifikasi kontrak API

`npm run check-api` memanggil `/api/intl/*` production dan memeriksa bentuk
respons masih sesuai asumsi `lib/api.ts`. Otomatis jalan sebelum `npm run build`.
```

- [ ] **Step 7: Commit**

```bash
git add lib/api.ts scripts/check-api.mjs package.json README.md
git commit -m "feat(api): lapisan data inti — locales, tours, gerbang check-api"
```

---

## Task 2: `lib/api.ts` — hotels, gallery, blog, home, about

**Files:**
- Modify: `lib/api.ts`
- Modify: `scripts/check-api.mjs`

**Interfaces:**
- Consumes: `apiGet`, `apiGetOrNull`, `ListEnvelope`, `ItemEnvelope`, `TourList`, `Category` dari Task 1.
- Produces:
  - Tipe `Hotel`, `GalleryItem`, `BlogList`, `BlogDetail`, `AboutStory`, `TeamMember`, `HomePayload`, `AboutPayload`.
  - `getHotels(locale): Promise<Hotel[]>`, `getHotel(locale, slug): Promise<Hotel | null>`
  - `getGallery(locale): Promise<GalleryItem[]>`
  - `getBlogPosts(locale): Promise<BlogList[]>`, `getBlogPost(locale, slug): Promise<BlogDetail | null>`
  - `getHome(locale): Promise<HomePayload>`
  - `getAbout(locale): Promise<AboutPayload>`

- [ ] **Step 1: Tambah tipe + fungsi ke `lib/api.ts`**

```ts
export type Hotel = {
  slug: string;
  name: string;
  location: string;
  category: string; // enum mentah, mis. "city_hotel" — dipercantik di lib/format.ts
  stars: number;
  facilities: string[]; // array, BUKAN string \n-terpisah
  description: string | null; // HTML
  primary_image: string;
  images: string[];
};

export type GalleryItem = {
  id: number;
  title: string;
  image_path: string | null; // null = entri video, disaring di halaman galeri
  video_name: string | null;
};

export type BlogList = {
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string;
  author: string; // sering "admin" — tidak dirender
  published_at: string | null; // "Y-m-d"
  category: Category | null;
};

export type BlogDetail = BlogList & { content: string /* HTML */ };

export type AboutStory = {
  title_lead: string;
  title_accent: string;
  paragraph_one: string; // HTML
  paragraph_two: string; // HTML
  experience_value: string;
  experience_label: string;
  travelers_value: string;
  travelers_label: string;
  since_text: string;
  pioneering_text: string;
  image_url: string | null;
};

export type TeamMember = { name: string; position: string | null; image_url: string | null };

export type HomePayload = { hero_images: string[]; featured_tours: TourList[] };
export type AboutPayload = { story: AboutStory | null; team: TeamMember[] };

export async function getHotels(locale: Locale): Promise<Hotel[]> {
  const res = await apiGet<ListEnvelope<Hotel>>(`/hotels?locale=${locale}&per_page=100`);
  return res.data;
}

export async function getHotel(locale: Locale, slug: string): Promise<Hotel | null> {
  const res = await apiGetOrNull<ItemEnvelope<Hotel>>(`/hotels/${slug}?locale=${locale}`);
  return res ? res.data : null;
}

export async function getGallery(locale: Locale): Promise<GalleryItem[]> {
  const res = await apiGet<ListEnvelope<GalleryItem>>(`/gallery?locale=${locale}&per_page=100`);
  return res.data;
}

export async function getBlogPosts(locale: Locale): Promise<BlogList[]> {
  const res = await apiGet<ListEnvelope<BlogList>>(`/blog?locale=${locale}&per_page=100`);
  return res.data;
}

export async function getBlogPost(locale: Locale, slug: string): Promise<BlogDetail | null> {
  const res = await apiGetOrNull<ItemEnvelope<BlogDetail>>(`/blog/${slug}?locale=${locale}`);
  return res ? res.data : null;
}

export async function getHome(locale: Locale): Promise<HomePayload> {
  const res = await apiGet<ItemEnvelope<HomePayload>>(`/home?locale=${locale}`);
  return res.data;
}

export async function getAbout(locale: Locale): Promise<AboutPayload> {
  const res = await apiGet<ItemEnvelope<AboutPayload>>(`/about?locale=${locale}`);
  return res.data;
}
```

- [ ] **Step 2: Perluas `scripts/check-api.mjs`**

Tambah sebelum blok `if (failed)`:
```js
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
```

- [ ] **Step 3: Jalankan + type-check**

Run: `node scripts/check-api.mjs && npx tsc --noEmit`
Expected: semua lolos, `tsc` bersih.

- [ ] **Step 4: Commit**

```bash
git add lib/api.ts scripts/check-api.mjs
git commit -m "feat(api): hotels, gallery, blog, home, about"
```

---

## Task 3: `lib/availability.ts` + rombak `lib/locales.ts`

**Files:**
- Create: `lib/availability.ts`
- Modify: `lib/locales.ts`

**Interfaces:**
- Consumes: `getTours`, `getHotels`, `getGallery`, `getBlogPosts`, `getAbout` dari `lib/api.ts`; `ALL_LOCALES`, `Locale` dari `lib/locales.ts`.
- Produces:
  - `type Section = "tours" | "hotels" | "gallery" | "blog" | "about"`
  - `type Availability = Record<Locale, Record<Section, boolean>>`
  - `getAvailability(): Promise<Availability>` — memoized (satu `Promise` modul-level; 40 panggilan paralel sekali).
  - `publishedLocales(): Promise<Locale[]>` — locale dengan `tours: true`, urut mengikuti `ALL_LOCALES`.
  - `localesWith(section: Section): Promise<Locale[]>`

- [ ] **Step 1: Rombak `lib/locales.ts`**

Buang `PUBLISHED_LOCALES` dan `isPublished`. Berkas jadi:
```ts
/**
 * Delapan bahasa sasaran manado.tours. Bahasa Indonesia sengaja tidak ada —
 * pasar itu dilayani welcomemanado.com dengan katalog yang berbeda.
 *
 * Bahasa mana yang benar-benar DIBANGUN dihitung saat build dari
 * /api/intl/* — lihat lib/availability.ts. Tidak ada daftar hardcoded lagi.
 */
export const ALL_LOCALES = ["en", "ko", "zh", "fr", "de", "it", "es", "nl"] as const;

export type Locale = (typeof ALL_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Nama bahasa dalam bahasanya sendiri, untuk pengalih bahasa. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English", ko: "한국어", zh: "中文", fr: "Français",
  de: "Deutsch", it: "Italiano", es: "Español", nl: "Nederlands",
};

/** Kode hreflang lengkap dengan wilayah, sesuai anjuran Google. */
export const HREFLANG: Record<Locale, string> = {
  en: "en", ko: "ko-KR", zh: "zh-Hans", fr: "fr",
  de: "de", it: "it", es: "es", nl: "nl",
};

export const SITE_URL = "https://manado.tours";

export function isLocale(value: string): value is Locale {
  return (ALL_LOCALES as readonly string[]).includes(value);
}
```

- [ ] **Step 2: Tulis `lib/availability.ts`**

```ts
import { getAbout, getBlogPosts, getGallery, getHotels, getTours } from "./api";
import { ALL_LOCALES, type Locale } from "./locales";

/**
 * Ketersediaan dihitung per (jenis konten × bahasa), BUKAN satu status global.
 * Paket tour menentukan bahasa mana yang situsnya hidup sama sekali; menu
 * Hotels/Gallery/Blog/About hanya muncul di bahasa yang jenis itu berisi.
 *
 * 40 panggilan ringan (8 bahasa × 5 jenis), paralel, sekali di awal build.
 * Hasilnya di-memoize dalam proses (bukan disk).
 */

export type Section = "tours" | "hotels" | "gallery" | "blog" | "about";
export const SECTIONS: Section[] = ["tours", "hotels", "gallery", "blog", "about"];

export type Availability = Record<Locale, Record<Section, boolean>>;

async function probe(locale: Locale, section: Section): Promise<boolean> {
  switch (section) {
    case "tours":
      return (await getTours(locale)).length > 0;
    case "hotels":
      return (await getHotels(locale)).length > 0;
    case "gallery":
      // Item video (image_path null) tidak dihitung — halaman galeri hanya
      // merender gambar, jadi ketersediaan harus mengikuti gambar yang ada.
      return (await getGallery(locale)).some((g) => g.image_path);
    case "blog":
      return (await getBlogPosts(locale)).length > 0;
    case "about":
      return (await getAbout(locale)).story !== null;
  }
}

async function build(): Promise<Availability> {
  const entries = await Promise.all(
    ALL_LOCALES.map(async (locale) => {
      const flags = await Promise.all(SECTIONS.map((s) => probe(locale, s)));
      const record = Object.fromEntries(SECTIONS.map((s, i) => [s, flags[i]])) as Record<Section, boolean>;
      return [locale, record] as const;
    })
  );
  return Object.fromEntries(entries) as Availability;
}

let cached: Promise<Availability> | null = null;

export function getAvailability(): Promise<Availability> {
  if (!cached) cached = build();
  return cached;
}

/** Bahasa yang situsnya hidup sama sekali = punya paket tour. Urut ALL_LOCALES. */
export async function publishedLocales(): Promise<Locale[]> {
  const a = await getAvailability();
  return ALL_LOCALES.filter((l) => a[l].tours);
}

export async function localesWith(section: Section): Promise<Locale[]> {
  const a = await getAvailability();
  return ALL_LOCALES.filter((l) => a[l][section]);
}
```

- [ ] **Step 3: Type-check** — akan GAGAL di berkas yang masih mengimpor `PUBLISHED_LOCALES`/`isPublished`.

Run: `npx tsc --noEmit`
Expected: error HANYA "has no exported member 'PUBLISHED_LOCALES'" / "'isPublished'" di `app/[locale]/**` dan `components/**`. Itu diperbaiki Task 6–12. Catat daftar berkasnya.

- [ ] **Step 4: Commit** (WIP terkontrol — berkas konsumen diperbaiki di task berikutnya)

```bash
git add lib/locales.ts lib/availability.ts
git commit -m "feat(availability): ketersediaan per (jenis × bahasa) dari API, buang daftar hardcoded"
```

---

## Task 4: Konfigurasi — `next.config.js`, `.rich-text`, `lib/contact.ts`, `lib/format.ts`, hapus sample data

**Files:**
- Modify: `next.config.js`
- Modify: `app/globals.css`
- Create: `lib/contact.ts`
- Create: `lib/format.ts`
- Delete: `lib/sample-data.ts`, `lib/sample-hotels.ts`, `lib/sample-content.ts`

**Interfaces:**
- Produces:
  - `lib/contact.ts`: `chatHref(locale: Locale, tourTitle?: string): string`, `chatLabelKey(locale: Locale): "askOnWhatsapp" | "askOnKakao" | "askOnWechat"`
  - `lib/format.ts`: `prettifyCategory(key: string): string`

- [ ] **Step 1: `next.config.js` — ganti `remotePatterns`**

```js
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "api.welcomemanado.my.id" }],
  },
```

- [ ] **Step 2: `app/globals.css` — tambah `.rich-text`**

Tambah di bawah aturan `body`:
```css
/* Konten HTML dari /api/intl/* (deskripsi, itinerary, inclusions, blog, dll).
   Pola sama seperti .tour-rich-content di client_wm — bukan plugin typography. */
.rich-text > :first-child { margin-top: 0; }
.rich-text > :last-child { margin-bottom: 0; }
.rich-text p { margin: 0 0 1rem; }
.rich-text ul, .rich-text ol { margin: 0 0 1rem 1.5rem; }
.rich-text ul { list-style-type: disc; }
.rich-text ol { list-style-type: decimal; }
.rich-text li { margin-bottom: 0.5rem; }
.rich-text li > p { margin: 0; }
.rich-text h1, .rich-text h2, .rich-text h3, .rich-text h4 {
  color: rgb(15 23 42);
  font-weight: 900;
  line-height: 1.2;
  margin: 1.5rem 0 0.75rem;
}
.rich-text strong { font-weight: 700; color: rgb(15 23 42); }
.rich-text a { color: rgb(220 38 38); text-decoration: underline; }
```

- [ ] **Step 3: Tulis `lib/contact.ts`**

```ts
import type { Locale } from "./locales";

/**
 * Kanal kontak per bahasa. KakaoTalk (ko) & WeChat (zh) belum punya channel
 * resmi — untuk rilis pertama semuanya memakai tautan WhatsApp yang sama.
 * Begitu pemilik memberi channel sungguhan, ganti nilai DI SINI saja.
 */
const WHATSAPP = "6282173738822";

/** Kunci string i18n untuk label tombol, sesuai kanal bahasa. */
export function chatLabelKey(locale: Locale): "askOnWhatsapp" | "askOnKakao" | "askOnWechat" {
  if (locale === "ko") return "askOnKakao";
  if (locale === "zh") return "askOnWechat";
  return "askOnWhatsapp";
}

/**
 * Tautan click-to-chat. Dari halaman detail tour, `tourTitle` diisi supaya
 * pesan sudah menyebut paketnya. Semua kanal → WhatsApp untuk rilis pertama.
 */
export function chatHref(locale: Locale, tourTitle?: string): string {
  const msg = tourTitle
    ? `Hello Welcome Manado, I'd like to ask about this tour: ${tourTitle}`
    : "Hello Welcome Manado, I'd like to ask about your tours.";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
```

- [ ] **Step 4: Tulis `lib/format.ts`**

```ts
/**
 * Kategori hotel datang sebagai enum mentah dari API ("city_hotel", "resort",
 * "dive_resort", …). Diubah jadi teks layak tampil. Nama kategori tidak
 * diterjemahkan (sama seperti di API) — ini label pendek, bukan konten.
 */
export function prettifyCategory(key: string): string {
  if (!key) return "";
  return key
    .split(/[_-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
```

- [ ] **Step 5: Hapus berkas sample**

```bash
git rm lib/sample-data.ts lib/sample-hotels.ts lib/sample-content.ts
```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: error bertambah — sekarang juga "Cannot find module '@/lib/sample-data'" dst. di halaman. Masih diperbaiki Task 8–12. Konfirmasi tidak ada error di `lib/contact.ts` / `lib/format.ts` / `next.config.js` sendiri.

- [ ] **Step 7: Commit**

```bash
git add next.config.js app/globals.css lib/contact.ts lib/format.ts
git commit -m "chore: config API host, kelas .rich-text, lib/contact + lib/format, hapus sample data"
```

---

## Task 5: `lib/dictionary.ts` — bentuk ulang + lengkapi 5 bahasa Eropa

**Files:**
- Modify: `lib/dictionary.ts`

**Interfaces:**
- Consumes: `Locale` dari `lib/locales.ts`.
- Produces: `DICTIONARY: Record<Locale, Dict>` (semua 8 bahasa terisi penuh, tanpa cast), `dict(locale): Dict`. `Dict` baru = 37 kunci di bawah.

- [ ] **Step 1: Ganti seluruh isi `lib/dictionary.ts`**

Bentuk `Dict` baru: buang `from`, `formName`, `formEmail`, `formPax`, `formMessage`, `formSend`, `formNote`, `partOf` tetap, tambah `featuredTours`, `accommodation`, `pricingInfo`, `contactInquiry`.

```ts
import type { Locale } from "./locales";

/**
 * String antarmuka — teks yang TIDAK berasal dari database (label, tombol,
 * judul bagian). Teks konten (judul paket, deskripsi, itinerary) datang dari
 * /api/intl/* dalam bahasa yang diminta.
 *
 * Nilai en/ko/zh mengikuti client_wm/src/locales agar konsisten dengan situs
 * yang sudah berjalan. Kelima bahasa Eropa diisi khusus untuk situs ini.
 */
type Dict = {
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreTours: string;
  featuredTours: string;
  allTours: string;
  viewDetails: string;
  experienceDetails: string;
  plannedItinerary: string;
  inclusions: string;
  exclusions: string;
  accommodation: string;
  days: string;
  nights: string;
  pricingInfo: string;
  contactInquiry: string;
  bestPrice: string;
  askOnWhatsapp: string;
  askOnKakao: string;
  askOnWechat: string;
  partOf: string;
  navHotels: string;
  navGallery: string;
  navBlog: string;
  navAbout: string;
  navContact: string;
  hotelsHeading: string;
  hotelsLede: string;
  facilities: string;
  galleryHeading: string;
  blogHeading: string;
  readMore: string;
  aboutHeading: string;
  teamHeading: string;
  contactHeading: string;
  contactLede: string;
};

export const DICTIONARY: Record<Locale, Dict> = {
  en: {
    tagline: "Tours in Manado & North Sulawesi",
    heroTitle: "Dive Bunaken. Climb Tomohon. Sail Likupang.",
    heroSubtitle:
      "Small-group tours run by people who grew up here — reefs, volcanoes, and villages most visitors never reach.",
    exploreTours: "Explore Tours",
    featuredTours: "Featured Tours",
    allTours: "All Tours",
    viewDetails: "View Details",
    experienceDetails: "Experience Details",
    plannedItinerary: "Planned Itinerary",
    inclusions: "Included",
    exclusions: "Not Included",
    accommodation: "Accommodation",
    days: "Days",
    nights: "Nights",
    pricingInfo: "Pricing Information",
    contactInquiry: "Contact us for pricing",
    bestPrice: "Best Price Guarantee",
    askOnWhatsapp: "Ask on WhatsApp",
    askOnKakao: "Ask on KakaoTalk",
    askOnWechat: "Ask on WeChat",
    partOf: "Part of Welcome Manado",
    navHotels: "Hotels",
    navGallery: "Gallery",
    navBlog: "Journal",
    navAbout: "About",
    navContact: "Contact",
    hotelsHeading: "Where to stay",
    hotelsLede:
      "Places we book for our own guests — on the reef, in the city, and up in the highlands.",
    facilities: "Facilities",
    galleryHeading: "Gallery",
    blogHeading: "Journal",
    readMore: "Read more",
    aboutHeading: "About us",
    teamHeading: "The people who run it",
    contactHeading: "Talk to us",
    contactLede:
      "Tell us roughly when you are coming and how many of you there are. We reply in your language, usually within a day.",
  },
  ko: {
    tagline: "마나도 & 북술라웨시 투어",
    heroTitle: "부나켄 다이빙. 토모혼 트레킹. 리쿠팡 항해.",
    heroSubtitle:
      "이곳에서 나고 자란 사람들이 안내하는 소규모 투어 — 일반 여행객이 닿지 못하는 산호초와 화산, 그리고 마을까지.",
    exploreTours: "투어 둘러보기",
    featuredTours: "추천 투어",
    allTours: "전체 투어",
    viewDetails: "상세 보기",
    experienceDetails: "상세 내용",
    plannedItinerary: "계획된 일정",
    inclusions: "포함 사항",
    exclusions: "불포함 사항",
    accommodation: "숙소",
    days: "일",
    nights: "박",
    pricingInfo: "가격 안내",
    contactInquiry: "가격 문의하기",
    bestPrice: "최저가 보장",
    askOnWhatsapp: "WhatsApp 문의",
    askOnKakao: "카카오톡 문의",
    askOnWechat: "WeChat 문의",
    partOf: "Welcome Manado 운영",
    navHotels: "호텔",
    navGallery: "갤러리",
    navBlog: "저널",
    navAbout: "소개",
    navContact: "문의",
    hotelsHeading: "숙소",
    hotelsLede: "저희가 손님께 직접 예약해 드리는 곳들 — 산호초 위, 시내, 그리고 고원.",
    facilities: "시설",
    galleryHeading: "갤러리",
    blogHeading: "저널",
    readMore: "더 읽기",
    aboutHeading: "소개",
    teamHeading: "함께하는 사람들",
    contactHeading: "문의하기",
    contactLede:
      "대략 언제 오시는지, 몇 분이신지 알려주세요. 사용하시는 언어로, 보통 하루 안에 답변드립니다.",
  },
  zh: {
    tagline: "美娜多与北苏拉威西旅游",
    heroTitle: "潜水布纳肯。登上托莫洪。航行利库邦。",
    heroSubtitle:
      "由土生土长的当地人带领的小团游 —— 珊瑚礁、火山，以及大多数游客到不了的村落。",
    exploreTours: "探索行程",
    featuredTours: "精选行程",
    allTours: "全部行程",
    viewDetails: "查看详情",
    experienceDetails: "体验详情",
    plannedItinerary: "计划行程",
    inclusions: "费用包含",
    exclusions: "费用不含",
    accommodation: "住宿",
    days: "天",
    nights: "晚",
    pricingInfo: "价格信息",
    contactInquiry: "咨询价格",
    bestPrice: "最佳价格保证",
    askOnWhatsapp: "WhatsApp 咨询",
    askOnKakao: "KakaoTalk 咨询",
    askOnWechat: "微信咨询",
    partOf: "Welcome Manado 旗下",
    navHotels: "住宿",
    navGallery: "相册",
    navBlog: "手记",
    navAbout: "关于",
    navContact: "联系",
    hotelsHeading: "住在哪里",
    hotelsLede: "我们为自家客人预订的地方 —— 珊瑚礁旁、市区之中，以及高地之上。",
    facilities: "设施",
    galleryHeading: "相册",
    blogHeading: "手记",
    readMore: "阅读全文",
    aboutHeading: "关于我们",
    teamHeading: "带你出行的人",
    contactHeading: "联系我们",
    contactLede: "告诉我们大致的出行时间和人数。我们会用您的语言回覆，通常一天之内。",
  },
  fr: {
    tagline: "Circuits à Manado et dans le Nord de Sulawesi",
    heroTitle: "Plongez à Bunaken. Grimpez à Tomohon. Naviguez à Likupang.",
    heroSubtitle:
      "Des circuits en petit groupe menés par ceux qui ont grandi ici — récifs, volcans et villages que la plupart des visiteurs ne voient jamais.",
    exploreTours: "Découvrir les circuits",
    featuredTours: "Circuits en vedette",
    allTours: "Tous les circuits",
    viewDetails: "Voir les détails",
    experienceDetails: "Détails de l'expérience",
    plannedItinerary: "Itinéraire prévu",
    inclusions: "Inclus",
    exclusions: "Non inclus",
    accommodation: "Hébergement",
    days: "Jours",
    nights: "Nuits",
    pricingInfo: "Informations tarifaires",
    contactInquiry: "Contactez-nous pour les tarifs",
    bestPrice: "Meilleur prix garanti",
    askOnWhatsapp: "Demander sur WhatsApp",
    askOnKakao: "Demander sur KakaoTalk",
    askOnWechat: "Demander sur WeChat",
    partOf: "Une marque de Welcome Manado",
    navHotels: "Hôtels",
    navGallery: "Galerie",
    navBlog: "Journal",
    navAbout: "À propos",
    navContact: "Contact",
    hotelsHeading: "Où loger",
    hotelsLede:
      "Des adresses que nous réservons pour nos propres clients — sur le récif, en ville et sur les hauts plateaux.",
    facilities: "Équipements",
    galleryHeading: "Galerie",
    blogHeading: "Journal",
    readMore: "Lire la suite",
    aboutHeading: "À propos de nous",
    teamHeading: "Ceux qui font vivre l'agence",
    contactHeading: "Parlez-nous",
    contactLede:
      "Dites-nous à peu près quand vous venez et combien vous êtes. Nous répondons dans votre langue, généralement sous 24 heures.",
  },
  de: {
    tagline: "Touren in Manado und Nord-Sulawesi",
    heroTitle: "Tauchen in Bunaken. Wandern in Tomohon. Segeln in Likupang.",
    heroSubtitle:
      "Touren in kleinen Gruppen, geführt von Menschen, die hier aufgewachsen sind — Riffe, Vulkane und Dörfer, die die meisten Besucher nie erreichen.",
    exploreTours: "Touren entdecken",
    featuredTours: "Ausgewählte Touren",
    allTours: "Alle Touren",
    viewDetails: "Details ansehen",
    experienceDetails: "Details zum Erlebnis",
    plannedItinerary: "Geplanter Reiseverlauf",
    inclusions: "Inbegriffen",
    exclusions: "Nicht inbegriffen",
    accommodation: "Unterkunft",
    days: "Tage",
    nights: "Nächte",
    pricingInfo: "Preisinformationen",
    contactInquiry: "Kontaktieren Sie uns für Preise",
    bestPrice: "Bestpreisgarantie",
    askOnWhatsapp: "Auf WhatsApp fragen",
    askOnKakao: "Auf KakaoTalk fragen",
    askOnWechat: "Auf WeChat fragen",
    partOf: "Teil von Welcome Manado",
    navHotels: "Hotels",
    navGallery: "Galerie",
    navBlog: "Journal",
    navAbout: "Über uns",
    navContact: "Kontakt",
    hotelsHeading: "Wo übernachten",
    hotelsLede:
      "Adressen, die wir für unsere eigenen Gäste buchen — am Riff, in der Stadt und im Hochland.",
    facilities: "Ausstattung",
    galleryHeading: "Galerie",
    blogHeading: "Journal",
    readMore: "Weiterlesen",
    aboutHeading: "Über uns",
    teamHeading: "Die Menschen dahinter",
    contactHeading: "Sprechen Sie mit uns",
    contactLede:
      "Sagen Sie uns ungefähr, wann Sie kommen und wie viele Sie sind. Wir antworten in Ihrer Sprache, meist innerhalb eines Tages.",
  },
  it: {
    tagline: "Tour a Manado e nel Nord Sulawesi",
    heroTitle: "Immersioni a Bunaken. Trekking a Tomohon. Vela a Likupang.",
    heroSubtitle:
      "Tour in piccoli gruppi guidati da chi è cresciuto qui — barriere coralline, vulcani e villaggi che la maggior parte dei visitatori non raggiunge mai.",
    exploreTours: "Scopri i tour",
    featuredTours: "Tour in evidenza",
    allTours: "Tutti i tour",
    viewDetails: "Vedi dettagli",
    experienceDetails: "Dettagli dell'esperienza",
    plannedItinerary: "Itinerario previsto",
    inclusions: "Incluso",
    exclusions: "Non incluso",
    accommodation: "Alloggio",
    days: "Giorni",
    nights: "Notti",
    pricingInfo: "Informazioni sui prezzi",
    contactInquiry: "Contattaci per i prezzi",
    bestPrice: "Miglior prezzo garantito",
    askOnWhatsapp: "Chiedi su WhatsApp",
    askOnKakao: "Chiedi su KakaoTalk",
    askOnWechat: "Chiedi su WeChat",
    partOf: "Parte di Welcome Manado",
    navHotels: "Hotel",
    navGallery: "Galleria",
    navBlog: "Diario",
    navAbout: "Chi siamo",
    navContact: "Contatti",
    hotelsHeading: "Dove alloggiare",
    hotelsLede:
      "Strutture che prenotiamo per i nostri ospiti — sulla barriera corallina, in città e sugli altopiani.",
    facilities: "Servizi",
    galleryHeading: "Galleria",
    blogHeading: "Diario",
    readMore: "Leggi di più",
    aboutHeading: "Chi siamo",
    teamHeading: "Le persone che la gestiscono",
    contactHeading: "Parla con noi",
    contactLede:
      "Diteci più o meno quando arrivate e in quanti siete. Rispondiamo nella vostra lingua, di solito entro un giorno.",
  },
  es: {
    tagline: "Tours en Manado y el norte de Célebes",
    heroTitle: "Bucea en Bunaken. Sube a Tomohon. Navega en Likupang.",
    heroSubtitle:
      "Tours en grupos reducidos guiados por gente que creció aquí — arrecifes, volcanes y aldeas que la mayoría de los visitantes nunca alcanza.",
    exploreTours: "Explorar tours",
    featuredTours: "Tours destacados",
    allTours: "Todos los tours",
    viewDetails: "Ver detalles",
    experienceDetails: "Detalles de la experiencia",
    plannedItinerary: "Itinerario previsto",
    inclusions: "Incluido",
    exclusions: "No incluido",
    accommodation: "Alojamiento",
    days: "Días",
    nights: "Noches",
    pricingInfo: "Información de precios",
    contactInquiry: "Contáctanos para precios",
    bestPrice: "Mejor precio garantizado",
    askOnWhatsapp: "Preguntar por WhatsApp",
    askOnKakao: "Preguntar por KakaoTalk",
    askOnWechat: "Preguntar por WeChat",
    partOf: "Parte de Welcome Manado",
    navHotels: "Hoteles",
    navGallery: "Galería",
    navBlog: "Diario",
    navAbout: "Nosotros",
    navContact: "Contacto",
    hotelsHeading: "Dónde alojarse",
    hotelsLede:
      "Lugares que reservamos para nuestros propios huéspedes — en el arrecife, en la ciudad y en las tierras altas.",
    facilities: "Instalaciones",
    galleryHeading: "Galería",
    blogHeading: "Diario",
    readMore: "Leer más",
    aboutHeading: "Sobre nosotros",
    teamHeading: "Las personas que lo hacen posible",
    contactHeading: "Habla con nosotros",
    contactLede:
      "Cuéntanos aproximadamente cuándo vienes y cuántos sois. Respondemos en tu idioma, normalmente en menos de un día.",
  },
  nl: {
    tagline: "Tours in Manado en Noord-Sulawesi",
    heroTitle: "Duik in Bunaken. Beklim Tomohon. Zeil naar Likupang.",
    heroSubtitle:
      "Tours in kleine groepen, geleid door mensen die hier zijn opgegroeid — riffen, vulkanen en dorpen die de meeste bezoekers nooit bereiken.",
    exploreTours: "Tours ontdekken",
    featuredTours: "Uitgelichte tours",
    allTours: "Alle tours",
    viewDetails: "Details bekijken",
    experienceDetails: "Details van de ervaring",
    plannedItinerary: "Gepland reisschema",
    inclusions: "Inbegrepen",
    exclusions: "Niet inbegrepen",
    accommodation: "Accommodatie",
    days: "Dagen",
    nights: "Nachten",
    pricingInfo: "Prijsinformatie",
    contactInquiry: "Neem contact op voor prijzen",
    bestPrice: "Laagsteprijsgarantie",
    askOnWhatsapp: "Vraag het via WhatsApp",
    askOnKakao: "Vraag het via KakaoTalk",
    askOnWechat: "Vraag het via WeChat",
    partOf: "Onderdeel van Welcome Manado",
    navHotels: "Hotels",
    navGallery: "Galerij",
    navBlog: "Journaal",
    navAbout: "Over ons",
    navContact: "Contact",
    hotelsHeading: "Waar te overnachten",
    hotelsLede:
      "Plekken die we voor onze eigen gasten boeken — aan het rif, in de stad en in het hoogland.",
    facilities: "Voorzieningen",
    galleryHeading: "Galerij",
    blogHeading: "Journaal",
    readMore: "Lees meer",
    aboutHeading: "Over ons",
    teamHeading: "De mensen erachter",
    contactHeading: "Praat met ons",
    contactLede:
      "Vertel ons ongeveer wanneer je komt en met hoeveel jullie zijn. We antwoorden in je eigen taal, meestal binnen een dag.",
  },
};

export function dict(locale: Locale): Dict {
  return DICTIONARY[locale];
}
```

- [ ] **Step 2: Type-check** (dictionary sendiri harus bersih; compiler menjamin tidak ada field terlewat karena tak ada cast)

Run: `npx tsc --noEmit 2>&1 | grep -i dictionary`
Expected: TIDAK ada baris — `lib/dictionary.ts` bersih. (Error lain di halaman masih ada dari Task 3–4.)

- [ ] **Step 3: Commit**

```bash
git add lib/dictionary.ts
git commit -m "feat(i18n): lengkapi fr/de/it/es/nl, bentuk ulang Dict (buang form & harga)"
```

---

## Task 6: Komponen bersama — `RichText`, `JsonLd`, `Header`, `LanguageSwitcher`, `TourCard`

**Files:**
- Create: `components/RichText.tsx`, `components/JsonLd.tsx`
- Modify: `components/Header.tsx`, `components/LanguageSwitcher.tsx`, `components/TourCard.tsx`

**Interfaces:**
- Consumes: `getAvailability`, `type Section` (Task 3); `dict` (Task 5); `TourList` (Task 1); `chatHref` tidak dipakai di sini.
- Produces:
  - `<RichText html={string} className?={string} />` — `<div className="rich-text …" dangerouslySetInnerHTML>`
  - `<JsonLd data={Record<string, unknown>} />`
  - `<Header locale={Locale} />` — async, memuat availability sendiri.
  - `<LanguageSwitcher current={Locale} availableIn={Locale[]} />`
  - `<TourCard tour={TourList} locale={Locale} />`

- [ ] **Step 1: `components/RichText.tsx`**

```tsx
/**
 * Satu-satunya tempat konten HTML dari /api/intl/* disisipkan. Konten berasal
 * dari database milik sistem sendiri (bukan input pengguna), jadi
 * dangerouslySetInnerHTML di sini bukan celah XSS — sama seperti client_wm
 * merender description tour lewat v-html.
 */
export default function RichText({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
```

- [ ] **Step 2: `components/JsonLd.tsx`**

```tsx
/** Structured data. Server component — dirender jadi <script> statis di HTML. */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 3: `components/Header.tsx` — async + nav digerbangi availability**

```tsx
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { getAvailability, publishedLocales } from "@/lib/availability";

export default async function Header({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const availability = await getAvailability();
  const published = await publishedLocales();
  const a = availability[locale];

  // Tours & Contact selalu ada di setiap bahasa terbit. Sisanya menyusul
  // ketika jenis kontennya diterjemahkan — muncul sendiri, tanpa kode baru.
  const nav = [
    { href: `/${locale}/tours/`, label: t.allTours, show: true },
    { href: `/${locale}/hotels/`, label: t.navHotels, show: a.hotels },
    { href: `/${locale}/gallery/`, label: t.navGallery, show: a.gallery },
    { href: `/${locale}/blog/`, label: t.navBlog, show: a.blog },
    { href: `/${locale}/about/`, label: t.navAbout, show: a.about },
    { href: `/${locale}/contact/`, label: t.navContact, show: true },
  ].filter((i) => i.show);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-6 py-4 lg:px-10">
        <Link href={`/${locale}/`} className="flex items-baseline gap-2">
          <span className="text-xl font-black uppercase tracking-tighter text-slate-900">
            manado<span className="text-red-600">.tours</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-black uppercase tracking-widest text-slate-500 transition-colors hover:text-red-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher current={locale} availableIn={published} />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: `components/LanguageSwitcher.tsx` — prop `availableIn`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_LABELS, type Locale } from "@/lib/locales";

/**
 * Menautkan ke halaman PADANANNYA di bahasa lain — menukar segmen locale,
 * mempertahankan sisa path. `availableIn` = bahasa yang halaman ini benar-benar
 * ada; bahasa di luar itu tidak ditampilkan supaya pengunjung tak pernah
 * diarahkan ke halaman yang tidak dibangun.
 */
export default function LanguageSwitcher({
  current,
  availableIn,
}: {
  current: Locale;
  availableIn: Locale[];
}) {
  const pathname = usePathname() || `/${current}/`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1">
      {availableIn.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}/${rest}`}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-white"
                : "rounded-lg px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            }
          >
            {LOCALE_LABELS[locale]}
          </Link>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 5: `components/TourCard.tsx` — `cover_image`, tanpa harga, ringkasan dari HTML**

```tsx
import Image from "next/image";
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { TourList } from "@/lib/api";

/** Ambil teks polos singkat dari deskripsi HTML untuk ringkasan kartu. */
function excerptFromHtml(html: string, max = 140): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export default function TourCard({ tour, locale }: { tour: TourList; locale: Locale }) {
  const t = dict(locale);
  const duration =
    tour.duration_nights > 0
      ? `${tour.duration_days} ${t.days} / ${tour.duration_nights} ${t.nights}`
      : `${tour.duration_days} ${t.days}`;

  return (
    <Link
      href={`/${locale}/tours/${tour.slug}/`}
      className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {tour.cover_image && (
          <Image
            src={tour.cover_image}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {tour.featured_badge && (
          <span className="absolute left-5 top-5 rounded-lg bg-red-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {tour.featured_badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        {tour.category && (
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
            {tour.category.name}
          </p>
        )}
        <h3 className="mt-3 text-xl font-black uppercase leading-tight tracking-tighter text-slate-900">
          {tour.title}
        </h3>
        <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
          {duration} · {tour.location}
        </p>
        <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500">
          {excerptFromHtml(tour.description)}
        </p>

        <span className="mt-auto pt-7 text-[11px] font-black uppercase tracking-widest text-red-600">
          {t.viewDetails} →
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 6: Type-check komponen**

Run: `npx tsc --noEmit 2>&1 | grep -E 'components/(RichText|JsonLd|Header|LanguageSwitcher|TourCard)'`
Expected: tidak ada baris untuk kelima berkas ini. (Error di `app/**` masih ada sampai Task 7–12.)

- [ ] **Step 7: Commit**

```bash
git add components/RichText.tsx components/JsonLd.tsx components/Header.tsx components/LanguageSwitcher.tsx components/TourCard.tsx
git commit -m "feat(components): RichText, JsonLd, Header/nav digerbangi availability, TourCard tanpa harga"
```

---

## Task 7: `app/[locale]/layout.tsx` — root layout async + JSON-LD TravelAgency

**Files:**
- Modify: `app/[locale]/layout.tsx`

**Interfaces:**
- Consumes: `publishedLocales` (Task 3); `dict` (Task 5); `HREFLANG`, `DEFAULT_LOCALE`, `SITE_URL`, `isLocale`, `Locale` (Task 3); `JsonLd` (Task 6).
- Produces: layout membangun 8 locale (semua published), memasang `<Header>`, `<Footer>`, JSON-LD `TravelAgency`.

- [ ] **Step 1: Ganti isi `app/[locale]/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "../globals.css";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { DEFAULT_LOCALE, HREFLANG, SITE_URL, isLocale, type Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { dict } from "@/lib/dictionary";

/**
 * INI root layout aplikasi — tidak ada app/layout.tsx di atasnya. Segmen
 * dinamis [locale] sebagai segmen teratas berarti layout inilah yang memegang
 * <html>/<body>, sehingga atribut `lang` bisa benar per bahasa.
 *
 * Root `/` sengaja tidak punya halaman: nginx yang mengalihkannya (302) sesuai
 * Accept-Language. Saat `npm run dev`, buka `/en/` langsung.
 */
export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  const t = dict(locale);
  const published = await publishedLocales();

  const languages: Record<string, string> = {};
  for (const l of published) languages[HREFLANG[l]] = `${SITE_URL}/${l}/`;
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}/`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `Welcome Manado — ${t.tagline}`, template: `%s | manado.tours` },
    description: t.heroSubtitle,
    alternates: { canonical: `${SITE_URL}/${locale}/`, languages },
    openGraph: { siteName: "Welcome Manado", locale: HREFLANG[locale], type: "website" },
  };
}

const TRAVEL_AGENCY_LD = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Welcome Manado",
  url: SITE_URL,
  areaServed: "North Sulawesi, Indonesia",
  parentOrganization: { "@type": "Organization", name: "Welcome Manado", url: "https://welcomemanado.com" },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <html lang={HREFLANG[locale]}>
      <body>
        <JsonLd data={TRAVEL_AGENCY_LD} />
        {/* @ts-expect-error async server component */}
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
```

> Catatan: `@ts-expect-error async server component` hanya perlu bila versi `@types/react` di repo belum mengenali async component sebagai `ReactNode`. Hapus baris itu bila `tsc` tidak mengeluh.

- [ ] **Step 2: Type-check layout**

Run: `npx tsc --noEmit 2>&1 | grep 'layout.tsx'`
Expected: tidak ada baris (atau hapus `@ts-expect-error` bila justru itu yang dikeluhkan sebagai "unused").

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/layout.tsx"
git commit -m "feat(layout): root layout async, hreflang dari published locales, JSON-LD TravelAgency"
```

---

## Task 8: Beranda — `app/[locale]/page.tsx` (getHome)

**Files:**
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `getHome` (Task 2); `publishedLocales` (Task 3); `dict` (Task 5); `TourCard` (Task 6).
- Produces: beranda per bahasa terbit; hero pakai `hero_images[0]`, grid pakai `featured_tours`.

- [ ] **Step 1: Ganti isi `app/[locale]/page.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import TourCard from "@/components/TourCard";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { getHome } from "@/lib/api";

export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const { hero_images, featured_tours } = await getHome(locale);
  const hero = hero_images[0] ?? null;

  return (
    <>
      <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-slate-900">
        {hero && (
          <Image src={hero} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/45 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-red-400">{t.tagline}</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-7 max-w-2xl text-base font-medium leading-relaxed text-white/75 md:text-lg">
            {t.heroSubtitle}
          </p>
          <Link
            href={`/${locale}/tours/`}
            className="mt-10 inline-block rounded-xl bg-red-600 px-9 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/25 transition-transform hover:scale-105"
          >
            {t.exploreTours}
          </Link>
        </div>
      </section>

      {featured_tours.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-12 flex items-center gap-4">
            <span className="h-1 w-12 rounded-full bg-red-600" />
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
              {t.featuredTours}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured_tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
```

- [ ] **Step 2: Build cepat satu bahasa** (dev server; `output: export` tidak aktif di dev)

Run:
```bash
npm run dev  # di terminal terpisah / background
curl -s http://localhost:3000/en/ | grep -o '<h1[^>]*>[^<]*</h1>' | head -1
curl -s http://localhost:3000/fr/ | grep -c 'manado.tours'
```
Expected: `<h1>` berisi teks heroTitle EN; halaman FR memuat (>0). Hentikan dev server.

- [ ] **Step 3: Commit**

```bash
git add "app/[locale]/page.tsx"
git commit -m "feat(home): hero + featured tours dari /api/intl/home"
```

---

## Task 9: Tours — daftar & detail

**Files:**
- Modify: `app/[locale]/tours/page.tsx`, `app/[locale]/tours/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getTours`, `getTour` (Task 1); `publishedLocales` (Task 3); `dict` (Task 5); `RichText`, `JsonLd`, `TourCard` (Task 6); `chatHref`, `chatLabelKey` (Task 4); `HREFLANG`, `SITE_URL` (Task 3).
- Produces: `/[locale]/tours/` untuk semua published locale; `/[locale]/tours/[slug]/` untuk tiap (locale × paket) yang ada di `getTours(locale)`.

- [ ] **Step 1: `app/[locale]/tours/page.tsx`**

```tsx
import type { Metadata } from "next";
import TourCard from "@/components/TourCard";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { getTours } from "@/lib/api";

export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = dict(params.locale);
  return { title: t.allTours, description: t.heroSubtitle };
}

export default async function ToursPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const tours = await getTours(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-12 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{t.allTours}</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <TourCard key={tour.slug} tour={tour} locale={locale} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `app/[locale]/tours/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import RichText from "@/components/RichText";
import JsonLd from "@/components/JsonLd";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { dict } from "@/lib/dictionary";
import { HREFLANG, SITE_URL, type Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { getTour, getTours } from "@/lib/api";
import { chatHref, chatLabelKey } from "@/lib/contact";

/** Satu halaman per (bahasa × paket) — hanya untuk paket yang ada di daftar bahasa itu. */
export async function generateStaticParams() {
  const locales = await publishedLocales();
  const lists = await Promise.all(locales.map((locale) => getTours(locale)));
  return locales.flatMap((locale, i) => lists[i].map((tour) => ({ locale, slug: tour.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const tour = await getTour(params.locale, params.slug);
  if (!tour) return {};

  const description = tour.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  const locales = await publishedLocales();
  const present = await Promise.all(locales.map((l) => getTour(l, params.slug)));
  const languages: Record<string, string> = {};
  locales.forEach((l, i) => {
    if (present[i]) languages[HREFLANG[l]] = `${SITE_URL}/${l}/tours/${params.slug}/`;
  });

  return {
    title: tour.title,
    description,
    alternates: { canonical: `${SITE_URL}/${params.locale}/tours/${params.slug}/`, languages },
    openGraph: {
      title: tour.title,
      description,
      images: tour.cover_image ? [tour.cover_image] : [],
      type: "article",
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const tour = await getTour(params.locale, params.slug);
  // Slug berasal dari getTours(locale) sendiri — null di sini berarti daftar &
  // detail tidak konsisten. Build harus gagal, bukan diam-diam menampilkan 404.
  if (!tour) {
    throw new Error(`Inkonsistensi data: /tours/${params.slug} 404 di ${params.locale} padahal ada di daftar`);
  }

  const t = dict(params.locale);
  const locales = await publishedLocales();
  const present = await Promise.all(locales.map((l) => getTour(l, params.slug)));
  const availableIn = locales.filter((_, i) => present[i]);

  const duration =
    tour.duration_nights > 0
      ? `${tour.duration_days} ${t.days} / ${tour.duration_nights} ${t.nights}`
      : `${tour.duration_days} ${t.days}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 300),
    ...(tour.cover_image ? { image: tour.cover_image } : {}),
    touristType: tour.category?.name,
    provider: { "@type": "TravelAgency", name: "Welcome Manado", url: SITE_URL },
    // Tidak ada Offer — API tidak mengembalikan harga untuk paket Manado.
  };

  const chatLabel = t[chatLabelKey(params.locale)];

  return (
    <article>
      <JsonLd data={jsonLd} />

      <header className="relative flex min-h-[62vh] items-end overflow-hidden bg-slate-900">
        {tour.cover_image && (
          <Image src={tour.cover_image} alt={tour.title} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="flex flex-wrap gap-3">
            {tour.category && (
              <span className="rounded-xl bg-red-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                {tour.category.name}
              </span>
            )}
            <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
              {duration}
            </span>
          </div>
          <h1 className="mt-7 max-w-4xl text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-5xl lg:text-6xl">
            {tour.title}
          </h1>
          <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-white/70">{tour.location}</p>
          <div className="mt-6">
            <LanguageSwitcher current={params.locale} availableIn={availableIn} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="space-y-20 lg:col-span-8">
          <section>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-1 w-12 rounded-full bg-red-600" />
              <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                {t.experienceDetails}
              </h2>
            </div>
            <RichText html={tour.description} className="text-lg font-medium leading-[1.8] text-slate-600" />
          </section>

          {tour.itineraries.length > 0 && (
            <section>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-1 w-12 rounded-full bg-red-600" />
                <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                  {t.plannedItinerary}
                </h2>
              </div>
              <ol className="space-y-6">
                {tour.itineraries.map((day) => (
                  <li key={day.day_number} className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
                    <div className="flex items-baseline gap-4">
                      <span className="rounded-xl bg-slate-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
                        {t.days} {day.day_number}
                      </span>
                      {day.title && (
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">{day.title}</h3>
                      )}
                    </div>
                    {day.description && (
                      <RichText html={day.description} className="mt-4 text-sm font-medium leading-relaxed text-slate-600" />
                    )}
                    {(day.hotel_info || day.meals_info) && (
                      <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                        {[day.hotel_info, day.meals_info].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {(tour.inclusions || tour.exclusions) && (
            <section className="grid gap-6 md:grid-cols-2">
              {tour.inclusions && (
                <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50 p-8">
                  <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-emerald-800">{t.inclusions}</h2>
                  <RichText html={tour.inclusions} className="text-sm font-medium leading-relaxed text-emerald-900" />
                </div>
              )}
              {tour.exclusions && (
                <div className="rounded-[2rem] border border-red-100 bg-red-50 p-8">
                  <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-red-800">{t.exclusions}</h2>
                  <RichText html={tour.exclusions} className="text-sm font-medium leading-relaxed text-red-900" />
                </div>
              )}
            </section>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-900/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.pricingInfo}</p>
            <p className="mt-2 text-xl font-black uppercase tracking-tight text-slate-900">{t.contactInquiry}</p>
            <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-red-600">{t.bestPrice}</p>

            <a
              href={chatHref(params.locale, tour.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-xl bg-red-600 px-6 py-4 text-center text-[11px] font-black uppercase tracking-widest text-white transition-transform hover:scale-105"
            >
              {chatLabel}
            </a>

            {tour.itinerary_pdf_path && (
              <a
                href={tour.itinerary_pdf_path}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-xl border border-slate-200 px-6 py-3 text-center text-[11px] font-black uppercase tracking-widest text-slate-500 transition-colors hover:border-slate-900 hover:text-slate-900"
              >
                PDF
              </a>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Dev smoke**

Run:
```bash
npm run dev
curl -s http://localhost:3000/en/tours/ | grep -c 'tours/'
SLUG=$(curl -s 'https://api.welcomemanado.my.id/api/intl/tours?locale=en&per_page=1' | node -e 'process.stdin.on("data",d=>console.log(JSON.parse(d).data[0].slug))')
curl -s "http://localhost:3000/en/tours/$SLUG/" | grep -o 'rich-text' | head -1
curl -s "http://localhost:3000/fr/tours/$SLUG/" | grep -o 'wa.me' | head -1
```
Expected: daftar memuat kartu; detail berisi `rich-text`; FR detail berisi `wa.me`. Hentikan dev server.

- [ ] **Step 4: Commit**

```bash
git add "app/[locale]/tours/page.tsx" "app/[locale]/tours/[slug]/page.tsx"
git commit -m "feat(tours): daftar + detail dari API, render HTML, kartu hubungi-untuk-harga, JSON-LD"
```

---

## Task 10: Hotels — daftar & detail

**Files:**
- Modify: `app/[locale]/hotels/page.tsx`, `app/[locale]/hotels/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getHotels`, `getHotel` (Task 2); `localesWith` (Task 3); `dict` (Task 5); `RichText`, `JsonLd`, `LanguageSwitcher` (Task 6); `prettifyCategory` (Task 4); `HREFLANG`, `SITE_URL` (Task 3).
- Produces: `/[locale]/hotels/` & `/[locale]/hotels/[slug]/` HANYA untuk `localesWith("hotels")` (en/ko/zh hari ini). Locale lain → route tidak dibangun.

- [ ] **Step 1: `app/[locale]/hotels/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RichText from "@/components/RichText";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getHotels } from "@/lib/api";
import { prettifyCategory } from "@/lib/format";

export async function generateStaticParams() {
  return (await localesWith("hotels")).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = dict(params.locale);
  return { title: t.hotelsHeading, description: t.hotelsLede };
}

export default async function HotelsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const hotels = await getHotels(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{t.hotelsHeading}</h1>
      </div>
      <p className="mb-12 max-w-2xl text-base font-medium leading-relaxed text-slate-500">{t.hotelsLede}</p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <Link
            key={hotel.slug}
            href={`/${locale}/hotels/${hotel.slug}/`}
            className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              {hotel.primary_image && (
                <Image
                  src={hotel.primary_image}
                  alt={hotel.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                {prettifyCategory(hotel.category)} · {"★".repeat(hotel.stars)}
              </p>
              <h2 className="mt-3 text-xl font-black uppercase leading-tight tracking-tighter text-slate-900">
                {hotel.name}
              </h2>
              <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">{hotel.location}</p>
              {hotel.description && (
                <RichText
                  html={hotel.description}
                  className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

> `line-clamp-3` di atas HTML multi-paragraf hanya memotong paragraf pertama secara visual — cukup untuk kartu. Bila terlihat janggal saat review, ganti ke ekstraksi teks polos seperti `excerptFromHtml` di `TourCard`.

- [ ] **Step 2: `app/[locale]/hotels/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import RichText from "@/components/RichText";
import JsonLd from "@/components/JsonLd";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { dict } from "@/lib/dictionary";
import { HREFLANG, SITE_URL, type Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getHotel, getHotels } from "@/lib/api";
import { prettifyCategory } from "@/lib/format";

export async function generateStaticParams() {
  const locales = await localesWith("hotels");
  const lists = await Promise.all(locales.map((locale) => getHotels(locale)));
  return locales.flatMap((locale, i) => lists[i].map((h) => ({ locale, slug: h.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const hotel = await getHotel(params.locale, params.slug);
  if (!hotel) return {};
  const description = (hotel.description ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  const locales = await localesWith("hotels");
  const present = await Promise.all(locales.map((l) => getHotel(l, params.slug)));
  const languages: Record<string, string> = {};
  locales.forEach((l, i) => {
    if (present[i]) languages[HREFLANG[l]] = `${SITE_URL}/${l}/hotels/${params.slug}/`;
  });
  return {
    title: hotel.name,
    description,
    alternates: { canonical: `${SITE_URL}/${params.locale}/hotels/${params.slug}/`, languages },
    openGraph: { title: hotel.name, images: hotel.primary_image ? [hotel.primary_image] : [], type: "website" },
  };
}

export default async function HotelDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const hotel = await getHotel(params.locale, params.slug);
  if (!hotel) {
    throw new Error(`Inkonsistensi data: /hotels/${params.slug} 404 di ${params.locale} padahal ada di daftar`);
  }

  const t = dict(params.locale);
  const locales = await localesWith("hotels");
  const present = await Promise.all(locales.map((l) => getHotel(l, params.slug)));
  const availableIn = locales.filter((_, i) => present[i]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: hotel.name,
    address: hotel.location,
    starRating: { "@type": "Rating", ratingValue: hotel.stars },
    ...(hotel.primary_image ? { image: hotel.primary_image } : {}),
  };

  return (
    <article>
      <JsonLd data={jsonLd} />

      <header className="relative flex min-h-[52vh] items-end overflow-hidden bg-slate-900">
        {hotel.primary_image && (
          <Image src={hotel.primary_image} alt={hotel.name} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10">
          <span className="rounded-xl bg-red-600 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {prettifyCategory(hotel.category)} · {"★".repeat(hotel.stars)}
          </span>
          <h1 className="mt-6 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-5xl">
            {hotel.name}
          </h1>
          <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-white/70">{hotel.location}</p>
          <div className="mt-6">
            <LanguageSwitcher current={params.locale} availableIn={availableIn} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-8">
          {hotel.description && (
            <RichText html={hotel.description} className="text-lg font-medium leading-[1.8] text-slate-600" />
          )}
          {hotel.images.length > 0 && (
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {hotel.images.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <Image src={src} alt={hotel.name} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          {hotel.facilities.length > 0 && (
            <div className="sticky top-28 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-900/5">
              <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-slate-900">{t.facilities}</h2>
              <ul className="space-y-2">
                {hotel.facilities.map((f) => (
                  <li key={f} className="text-sm font-medium leading-relaxed text-slate-600">{f}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Dev smoke**

Run:
```bash
npm run dev
curl -s http://localhost:3000/en/hotels/ | grep -c 'hotels/'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/fr/hotels/   # dev: 404 (route tak dibangun)
```
Expected: EN daftar memuat; FR hotels → 404. Hentikan dev server.

- [ ] **Step 4: Commit**

```bash
git add "app/[locale]/hotels/page.tsx" "app/[locale]/hotels/[slug]/page.tsx"
git commit -m "feat(hotels): daftar + detail dari API, facilities array, kategori dipercantik, JSON-LD"
```

---

## Task 11: Gallery & Blog

**Files:**
- Modify: `app/[locale]/gallery/page.tsx`, `app/[locale]/blog/page.tsx`, `app/[locale]/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getGallery`, `getBlogPosts`, `getBlogPost` (Task 2); `localesWith` (Task 3); `dict` (Task 5); `RichText`, `JsonLd`, `LanguageSwitcher` (Task 6); `HREFLANG`, `SITE_URL` (Task 3).
- Produces: `/[locale]/gallery/`, `/[locale]/blog/`, `/[locale]/blog/[slug]/` untuk `localesWith("gallery")` / `localesWith("blog")`.

- [ ] **Step 1: `app/[locale]/gallery/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getGallery } from "@/lib/api";

export async function generateStaticParams() {
  return (await localesWith("gallery")).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: dict(params.locale).galleryHeading };
}

export default async function GalleryPage({ params }: { params: { locale: Locale } }) {
  const t = dict(params.locale);
  // Entri video (image_path null) disaring — halaman ini hanya merender gambar.
  const items = (await getGallery(params.locale)).filter((i) => i.image_path);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="mb-12 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{t.galleryHeading}</h1>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure key={item.id} className="group overflow-hidden rounded-[1.5rem] bg-slate-100">
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image_path as string}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {item.title && (
              <figcaption className="bg-white px-5 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500 line-clamp-2">
                {item.title}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `app/[locale]/blog/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  return (await localesWith("blog")).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: dict(params.locale).blogHeading };
}

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const posts = await getBlogPosts(locale);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
      <div className="mb-12 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{t.blogHeading}</h1>
      </div>

      <div className="space-y-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}/`}
            className="group grid gap-7 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl sm:grid-cols-[16rem_1fr]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-slate-100">
              {post.featured_image && (
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 640px) 16rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                {[post.category?.name, post.published_at].filter(Boolean).join(" · ")}
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tighter text-slate-900">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500 line-clamp-3">{post.excerpt}</p>
              )}
              <span className="mt-5 text-[11px] font-black uppercase tracking-widest text-red-600">{t.readMore} →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `app/[locale]/blog/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import RichText from "@/components/RichText";
import JsonLd from "@/components/JsonLd";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { HREFLANG, SITE_URL, type Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getBlogPost, getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  const locales = await localesWith("blog");
  const lists = await Promise.all(locales.map((locale) => getBlogPosts(locale)));
  return locales.flatMap((locale, i) => lists[i].map((p) => ({ locale, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.locale, params.slug);
  if (!post) return {};
  const locales = await localesWith("blog");
  const present = await Promise.all(locales.map((l) => getBlogPost(l, params.slug)));
  const languages: Record<string, string> = {};
  locales.forEach((l, i) => {
    if (present[i]) languages[HREFLANG[l]] = `${SITE_URL}/${l}/blog/${params.slug}/`;
  });
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `${SITE_URL}/${params.locale}/blog/${params.slug}/`, languages },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.featured_image ? [post.featured_image] : [],
      type: "article",
      ...(post.published_at ? { publishedTime: post.published_at } : {}),
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const post = await getBlogPost(params.locale, params.slug);
  if (!post) {
    throw new Error(`Inkonsistensi data: /blog/${params.slug} 404 di ${params.locale} padahal ada di daftar`);
  }

  const locales = await localesWith("blog");
  const present = await Promise.all(locales.map((l) => getBlogPost(l, params.slug)));
  const availableIn = locales.filter((_, i) => present[i]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.featured_image ? { image: post.featured_image } : {}),
    ...(post.published_at ? { datePublished: post.published_at } : {}),
    author: { "@type": "Organization", name: "Welcome Manado" },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <JsonLd data={jsonLd} />

      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
        {[post.category?.name, post.published_at].filter(Boolean).join(" · ")}
      </p>
      <h1 className="mt-5 text-3xl font-black uppercase leading-[1.05] tracking-tighter text-slate-900 md:text-5xl">
        {post.title}
      </h1>
      <div className="mt-6">
        <LanguageSwitcher current={params.locale} availableIn={availableIn} />
      </div>

      {post.featured_image && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
          <Image src={post.featured_image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        </div>
      )}

      <RichText html={post.content} className="mt-12 text-lg font-medium leading-[1.85] text-slate-600" />
    </article>
  );
}
```

- [ ] **Step 4: Dev smoke**

Run:
```bash
npm run dev
curl -s http://localhost:3000/en/gallery/ | grep -c 'figure'
curl -s http://localhost:3000/ko/blog/ | grep -c 'blog/'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/de/blog/   # 404
```
Expected: galeri EN punya `<figure>`; blog KO memuat; blog DE → 404. Hentikan dev server.

- [ ] **Step 5: Commit**

```bash
git add "app/[locale]/gallery/page.tsx" "app/[locale]/blog/page.tsx" "app/[locale]/blog/[slug]/page.tsx"
git commit -m "feat(gallery,blog): dari API, saring entri tanpa gambar, render content HTML, JSON-LD"
```

---

## Task 12: About & Contact

**Files:**
- Modify: `app/[locale]/about/page.tsx`, `app/[locale]/contact/page.tsx`

**Interfaces:**
- Consumes: `getAbout` (Task 2); `localesWith`, `publishedLocales` (Task 3); `dict` (Task 5); `RichText` (Task 6); `chatHref`, `chatLabelKey` (Task 4).
- Produces: `/[locale]/about/` untuk `localesWith("about")`; `/[locale]/contact/` untuk semua published locale (tombol chat, tanpa form).

- [ ] **Step 1: `app/[locale]/about/page.tsx`**

Story API berisi FRASA pemasaran (bukan angka statistik) + `since_text`/`pioneering_text`, paragraf HTML. Tim selalu kosong → bagian tim disembunyikan.

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import RichText from "@/components/RichText";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { localesWith } from "@/lib/availability";
import { getAbout } from "@/lib/api";

export async function generateStaticParams() {
  return (await localesWith("about")).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const { story } = await getAbout(params.locale);
  const description = story
    ? story.paragraph_one.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
    : undefined;
  return { title: dict(params.locale).aboutHeading, description };
}

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);
  const { story, team } = await getAbout(locale);

  // localesWith("about") menjamin story != null di sini, tapi tetap dijaga.
  if (!story) {
    throw new Error(`about.story null di ${locale} padahal locale ini lolos gerbang about`);
  }

  const highlights = [
    { value: story.experience_value, label: story.experience_label },
    { value: story.travelers_value, label: story.travelers_label },
  ].filter((h) => h.value);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
      <section>
        <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-slate-900 md:text-6xl">
          {story.title_lead} <span className="text-red-600">{story.title_accent}</span>
        </h1>

        {(story.since_text || story.pioneering_text) && (
          <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
            {[story.since_text, story.pioneering_text].filter(Boolean).join(" · ")}
          </p>
        )}

        <div className="mt-10 space-y-6">
          <RichText html={story.paragraph_one} className="text-lg font-medium leading-[1.85] text-slate-600" />
          <RichText html={story.paragraph_two} className="text-lg font-medium leading-[1.85] text-slate-600" />
        </div>

        {story.image_url && (
          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
            <Image src={story.image_url} alt="" fill sizes="100vw" className="object-cover" />
          </div>
        )}

        {highlights.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {highlights.map((h) => (
              <div key={h.label} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-8">
                <p className="text-xl font-black uppercase tracking-tight text-slate-900">{h.value}</p>
                <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-slate-400">{h.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {team.length > 0 && (
        <section className="mt-24">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-1 w-12 rounded-full bg-red-600" />
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">{t.teamHeading}</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full bg-slate-100">
                  {member.image_url && (
                    <Image src={member.image_url} alt={member.name} fill sizes="10rem" className="object-cover" />
                  )}
                </div>
                <p className="mt-5 text-base font-black uppercase tracking-tight text-slate-900">{member.name}</p>
                {member.position && (
                  <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-red-600">{member.position}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 2: `app/[locale]/contact/page.tsx` — hapus form, tombol chat**

```tsx
import type { Metadata } from "next";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { publishedLocales } from "@/lib/availability";
import { chatHref, chatLabelKey } from "@/lib/contact";

export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = dict(params.locale);
  return { title: t.contactHeading, description: t.contactLede };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const t = dict(params.locale);
  const label = t[chatLabelKey(params.locale)];

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{t.contactHeading}</h1>
      </div>
      <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-500">{t.contactLede}</p>

      <a
        href={chatHref(params.locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/20 transition-transform hover:scale-105"
      >
        {label}
      </a>
    </section>
  );
}
```

- [ ] **Step 3: Dev smoke**

Run:
```bash
npm run dev
curl -s http://localhost:3000/en/about/ | grep -o 'rich-text' | head -1
curl -s http://localhost:3000/en/contact/ | grep -o 'wa.me' | head -1
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/fr/about/   # 404
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/fr/contact/ # 200
```
Expected: about EN punya `rich-text`; contact EN punya `wa.me`; about FR → 404; contact FR → 200. Hentikan dev server.

- [ ] **Step 4: Type-check penuh — sekarang harus BERSIH**

Run: `npx tsc --noEmit`
Expected: 0 error. Semua konsumen `PUBLISHED_LOCALES`/`isPublished`/`sample-*` sudah diperbarui.

- [ ] **Step 5: Commit**

```bash
git add "app/[locale]/about/page.tsx" "app/[locale]/contact/page.tsx"
git commit -m "feat(about,contact): dari API, susun ulang story, tim disembunyikan bila kosong, kontak jadi chat"
```

---

## Task 13: `app/sitemap.ts` & `app/robots.ts`

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

**Interfaces:**
- Consumes: `getAvailability`, `publishedLocales`, `localesWith` (Task 3); `getTours`, `getHotels`, `getBlogPosts` (Task 1–2); `SITE_URL`, `HREFLANG` (Task 3).
- Produces: `sitemap.xml` & `robots.txt` di `out/` (didukung Next 14.2 dengan `output: "export"`).

- [ ] **Step 1: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/locales";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { HREFLANG, SITE_URL, type Locale } from "@/lib/locales";
import { localesWith, publishedLocales } from "@/lib/availability";
import { getBlogPosts, getHotels, getTours } from "@/lib/api";

export const dynamic = "force-static";

/** Satu entri per (locale × halaman) yang BENAR-BENAR dibangun — dipetik dari
 *  Availability yang sama, jadi sitemap tidak pernah menunjuk halaman yang di-skip. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const published = await publishedLocales();
  const hotelLocales = await localesWith("hotels");
  const galleryLocales = await localesWith("gallery");
  const blogLocales = await localesWith("blog");
  const aboutLocales = await localesWith("about");

  const entries: MetadataRoute.Sitemap = [];
  const push = (locales: Locale[], path: (l: Locale) => string) => {
    for (const l of locales) {
      const url = `${SITE_URL}/${l}/${path(l)}`.replace(/\/+$/, "/");
      const languages: Record<string, string> = {};
      for (const alt of locales) languages[HREFLANG[alt]] = `${SITE_URL}/${alt}/${path(alt)}`.replace(/\/+$/, "/");
      entries.push({ url, alternates: { languages } });
    }
  };

  // Halaman statis
  push(published, () => "");
  push(published, () => "tours/");
  push(published, () => "contact/");
  push(hotelLocales, () => "hotels/");
  push(galleryLocales, () => "gallery/");
  push(blogLocales, () => "blog/");
  push(aboutLocales, () => "about/");

  // Detail — hreflang hanya untuk locale yang punya slug itu
  const tourLists = await Promise.all(published.map((l) => getTours(l)));
  const tourSlugLocales = new Map<string, Locale[]>();
  published.forEach((l, i) => {
    for (const t of tourLists[i]) tourSlugLocales.set(t.slug, [...(tourSlugLocales.get(t.slug) ?? []), l]);
  });
  for (const [slug, locales] of tourSlugLocales) push(locales, () => `tours/${slug}/`);

  const hotelLists = await Promise.all(hotelLocales.map((l) => getHotels(l)));
  const hotelSlugLocales = new Map<string, Locale[]>();
  hotelLocales.forEach((l, i) => {
    for (const h of hotelLists[i]) hotelSlugLocales.set(h.slug, [...(hotelSlugLocales.get(h.slug) ?? []), l]);
  });
  for (const [slug, locales] of hotelSlugLocales) push(locales, () => `hotels/${slug}/`);

  const blogLists = await Promise.all(blogLocales.map((l) => getBlogPosts(l)));
  const blogSlugLocales = new Map<string, Locale[]>();
  blogLocales.forEach((l, i) => {
    for (const p of blogLists[i]) blogSlugLocales.set(p.slug, [...(blogSlugLocales.get(p.slug) ?? []), l]);
  });
  for (const [slug, locales] of blogSlugLocales) push(locales, () => `blog/${slug}/`);

  return entries;
}
```

- [ ] **Step 3: Build produksi + verifikasi sitemap**

Run:
```bash
npm run build
test -f out/sitemap.xml && echo "sitemap OK"
test -f out/robots.txt && echo "robots OK"
grep -c '<loc>' out/sitemap.xml
grep -o 'manado.tours/fr/hotels/' out/sitemap.xml | head -1   # HARUS kosong (fr tak punya hotels)
```
Expected: `sitemap OK`, `robots OK`, jumlah `<loc>` besar (ratusan), tidak ada entri `/fr/hotels/`.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat(seo): sitemap + robots dipetik dari Availability yang sama"
```

---

## Task 14: Build produksi penuh, verifikasi `out/`, berkas deploy

**Files:**
- Modify: `deploy/nginx-manado-tours.conf`, `deploy/README.md`, `README.md`

**Interfaces:**
- Consumes: seluruh hasil Task 1–13.
- Produces: `out/` lengkap & terverifikasi; berkas deploy siap dipakai untuk mengganti halaman coming-soon.

- [ ] **Step 1: Build bersih dari nol**

Run:
```bash
rm -rf .next out
npm run build
```
Expected: `prebuild` (check-api) lolos, lalu build sukses tanpa error. Tidak ada peringatan "Image with src ... hostname not configured".

- [ ] **Step 2: Verifikasi struktur `out/`**

Run:
```bash
# 8 bahasa punya beranda + tours + contact
for l in en ko zh fr de it es nl; do test -f "out/$l/index.html" && test -f "out/$l/tours/index.html" && test -f "out/$l/contact/index.html" && echo "$l core OK"; done
# hanya en/ko/zh punya hotels/gallery/blog/about
for l in en ko zh; do test -d "out/$l/hotels" && test -d "out/$l/gallery" && test -d "out/$l/blog" && test -d "out/$l/about" && echo "$l extra OK"; done
# fr/de/it/es/nl TIDAK punya hotels/gallery/blog/about
for l in fr de it es nl; do test ! -e "out/$l/hotels" && test ! -e "out/$l/about" && echo "$l correctly skipped"; done
# tiap paket tour ada di 8 bahasa
ls out/en/tours | wc -l && ls out/fr/tours | wc -l
```
Expected: semua baris "OK"/"correctly skipped" muncul; jumlah folder tour sama di `en` dan `fr` (34 + halaman index).

- [ ] **Step 3: Verifikasi HTML sungguhan, bukan tag mentah**

Run:
```bash
npx --yes serve out -l 3007 &
sleep 2
SLUG=$(ls out/en/tours | grep -v index.html | head -1)
curl -s "http://localhost:3007/en/tours/$SLUG/" | grep -o 'class="rich-text' | head -1     # ada
curl -s "http://localhost:3007/en/tours/$SLUG/" | grep -o '&lt;p&gt;' | head -1             # HARUS kosong (tak ada tag ter-escape)
curl -s "http://localhost:3007/en/tours/$SLUG/" | grep -o 'application/ld+json' | head -1   # ada
curl -s "http://localhost:3007/fr/tours/$SLUG/" | grep -o 'wa.me/6282173738822'  | head -1  # ada
curl -I "http://localhost:3007/en/tours/" 2>&1 | head -1                                     # 200
kill %1
```
Expected: `rich-text` & `application/ld+json` & `wa.me` ada; `&lt;p&gt;` TIDAK ada; header `200`.

- [ ] **Step 4: Ganti `deploy/nginx-manado-tours.conf`**

```nginx
# =============================================================================
# manado.tours — SITUS SUNGGUHAN (Next.js static export)
# =============================================================================
# Static export menghasilkan `en/tours/index.html`, bukan satu index.html seperti
# SPA — jadi butuh rantai try_files di bawah. Root `/` dialihkan 302 ke locale
# sesuai Accept-Language (anjuran Google: 302, bukan 301).
#
# Pasang di: /etc/nginx/sites-available/manado.tours
# =============================================================================

map $http_accept_language $intl_lang {
    default   en;
    ~*^ko     ko;
    ~*^zh     zh;
    ~*^fr     fr;
    ~*^de     de;
    ~*^it     it;
    ~*^es     es;
    ~*^nl     nl;
}

server {
    listen 80;
    listen [::]:80;
    server_name manado.tours www.manado.tours;

    # Certbot menambahkan blok pengalihan HTTPS sendiri di sini.
    root /var/www/manado.tours;
    index index.html;

    location = / {
        return 302 /$intl_lang/;
    }

    location / {
        try_files $uri $uri/ $uri.html /404.html;
    }

    location = /robots.txt { try_files $uri =404; access_log off; }
    location = /sitemap.xml { try_files $uri =404; access_log off; }

    location ~* \.(png|jpg|jpeg|svg|webp|ico|woff2?|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* \.html$ {
        add_header Cache-Control "no-cache, must-revalidate";
    }

    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml application/xml;
    gzip_min_length 512;
}
```

- [ ] **Step 5: Perbarui `deploy/README.md`**

Ganti bagian pembuka + "Saat situs sungguhan siap terbit" menjadi prosedur utama:

```markdown
# Deploy manado.tours

Situs statis hasil `npm run build` (folder `out/`), dilayani nginx tanpa Node.js.

## 1. Build di mesin developer

```bash
npm ci
npm run build          # menjalankan check-api dulu, lalu next build
```

`out/` berisi 8 bahasa. Verifikasi lokal sebelum kirim:

```bash
npx serve out -l 3007
# buka /en/, /fr/, /ko/ — cek gambar termuat, tak ada halaman kosong,
# deskripsi tampil terformat (bukan tag mentah)
```

## 2. Kirim ke VPS

```bash
rsync -avz --delete out/ user@VPS:/var/www/manado.tours/
```

`--delete` membuang berkas lama (mis. halaman coming-soon) yang tidak ada lagi
di build baru.

## 3. nginx (sekali saja, saat pertama mengganti coming-soon)

```bash
sudo cp deploy/nginx-manado-tours.conf /etc/nginx/sites-available/manado.tours
sudo nginx -t && sudo systemctl reload nginx
```

`map $http_accept_language` ada di level http — kalau nginx menolak karena
`map` di dalam server block, pindahkan blok `map { … }` ke `/etc/nginx/nginx.conf`
bagian `http { }`.

## 4. Verifikasi

```bash
curl -I https://manado.tours/                 # 302 → /en/ (atau bahasa Accept-Language)
curl -I https://manado.tours/en/tours/        # 200
curl -I https://manado.tours/fr/tours/        # 200
curl -I https://manado.tours/fr/hotels/       # 404 — memang tak dibangun
curl -s https://manado.tours/sitemap.xml | head -c 200
```

## Rilis berikutnya

Ulangi langkah 1–2. nginx tak perlu disentuh lagi kecuali menambah locale baru
ke blok `map`.

## Daftar di Google Search Console

Kirim `https://manado.tours/sitemap.xml` setelah deploy pertama.
```

Simpan `deploy/AAPANEL.md` apa adanya (masih relevan sebagai catatan panel).

- [ ] **Step 6: Perbarui `README.md`** — bagian build sebut `out/` 8 bahasa & tautan ke `deploy/README.md`.

- [ ] **Step 7: Commit**

```bash
git add deploy/nginx-manado-tours.conf deploy/README.md README.md
git commit -m "docs(deploy): nginx try_files + redirect bahasa, prosedur rsync out/"
```

- [ ] **Step 8: Laporan akhir** — jalankan `npm run build` sekali lagi bersih, catat: jumlah halaman `out/`, hasil `curl -I` untuk 3 locale, hasil validasi 1 JSON-LD via Google Rich Results Test (manual, setelah deploy). Serahkan ke pengguna untuk keputusan deploy.

---

## Self-Review

**1. Spec coverage**

| Bagian spec | Task |
|---|---|
| Latar #1 (bentuk data HTML) | Task 1–2 tipe, Task 6 `RichText`, Task 9–12 render |
| Latar #2 (ketersediaan tak rata) | Task 3 `availability.ts`, Task 10–12 gerbang `localesWith` |
| Latar #3 (inquiry buta) | Task 4 `lib/contact.ts`, Task 12 contact tanpa form |
| Latar #4 (`dictionary.ts` kosong 5 bahasa) | Task 5 |
| Keputusan: ketersediaan per (jenis × bahasa) | Task 3 |
| Keputusan: form → chat langsung | Task 4 + Task 12 |
| Keputusan: situs langsung ganti coming-soon | Task 14 (deploy) |
| Keputusan: build statis + rsync | Task 14 |
| Arsitektur & alur data | Task 1 (`apiGet`), semua fetch build-time |
| `lib/api.ts` semua fungsi | Task 1–2. **Kecuali `getTravelInfo`** — lihat catatan di bawah |
| Tipe data | Task 1–2 (disesuaikan ke respons live: `base_price` string, `price_usd` null, dsb.) |
| `getAvailability()` | Task 3 |
| Lengkapi `lib/dictionary.ts` | Task 5 |
| Perbaikan render HTML, buang `Bullets` | Task 6 `RichText`, Task 9 |
| Routing & `generateStaticParams` | Task 7–13 (semua `async`, `dynamicParams=false`) |
| SEO sitemap/hreflang/JSON-LD | Task 7 (TravelAgency), 9 (TouristTrip), 10 (LodgingBusiness), 11 (BlogPosting), 13 (sitemap/robots) |
| `next.config.js` images | Task 4 |
| Kanal kontak (WA + fallback Kakao/WeChat) | Task 4 `lib/contact.ts` |
| Build & deploy (nginx, rsync) | Task 14 |
| Penanganan error build-time | Task 1 (`apiGet` throw), Task 9–12 (throw pada inkonsistensi daftar/detail) |
| Rencana pengujian | Task 8–14 dev smoke + Task 14 build/serve/curl |

**Penyimpangan sadar dari spec (diverifikasi ke API production, bukan asumsi):**
- **Harga tour**: spec §SEO mengasumsikan `price_usd` ada dan JSON-LD `Offer` memakainya. Realitas: `price_usd` selalu `null`, `base_price` string `"0.00"`, `prices: []` untuk semua paket Manado. Plan menghapus tampilan harga dan `Offer` — mengikuti pola `client_wm/src/views/wisatalokal/TourDetail.vue` yang juga "hubungi untuk harga". Bila pemilik nanti mengisi harga USD, kartu & JSON-LD perlu ditambah lagi.
- **`getTravelInfo` / halaman travel-info**: spec §`lib/api.ts` mencantumkan `getTravelInfo`, tapi §routing, §nav, dan §`getAvailability` (lima jenis: tours/hotels/gallery/blog/about) tidak menyertakannya, dan kerangka tidak punya halaman travel-info. Plan TIDAK mengimplementasikan travel-info — ditandai untuk keputusan terpisah bila halaman "info perjalanan" mau dibuat. `/api/intl/travel-info` punya 39 item (en) yang belum dipakai.
- **About `story`**: field API adalah frasa pemasaran (`experience_value: "Safety and Trust"`), bukan angka statistik seperti diasumsikan kerangka (`"12+"` / `"9,000+"`), plus ada `since_text` & `pioneering_text`. Task 12 merender ulang sebagai kartu highlight + baris eyebrow, bukan "stat tile" angka besar. `team` selalu `[]` → bagian tim disembunyikan.
- **Galeri**: sebagian item `image_path: null` (entri video). Task 3 & 11 menyaringnya; ketersediaan galeri = ada minimal 1 item bergambar.

**2. Placeholder scan** — tidak ada "TBD"/"handle edge cases"/"similar to Task N". Semua langkah kode berisi kode utuh. Terjemahan 5 bahasa Eropa ditulis lengkap di Task 5 (bukan "terjemahkan string"). Perintah verifikasi konkret & bisa dijalankan.

**3. Type consistency**
- `TourList` / `TourDetail` (Task 1) dipakai konsisten di `TourCard` (Task 6), tours pages (Task 9), `getHome().featured_tours` (Task 2/8).
- `getTour`/`getHotel`/`getBlogPost` mengembalikan `... | null` (Task 1–2) — halaman detail `throw` bila null untuk locale sendiri, `generateMetadata` & `LanguageSwitcher` menoleransi null. Konsisten di Task 9/10/11.
- `Section` union (`"tours"|"hotels"|"gallery"|"blog"|"about"`) sama di `availability.ts`, `Header` (Task 6), sitemap (Task 13).
- `publishedLocales()` / `localesWith()` selalu `Promise<Locale[]>`; setiap `generateStaticParams` yang memakainya sudah `async`.
- `dict()` mengembalikan `Dict` baru (37 kunci) — `chatLabelKey()` (Task 4) mengembalikan `"askOnWhatsapp"|"askOnKakao"|"askOnWechat"` yang ketiganya ada di `Dict`. Dipakai `t[chatLabelKey(locale)]` di Task 9 & 12.
- `isLocale` (Task 3) menggantikan `isPublished` lama di `layout.tsx` (Task 7).
- `RichText` prop `{ html: string; className?: string }` — semua pemanggil meneruskan `string` non-null (dijaga `&&` di setiap situs pemakaian).

**4. Spec requirement tanpa task** — tidak ada yang tertinggal selain `getTravelInfo` yang sudah dijelaskan sebagai penyimpangan sadar.

---

## Execution Handoff

Plan lengkap & tersimpan di `docs/superpowers/plans/2026-08-28-sambungkan-api-intl.md`. Prasyarat sebelum eksekusi: branch `feat/sambungkan-api-intl` dari `dev`, dan `dev` sudah menerima merge `feat/kerangka-situs` + `feat/terjemahan-paket-manado` (spec §Alur git).
