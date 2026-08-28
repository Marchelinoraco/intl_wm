# Sambungkan intl_wm ke /api/intl/* — Spec

## Ringkasan

`intl_wm` (Next.js 14, static export) saat ini berjalan di atas data karangan
(`lib/sample-*.ts`) pada branch `feat/kerangka-situs`. Backend `/api/intl/*`
di `api_wm` sudah lengkap dan live di production: 34 paket tour × 8 bahasa
(en, ko, zh, fr, de, it, es, nl), semuanya lolos gerbang terbit paling ketat.
Dokumen ini merancang penyambungan frontend ke backend itu, penggantian
render teks-polos menjadi HTML sungguhan, SEO (sitemap/hreflang/structured
data), dan proses build-deploy ke VPS — menggantikan halaman coming-soon
yang saat ini melayani manado.tours.

## Latar belakang yang membentuk desain ini

Tiga temuan dari eksplorasi kode menentukan bentuk keputusan di bawah,
dicatat di sini supaya alasannya tidak hilang:

1. **Bentuk data API berbeda dari asumsi kerangka.** `description`,
   `inclusions`, `exclusions`, itinerary `description`, `hotel.description`,
   `blog.content` semuanya HTML sungguhan (hasil kerja terjemahan
   sebelumnya) — bukan teks polos berpisah `\n` seperti diasumsikan
   `lib/sample-data.ts`. `hotel.facilities` adalah array JSON (cast Eloquent
   `'facilities' => 'array'`), bukan string `\n`-terpisah.

2. **Ketersediaan terjemahan tidak rata antar jenis konten.** Pekerjaan
   terjemahan yang baru selesai *hanya* menggarap `tour_translations` +
   `itinerary_translations` untuk kedelapan bahasa. Tabel terjemahan
   lain (`hotel_translations`, `gallery_item_translations`,
   `travel_info_item_translations`, `blog_post_translations`,
   `about_story_section_translations`) adalah peninggalan Plan 1 dan hanya
   terisi untuk en/ko/zh. Diverifikasi langsung ke API production
   (2026-08-28): `fr`/`de`/`es` mengembalikan `0` item untuk
   hotels/gallery/blog/travel-info, dan `story: null` untuk about. `team`
   kosong di semua bahasa termasuk en — itu bukan celah bahasa, tabel
   `team_members` production memang belum berisi baris aktif.

3. **Endpoint inquiry buta.** `POST /api/intl/inquiries` menyimpan ke tabel
   `inquiries` tanpa notifikasi (email/WhatsApp) dan tanpa panel admin untuk
   membacanya. Menyambungkan form kontak ke endpoint ini sekarang berarti
   pesan turis asing masuk ke tempat yang tidak dipantau siapa pun.

## Keputusan terkunci (disetujui saat brainstorming, jangan ditawar ulang tanpa alasan baru)

- **Ketersediaan dihitung per (jenis konten × bahasa), bukan satu status
  global per bahasa.** Tours menentukan bahasa mana yang situsnya hidup
  sama sekali (kedelapannya, karena itu produk inti manado.tours). Menu
  Hotels/Gallery/Blog/About hanya muncul di bahasa yang jenis konten itu
  benar-benar berisi — saat ini en/ko/zh. Begitu terjemahan jenis konten
  lain diisi untuk bahasa baru, menu itu muncul sendiri tanpa kode baru,
  karena dibaca dari API saat build, bukan ditulis manual.
- **Form kontak beralih ke chat langsung** (WhatsApp/KakaoTalk/WeChat
  sesuai bahasa), bukan `POST /api/intl/inquiries`. Alasan: tidak ada
  pesan yang hilang karena langsung ke perangkat staf, tidak perlu
  menunggu fitur notifikasi+panel admin inquiry dibangun dulu.
- **Situs sungguhan langsung mengganti coming-soon** begitu build lolos
  pengujian — tidak ada tahap staging tersembunyi. Backend sudah lengkap,
  tidak ada alasan menahan.
- **Build statis di sisi pengembang, dikirim sebagai folder `out/` ke
  VPS via rsync.** VPS tidak butuh Node.js sama sekali — pola yang sama
  seperti coming-soon sekarang (murni file statis via nginx).

## Arsitektur & alur data

```
npm run build (lokal / sesi ini)
  │
  ├─ generateStaticParams() setiap halaman memanggil lib/api.ts
  │     └─ lib/api.ts fetch() ke https://api.welcomemanado.my.id/api/intl/*
  │           (build-time saja — pengunjung situs TIDAK pernah memanggil API)
  │
  └─ next build --output export
        └─ out/{locale}/{halaman}/index.html  (statis, 8 bahasa × N halaman)
                │
                ▼ rsync
        VPS: /var/www/manado.tours  →  nginx menyajikan file statis
```

Tidak ada perubahan pada `api_wm`. Seluruh pekerjaan ada di `intl_wm`.

## Lapisan data — `lib/api.ts`

Modul baru menggantikan `lib/sample-data.ts`, `lib/sample-hotels.ts`,
`lib/sample-content.ts`. Satu fungsi per endpoint, dipanggil hanya dari
`generateStaticParams`/`generateMetadata`/komponen halaman (server
component, build-time):

```ts
const API = "https://api.welcomemanado.my.id/api/intl";

getLocales(): Promise<Locale[]>                          // GET /locales
getTours(locale): Promise<Tour[]>                         // GET /tours?locale=&per_page=100
getTour(locale, slug): Promise<Tour | null>                // GET /tours/{slug}?locale=
getHotels(locale): Promise<Hotel[]>                        // GET /hotels?locale=&per_page=100
getHotel(locale, slug): Promise<Hotel | null>               // GET /hotels/{slug}?locale=
getGallery(locale): Promise<GalleryItem[]>                 // GET /gallery?locale=&per_page=100
getBlogPosts(locale): Promise<BlogPost[]>                   // GET /blog?locale=&per_page=100
getBlogPost(locale, slug): Promise<BlogPost | null>          // GET /blog/{slug}?locale=
getTravelInfo(locale): Promise<TravelInfoItem[]>            // GET /travel-info?locale=&per_page=100
getHome(locale): Promise<HomePayload>                       // GET /home?locale=
getAbout(locale): Promise<AboutPayload>                      // GET /about?locale=
getAvailability(): Promise<Availability>                    // lihat di bawah
```

`?locale=` wajib di setiap panggilan — middleware `ValidateIntlLocale`
menolak dengan 422 kalau tidak ada atau bukan salah satu dari 8 kode yang
didukung. Tidak ada paginasi bertingkat: `per_page=100` sekali jalan cukup
untuk volume data saat ini (34 tour, jauh lebih sedikit untuk jenis
lain) — kalau nanti tumbuh melewati 100, `getTours` dkk. perlu loop
`page++` sampai `meta.last_page` tercapai, tapi itu bukan pekerjaan
sekarang.

### Tipe data (dicocokkan dengan Resource PHP sungguhan, bukan tebakan)

```ts
type Tour = {
  slug: string; title: string; description: string /* HTML */;
  location: string; base_price: number; price_usd: number | null;
  duration_days: number; duration_nights: number; duration_hours: number | null;
  is_featured: boolean; featured_badge: string | null; cover_image: string;
  category: { slug: string; name: string };
  // hanya di detail:
  inclusions?: string /* HTML <ul><li> */; exclusions?: string /* HTML */;
  itinerary_pdf_path?: string | null; images?: string[];
  prices?: { type: string; price: number; tax: number; insurance: number; visa_fee: number; tipping: number }[];
  itineraries?: { day_number: number; title: string; description: string /* HTML */;
                  hotel_info: string | null; meals_info: string | null }[];
};

type Hotel = {
  slug: string; name: string; location: string; category: string; stars: number;
  facilities: string[] /* array, BUKAN string */; description: string | null /* HTML */;
  primary_image: string; images: string[];
};

type BlogPost = {
  slug: string; title: string; excerpt: string | null; featured_image: string;
  author: string; published_at: string | null;
  category: { slug: string; name: string } | null;
  content?: string /* HTML, hanya di detail */;
};

type GalleryItem = { id: number; title: string; image_path: string; video_name: string | null };
type TravelInfoItem = { id: number; type: string; category_key: string; title: string; description: string /* HTML */; image_url: string };

type Availability = Record<Locale, {
  tours: boolean; hotels: boolean; gallery: boolean; blog: boolean; about: boolean;
}>;
```

### `getAvailability()`

Memanggil kelima jenis konten untuk setiap dari 8 locale sekali di awal
build (40 panggilan ringan, paralel), menyimpan `total > 0` (list) atau
`story !== null` (about) per sel. Hasilnya di-cache in-memory sepanjang
proses build (bukan disk) — dipakai oleh:

- `PUBLISHED_LOCALES` (situs-lebar) = locale dengan `tours: true` → saat
  ini kedelapannya.
- Item navigasi Hotels/Gallery/Blog/About di `Header` = tampil hanya untuk
  locale dengan `{jenis}: true` untuk jenis itu.
- `generateStaticParams` tiap section = hanya membangkitkan halaman untuk
  locale yang tersedia — pola yang sudah ada di kerangka untuk tour
  (`getTours(locale)` per locale), diperluas ke hotel/blog, dan sekarang
  digerbangi lagi oleh `Availability` di level bahasa.

## Perbaikan render — field HTML

Field yang sudah tabel di atas ditandai `/* HTML */` disisipkan lewat
`dangerouslySetInnerHTML={{ __html: ... }}`, bukan `{teks}` atau
`.split("\n")`. Komponen `Bullets` (di `tours/[slug]/page.tsx`) dibuang —
`inclusions`/`exclusions` sudah `<ul><li>` HTML sah, disisipkan langsung.
`hotel.facilities` (array) di-render `.map()` langsung, tanpa `.split()`.

Konten HTML ini berasal dari database milik sistem sendiri (bukan input
pengguna), jadi `dangerouslySetInnerHTML` di sini bukan celah XSS — sama
prinsipnya seperti `client_wm` merender `description` tour dari
`TourDetail.vue`.

## Routing & `generateStaticParams`

Pola yang sudah ada di kerangka untuk tour dipertahankan dan diperluas:

- `dynamicParams = false` di semua route dinamis — locale/slug di luar
  yang dibangkitkan `generateStaticParams` menghasilkan 404 build-time,
  bukan halaman kosong runtime (tidak relevan lagi untuk static export,
  tapi tetap eksplisit).
- `app/[locale]/tours/[slug]/page.tsx` — `PUBLISHED_LOCALES.flatMap(locale
  => getTours(locale).map(t => ({ locale, slug: t.slug })))` — sudah benar
  di kerangka, tidak berubah.
- `app/[locale]/hotels/[slug]/page.tsx`, `blog/[slug]/page.tsx` — pola
  sama, tapi hanya untuk locale dengan `availability[locale].hotels` /
  `.blog` bernilai true. Untuk locale lain, route ini tidak dibangkitkan
  sama sekali — bukan 404 buatan, tapi memang tidak ada di build.
- `app/[locale]/{hotels,gallery,blog,about}/page.tsx` — `generateStaticParams`
  hanya mengembalikan locale yang punya konten untuk jenis itu.

## SEO — sitemap, hreflang, structured data

- **`app/sitemap.ts`** (didukung Next 14 dengan `output: "export"`):
  satu entri per (locale × halaman) yang benar-benar dibangkitkan —
  dipetik dari `Availability` yang sama, sehingga sitemap tidak pernah
  menunjuk ke halaman yang di-skip. Setiap entri tour/hotel/blog
  menyertakan `alternates.languages` (grup hreflang) mengikuti locale mana
  saja yang punya item dengan slug yang sama.
- **`app/robots.ts`**: izinkan semua, tunjuk ke `sitemap.xml`.
- **`alternates.languages` per halaman** (pola sudah ada di
  `tours/[slug]/page.tsx`) diperluas konsisten ke hotel dan blog detail;
  ditambah `"x-default"` menunjuk locale `en`.
- **JSON-LD**:
  - `TravelAgency` (dipindah dari halaman coming-soon, sudah ada strukturnya)
    ditaruh di `app/[locale]/layout.tsx` — tampil di semua halaman.
  - `TouristTrip` + `Offer` (harga dari `price_usd`) di halaman detail tour.
  - `LodgingBusiness` di halaman detail hotel.
  - `BlogPosting` di halaman detail blog.

## Konfigurasi gambar

`next.config.js` → `images.remotePatterns`: buang
`images.unsplash.com` (sample, tidak lagi dipakai), tambah
`{ protocol: "https", hostname: "api.welcomemanado.my.id" }` — host
storage sungguhan, diverifikasi langsung dari respons API
(`https://api.welcomemanado.my.id/storage/tours/manado/...`).

## Kanal kontak

Halaman `contact/page.tsx` dan tombol CTA di `tours/[slug]/page.tsx`:
ganti `href="#"` (Kakao/WeChat) dan link WhatsApp statis dengan
tautan *click-to-chat* yang membawa pesan pra-isi berisi nama tour saat
datang dari halaman detail:

- WhatsApp (en/fr/de/it/es/nl): `https://wa.me/62821XXXXXXXX?text=${encodeURIComponent(pesan)}`
- KakaoTalk (ko) dan WeChat (zh): belum ada link/QR resmi di repo manapun.
  **Keputusan default: kedua bahasa ini memakai tautan WhatsApp yang sama
  untuk rilis pertama**, bukan diblokir menunggu link resmi. Begitu pemilik
  memberikan channel KakaoTalk/WeChat sungguhan, tinggal ganti nilai di
  satu tempat (`lib/contact.ts`) — tidak menyentuh halaman manapun.

Form kontak (name/email/pax/message) di kerangka saat ini **dihapus**,
diganti tombol chat langsung — form yang tidak submit ke mana pun secara
fungsional adalah dead end yang lebih buruk daripada tidak ada form sama
sekali.

## Build & deploy

1. `npm run build` (di sesi ini atau mesin developer) → `out/`.
2. Verifikasi lokal: `npm run preview` (sudah ada script-nya di
   `package.json`, `next build && serve out -l 3007`) — buka
   `localhost:3007/en/`, `/fr/`, dst., periksa tidak ada halaman kosong,
   gambar termuat, harga tampil benar.
3. `rsync -avz --delete out/ user@VPS:/var/www/manado.tours/` (pola yang
   sama seperti `deploy/README.md` Cara B untuk coming-soon).
4. Ganti `nginx-manado-tours.conf` dari blok `location /` satu-halaman ke
   versi yang sudah didraft di ekor berkas yang sama — `try_files $uri
   $uri/ $uri.html /404.html`, plus `map $http_accept_language` untuk
   pengalihan `/` (302, sesuai anjuran Google untuk pengalihan berbasis
   bahasa) ke locale yang tersedia.
5. `sudo nginx -t && sudo systemctl reload nginx`.

Setiap rilis berikutnya (konten baru, terjemahan tambahan): ulangi
langkah 1–3, tidak perlu sentuh nginx lagi kecuali menambah locale baru
ke `map`.

## Alur git

`feat/kerangka-situs` dan `feat/terjemahan-paket-manado` bercabang dari
commit inisialisasi yang sama (`4c480e6`), belum pernah bertemu, dan
`dev` masih di titik itu juga. Urutan wajib:

1. `branch-fitur` merge `feat/kerangka-situs` → `dev`.
2. `branch-fitur` merge `feat/terjemahan-paket-manado` → `dev`.
3. Branch baru dari `dev` untuk pekerjaan spec ini, mis.
   `feat/sambungkan-api-intl`.

## Penanganan error (build-time)

- Fetch gagal (API down, timeout) saat `next build` → build gagal keras,
  bukan fallback ke data lama atau halaman kosong. Situs statis tidak
  punya jalur "coba lagi nanti" — build yang gagal harus terlihat gagal.
- Respons 404 dari `/tours/{slug}` dkk. (harusnya tidak pernah terjadi
  karena slug diambil dari hasil `getTours()` sendiri) → dilempar sebagai
  error build, menandakan inkonsistensi data antara list dan detail yang
  harus diselidiki, bukan di-skip diam-diam.
- Locale di luar 8 yang didukung tidak pernah mencapai fungsi-fungsi ini
  karena `PUBLISHED_LOCALES`/`Availability` sudah membatasi di sumbernya.

## Di luar cakupan / celah yang diketahui (dicatat, tidak dikerjakan sekarang)

- Notifikasi + panel admin untuk `inquiries` — kalau nanti mau
  disambungkan ke form sungguhan, ini prasyaratnya.
- Link resmi KakaoTalk/WeChat channel — memakai fallback WhatsApp untuk
  rilis pertama (lihat bagian Kanal Kontak); diganti begitu pemilik
  memberikan channel sungguhan, tanpa menghalangi rilis bahasa lain.
- Terjemahan hotel/galeri/blog/about untuk fr/de/it/es/nl — pekerjaan
  data terjemahan terpisah, bukan pekerjaan frontend. Desain di atas
  sudah menyiapkan agar begitu terjemahan itu ada, halamannya muncul
  tanpa kode baru.
- Paginasi bertingkat (`page > 1`) — belum perlu di volume data saat ini.
- `duration_hours_min`/`duration_hours_max` (rentang jam untuk tour satu
  hari) — ada di skema tapi tidak dikembalikan `TourListResource`; tidak
  diminta halaman manapun di kerangka, tidak ditambahkan.

## Rencana pengujian

- Build lokal untuk kedelapan locale, periksa jumlah halaman yang
  dihasilkan sesuai `Availability` (mis. `/fr/hotels/` harus TIDAK ada
  di `out/`, bukan ada tapi kosong).
- `npm run preview`, buka setiap kombinasi locale × jenis halaman yang
  seharusnya ada, pastikan HTML dari database (description, itinerary,
  inclusions/exclusions, facilities) tampil terformat, bukan tag mentah.
- Validasi `sitemap.xml` — setiap URL di dalamnya benar-benar termuat
  200 saat diakses langsung dari `out/` via `serve`.
- Validasi JSON-LD dengan Google Rich Results Test (manual, setelah
  deploy) untuk satu halaman tour dan satu hotel.
- Setelah rsync ke VPS: `curl -I https://manado.tours/en/tours/` (dan
  ulangi untuk 2-3 locale lain) harus `200`, bukan halaman coming-soon.
