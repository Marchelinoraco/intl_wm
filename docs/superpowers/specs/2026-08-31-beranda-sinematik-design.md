# Beranda intl_wm sinematik + poles komponen bersama — Spec

## Ringkasan

Beranda `manado.tours` (`app/[locale]/page.tsx`) saat ini hanya dua bagian:
hero satu gambar + grid *featured tours*. Dokumen ini merancang perombakannya
menjadi *landing page* penuh yang meniru ritme beranda situs induk
`welcomemanado.com` (repo `client_wm`, `src/views/home/Home.vue`) —
hero sinematik dengan carousel + Ken Burns, bagian "kenapa bersama kami",
pita gelap sinematik, strip galeri, ulasan Google/TripAdvisor, teaser jurnal,
panel CTA — **semuanya dari data `/api/intl/*` yang sudah ada**, tanpa
perubahan backend. Fase kedua: mengangkat komponen bersama (`SectionHeading`
baru, `TourCard`, `Footer`) supaya seluruh situs ikut naik level.

Situs ini **live di production sejak 2026-08-29** (static export → VPS nginx,
deploy manual). Setiap keputusan di bawah menjaga: build statis tetap lolos,
dark mode via token tetap utuh, dan tiap bahasa hanya menampilkan bagian yang
datanya ada.

## Latar belakang yang membentuk desain ini

1. **Static export, tidak ada server.** `next.config.js` memakai
   `output: "export"` di production, `images.unoptimized: true`,
   `trailingSlash: true`. Tidak ada runtime — semua fetch `/api/intl/*`
   terjadi saat build (server component + `generateStaticParams`), di-memo
   per-URL di `lib/api.ts`. UI baru **tidak boleh** menambah fetch sisi
   klien. Komponen `"use client"` hanya untuk interaksi (carousel, scroller).

2. **Warna lewat token CSS-var untuk dark mode.** `globals.css` +
   `tailwind.config.ts` mendefinisikan `canvas / surface / surface-2 / line /
   ink / ink-2 / ink-3 / accent`. Kelas seperti `bg-slate-900` **tidak** ikut
   dark mode. UI baru wajib pakai token; bagian yang sengaja selalu gelap
   (pita sinematik) memakai warna literal + teks putih sebagai konstanta
   desain yang disadari.

3. **Ketersediaan per (jenis konten × bahasa).** `lib/availability.ts`
   menghitung `getAvailability()` sekali saat build (8 bahasa × 5 jenis).
   `publishedLocales()` = bahasa yang punya tour (kedelapannya). About /
   gallery / blog saat ini hanya terisi untuk `en`/`ko`/`zh`
   (`fr`/`de`/`it`/`es`/`nl` mengembalikan 0 item / `story: null`). Bagian
   beranda yang bersumber dari jenis itu **wajib bergerbang** — kalau tidak,
   halaman `fr` dll. menampilkan bagian kosong.

4. **`lib/dictionary.ts` adalah `DICTIONARY: Record<Locale, Dict>` statis,
   8 bahasa terisi penuh.** Menambah bagian berarti menambah ~20 kunci ke
   `Dict` dan mengisinya untuk kedelapan bahasa. Tidak ada mesin terjemah
   runtime — teks antarmuka hidup di repo ini.

5. **Tidak ada endpoint ulasan di `/api/intl/*`.** `lib/api.ts` tak punya
   `getReviews`/`getGoogleReviewStats`. `client_wm` menaruh ulasan asli
   Google + TripAdvisor **hardcoded** di `Home.vue` (reaktif, tak
   diterjemahkan — ditampilkan bahasa Inggris di semua locale). Untuk paritas
   yang disetujui, ulasan yang sama diport ke `lib/home-reviews.ts` sebagai
   data statis bertipe.

6. **`next.config.js` `images.remotePatterns` hanya
   `api.welcomemanado.my.id`.** Halaman lama sudah merender `<Image>` untuk
   cover tour, gambar blog, foto galeri, hero — jadi host itu mencukupi untuk
   semua data API. Bila ada bagian baru menuntut host lain, pola ditambah di
   `next.config.js` (dicek saat build).

## Keputusan terkunci (disetujui saat brainstorming — jangan ditawar ulang tanpa alasan baru)

- **Pendekatan A — paritas terarah.** Meniru *lineup* bagian
  `welcomemanado.com`, tiap bagian dipetakan ke data `/api/intl/*` yang sudah
  ada, aman dark mode, bergerbang per bahasa.
- **Ulasan diikutkan**, diport verbatim dari `client_wm` (5 TripAdvisor +
  2 Google), bahasa Inggris di semua locale — sama seperti situs induk.
- **Judul hero dipertahankan** (`t.heroTitle`, kalimat 3-frasa) — tidak
  dipecah, tidak diberi gradien paksa. Yang "sinematik" datang dari carousel
  full-bleed, Ken Burns, blob cahaya, pill kaca, petunjuk scroll, skala tipe.
- **Pita sinematik selalu gelap** — warna literal, bukan token.
- **Tanpa skrip pihak ketiga.** Tidak memuat widget TripAdvisor
  (`jscache.com`) atau apa pun dari Google — hanya kartu bergaya + tautan
  keluar ke listing.
- **Rating Google `4.9` / `39 ratings` di-hardcode** di `lib/home-reviews.ts`
  dengan komentar "perbarui manual" (nilai mengikuti yang live di
  `client_wm` per 2026-08-31).
- **Gerak mati saat `prefers-reduced-motion`.** `globals.css` sudah mematikan
  animation/transition global; `HeroCarousel` juga tidak auto-advance.
- **Fase 2 (komponen bersama) masuk cakupan**, dikerjakan setelah beranda
  stabil: `SectionHeading` baru dipakai ulang di `tours/` & `about/`,
  `TourCard` dipoles (props tetap), `Footer` diperluas. `Header` scroll-aware
  **opsional** — hanya bila sisa cakupan lancar.

## Arsitektur

### Struktur file

```
app/[locale]/page.tsx              — orkestrator: fetch semua data, hitung gerbang, susun bagian
components/SectionHeading.tsx      — BARU. pola badge + judul(+aksen) + lede + aksi kanan
components/home/Hero.tsx           — server. copy + CTA + <HeroCarousel>
components/home/HeroCarousel.tsx   — "use client". crossfade + Ken Burns, fallback gambar-1 diam
components/home/FeaturedTours.tsx  — server. SectionHeading + grid TourCard + tombol All Tours
components/home/WhyUs.tsx          — server. dari AboutStory: teks + kartu statistik + kartu aksen
components/home/CinematicBand.tsx  — server. pita gelap full-bleed + parallax + copy + 1 CTA
components/home/GalleryStrip.tsx   — server. bento 6 foto → /gallery/
components/home/Reviews.tsx        — server. kartu Google + TA + <ReviewScroller>
components/home/ReviewScroller.tsx — "use client". snap-scroll + panah + expand "Read more"
components/home/JournalTeaser.tsx  — server. 3 kartu blog → /blog/{slug}/
components/home/HomeCta.tsx        — server. panel aksen + Contact + WhatsApp
lib/home-reviews.ts               — BARU. tipe Review + array ulasan asli + konstanta rating
lib/dictionary.ts                 — +~20 kunci pada Dict, diisi 8 bahasa
tailwind.config.ts               — +keyframes ken-burns, float
app/globals.css                  — +.hide-scrollbar + helper kecil bila perlu
```

### Alur data — `app/[locale]/page.tsx`

Semua build-time, memo di `lib/api.ts`:

```
const [{ hero_images, featured_tours }, about, gallery, posts, availability] =
  await Promise.all([
    getHome(locale),
    getAbout(locale),          // { story, team } — hanya story dipakai
    getGallery(locale),        // saring i.image_path
    getBlogPosts(locale),      // ambil 3 teratas
    getAvailability(),
  ]);
const a = availability[locale];
```

Gerbang tiap bagian:

| Bagian          | Syarat render |
|-----------------|---------------|
| Hero            | selalu (bila `hero_images` kosong → latar aksen gelap polos, tanpa carousel) |
| FeaturedTours   | `featured_tours.length > 0` |
| WhyUs           | `a.about` (⇒ `about.story != null`) |
| CinematicBand   | ada ≥1 sumber gambar (`about.story?.image_url` \|\| `hero_images[0]`) |
| GalleryStrip    | `a.gallery` **dan** `gallery.filter(i=>i.image_path).length >= 3` |
| Reviews         | selalu (data statis) |
| JournalTeaser   | `a.blog` **dan** `posts.length >= 1` |
| HomeCta         | selalu |

`getAbout`/`getGallery`/`getBlogPosts` untuk bahasa tanpa data mengembalikan
bentuk kosong (bukan error) — sudah dipakai `availability.ts`, aman dipanggil
di semua locale. Bila di kemudian hari 404 → gunakan `apiGetOrNull` pola yang
ada. (Cek saat implementasi: `getAbout` di `fr` — `availability.ts` sudah
memanggilnya, jadi tidak melempar.)

### Bagian beranda

Semua bagian: bungkus `<section>` `mx-auto max-w-7xl px-6 lg:px-10`, ritme
vertikal `py-20 lg:py-28`, animasi masuk pakai `<Reveal>` yang sudah ada
(`delay={i*70}` untuk grid berjenjang).

**1 · Hero (`Hero` + `HeroCarousel`)**
- `<section className="relative flex min-h-[100svh] items-center overflow-hidden bg-slate-950">`.
- `HeroCarousel` (`"use client"`, prop `images: string[]`): render semua layer
  `<Image fill priority={i===0} sizes="100vw">` absolut, hanya `index` aktif
  `opacity-100`, lainnya `opacity-0`, transisi `1200ms`. Layer aktif dapat
  kelas `animate-ken-burns`. `setInterval` 6 dtk memutar index. Cek
  `matchMedia("(prefers-reduced-motion: reduce)")` → tidak pasang interval,
  tidak pasang kelas Ken Burns. Tanpa JS: SSG merender semua layer, hanya
  layer 0 `opacity-100` (kelas awal), sisanya `opacity-0` → gambar pertama
  tetap tampil.
- Overlay: `bg-gradient-to-b from-black/45 via-black/25 to-black/85` +
  `bg-gradient-to-r from-black/50 to-transparent` (legibilitas teks).
- 2 blob: `absolute … h-96 w-96 rounded-full bg-accent/20 blur-[120px]
  animate-float`, satu kiri-atas satu kanan-bawah, `delay` beda.
- Konten `relative z-10 mx-auto max-w-5xl px-6 text-center`:
  - Pill kaca: `inline-flex … rounded-full bg-white/10 px-4 py-2 backdrop-blur-md
    border border-white/20` + titik `h-2 w-2 rounded-full bg-accent animate-ping`
    + `<span class="text-[10px] font-black uppercase tracking-[0.3em] text-white">`
    `{t.heroBadge}`.
  - `<h1 className="mt-8 text-4xl font-black uppercase leading-[0.95]
    tracking-tighter text-white md:text-6xl lg:text-7xl">{t.heroTitle}</h1>`.
  - `<p className="mx-auto mt-7 max-w-2xl text-base font-medium text-white/80
    md:text-xl">{t.heroSubtitle}</p>`.
  - CTA baris: **Explore Tours** `Link href={`/${locale}/tours/`}`
    `bg-accent … shadow-xl shadow-red-600/25 hover:scale-105` + ikon
    `ArrowRight` (lucide-react); **WhatsApp** `<a href={chatHref(locale)}>`
    `bg-white/10 backdrop-blur border border-white/25 hover:bg-white
    hover:text-slate-900`, label `t[chatLabelKey(locale)]`.
  - Petunjuk scroll: `absolute bottom-8 left-1/2 -translate-x-1/2` chevron
    kecil `animate-float`, `aria-hidden`.
- Wrapper konten `animate-reveal-up`; anak-anak diberi `[animation-delay]`
  berjenjang (pola sudah dipakai di `page.tsx` lama).

**2 · FeaturedTours**
- `<SectionHeading badge={t.featuredToursBadge} title={t.featuredTours}
  lede={t.featuredToursLede} action={{ href:`/${locale}/tours/`, label:t.allTours }} />`.
- Grid `md:grid-cols-2 lg:grid-cols-3 gap-8`, `<TourCard>` (versi poles).
- `bg-canvas`.

**3 · WhyUs** — hanya bila `a.about`
- `bg-surface-2`. Grid `lg:grid-cols-12 gap-12 lg:gap-16 items-center`.
- Kiri (`lg:col-span-5`): badge pill `bg-accent/10 text-accent` +
  `t.whyUsBadge`; `<h2>` `{story.title_lead} <span class="text-accent">{story.title_accent}</span>`
  (`text-3xl md:text-5xl font-black uppercase tracking-tighter`); satu paragraf
  `<RichText html={story.paragraph_one} …>` (klem `line-clamp-5`); baris
  `[story.since_text, story.pioneering_text].filter(Boolean).join(" · ")` bila
  ada.
- Kanan (`lg:col-span-7`): `grid sm:grid-cols-2 gap-5`:
  - Kartu statistik dari `story`: `{ value: experience_value, label:
    experience_label }` dan `{ value: travelers_value, label: travelers_label }`
    — **hanya yang `value` non-kosong** (pola dari `about/page.tsx`).
    `rounded-[1.5rem] border border-line bg-surface p-7`, angka
    `text-3xl md:text-4xl font-black text-ink`, label
    `text-[11px] font-black uppercase tracking-widest text-ink-3`.
  - Satu kartu aksen: `sm:col-span-2 rounded-[1.5rem] bg-gradient-to-br
    from-red-600 to-red-800 p-8 text-white` berisi `t.whyUsPitch`.
  - Bila kedua statistik kosong: kartu aksen tetap tampil, grid jadi 1 kolom.

**4 · CinematicBand**
- `src = about.story?.image_url ?? hero_images[0]` (bila keduanya null → bagian
  di-skip).
- `<section className="relative isolate overflow-hidden bg-slate-950
  py-28 lg:py-36 text-white">`.
- Latar: `<div className="absolute inset-0 -z-10 bg-cover bg-center
  lg:bg-fixed" style={{ backgroundImage:`url(${src})` }} />` +
  overlay `bg-slate-950/70` + 1 blob `bg-accent/15 blur-[140px]`.
  (`bg-fixed` hanya `lg:` — hindari jank di sentuh; static export +
  `unoptimized` membuat `background-image` inline dapat diterima di sini,
  ganti rugi: tanpa `next/image`.)
- Konten tengah `max-w-3xl mx-auto text-center`: `<h2>` `{t.bandTitle}`
  (`text-3xl md:text-5xl font-black uppercase tracking-tighter`), `<p
  class="mt-6 text-lg text-white/80">{t.bandText}</p>`, 1 tombol **Explore
  Tours** → `/tours/` (`bg-white text-slate-900 hover:bg-accent hover:text-white`).

**5 · GalleryStrip** — hanya bila `a.gallery` & ≥3 gambar
- `images = gallery.filter(i=>i.image_path).slice(0,6)`.
- `<SectionHeading badge={t.galleryBadge} title={t.galleryHeading}
  action={{ href:`/${locale}/gallery/`, label:t.viewFullGallery }} />`.
- Bento: `grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px]
  gap-4`. Item 0: `col-span-2 row-span-2`. Sisanya `col-span-1 row-span-1`
  (item ke-4/5 boleh `md:col-span-2` bila jumlah < 6 supaya rapi — logika
  kelas ditentukan saat implementasi berdasar `images.length`).
- Tiap tile: `<Link href={`/${locale}/gallery/`}>` (galeri intl tak punya rute
  per-item), `<Image fill sizes>`, `group-hover:scale-105`, overlay
  `bg-gradient-to-t from-black/70`, judul `item.title` di bawah
  (`text-white font-black text-sm line-clamp-2`).
- `bg-canvas`.

**6 · Reviews (`Reviews` + `ReviewScroller`)**
- `lib/home-reviews.ts`:
  ```ts
  export type Review = {
    source: "tripadvisor" | "google";
    name: string; location?: string; time: string;
    stars: number; title?: string; text: string; color: string;
  };
  export const HOME_REVIEWS: Review[] = [ /* 5 TA + 2 Google, verbatim client_wm */ ];
  // Rating agregat — API intl belum punya endpoint. Perbarui manual bila berubah.
  export const GOOGLE_RATING = { value: "4.9", count: 39 };
  ```
- `Reviews` (server): `bg-surface-2`. `<SectionHeading badge={t.reviewsBadge}
  title={t.reviewsHeading} />`.
  - 2 kartu atas `grid lg:grid-cols-2 gap-6 mb-10`:
    - **Google**: huruf "Google" berwarna (span per huruf, seperti
      `Home.vue`), `t.reviewsHeading`/label, `GOOGLE_RATING.value` +
      5× `Star` (lucide, `fill`), `({count} {t.reviewsRatings})`, tombol
      `<a>` ke `https://www.google.com/search?q=welcomemanado` (listing).
    - **TripAdvisor**: SVG owl inline (2 lingkaran mata, dari `Home.vue`),
      `t.reviewsBadge`, tautan ke
      `https://www.tripadvisor.com/Attraction_Review-g297721-d34101092-Reviews-Welcome_Manado…`.
  - `<ReviewScroller reviews={HOME_REVIEWS} labels={{ readMore, showLess }} />`.
- `ReviewScroller` (`"use client"`): `flex gap-6 overflow-x-auto snap-x
  snap-mandatory hide-scrollbar pb-6` + 2 tombol panah absolut (`hidden
  md:flex`) memanggil `ref.scrollBy({ left: ±400 })`. Kartu
  `min-w-[320px] md:min-w-[380px] rounded-[1.5rem] border border-line
  bg-surface p-8`:
  - avatar `h-12 w-12 rounded-full` inisial, `style={{ background: review.color }}`.
  - nama + centang biru SVG; `location` + " · " + `time` (`text-ink-3`).
  - rating: TA → titik `h-3.5 w-3.5 rounded-full bg-[#00AA6C]`; Google →
    `Star` kuning `fill`.
  - `title` bila ada (`font-bold text-ink`).
  - teks: `useState` `expanded`; tampil `text.slice(0,150)+"…"` bila panjang
    > 150, tombol toggle `t.readMore` (kunci yang sudah ada) / `t.showLess` (baru).
  - footer sumber: owl TA / "G" Google + "Posted on Tripadvisor/Google".

**7 · JournalTeaser** — hanya bila `a.blog` & ≥1 pos
- `posts.slice(0,3)`.
- `<SectionHeading badge={t.journalBadge} title={t.blogHeading}
  action={{ href:`/${locale}/blog/`, label:t.viewAllArticles }} />`.
- Kartu `<Link href={`/${locale}/blog/${post.slug}/`}>`
  `rounded-[1.5rem] border border-line bg-surface overflow-hidden group`:
  gambar `aspect-[4/3]` `<Image>` `group-hover:scale-105`; pill kategori
  overlay (`post.category?.name`); tanggal
  `new Intl.DateTimeFormat(HREFLANG[locale], { year:"numeric", month:"long",
  day:"numeric" }).format(new Date(post.published_at))` bila ada; judul
  `line-clamp-2 font-black text-ink`; excerpt `post.excerpt` (atau
  `excerptFromHtml` bila null — cek tipe: `BlogList.excerpt` bisa null)
  `line-clamp-3 text-ink-2`; `"{t.readMore} →"` aksen.
- `bg-canvas`.

**8 · HomeCta**
- `<section className="px-6 lg:px-10 pb-24 pt-8">` → panel
  `mx-auto max-w-7xl rounded-[2.5rem] md:rounded-[3rem] bg-accent
  p-12 text-center text-white lg:p-20 relative overflow-hidden`.
- `<h2>` `{t.ctaTitle}` (`text-3xl md:text-5xl font-black uppercase
  tracking-tighter`), `<p class="mx-auto mt-6 max-w-xl text-white/85">{t.ctaText}</p>`.
- Tombol: **Contact** `Link` → `/contact/` (`bg-white text-accent
  hover:bg-slate-900 hover:text-white`); **WhatsApp** `<a href={chatHref(locale)}>`
  (`bg-red-700 hover:bg-red-800`) + ikon `MessageCircle`.
- Ikon dekoratif `lucide-react` (`Palmtree`, `Compass`) `absolute` opasitas
  `text-white/10`, seperti `Home.vue`.

### Komponen bersama — `SectionHeading.tsx`

```tsx
type Props = {
  badge: string;
  title: string;
  accent?: string;            // kata terakhir judul yang di-aksen-kan
  lede?: string;
  action?: { href: string; label: string };
  align?: "row" | "stack";    // default row: judul kiri, aksi kanan (lg)
};
```

Render: baris `flex items-center gap-3` → `<span class="h-1 w-10 rounded-full
bg-accent" />` + `<span class="text-[11px] font-black uppercase
tracking-[0.35em] text-accent">{badge}</span>`; `<h2 class="mt-4 text-3xl
md:text-5xl font-black uppercase tracking-tighter text-ink">{title}
{accent && <span class="text-accent"> {accent}</span>}</h2>`; `lede`
opsional `mt-4 max-w-2xl text-ink-2`; `action` opsional jadi pill
`bg-ink text-canvas hover:bg-accent` (kanan pada `lg` bila `align="row"`).

Dipakai ulang di: `app/[locale]/tours/page.tsx` dan
`app/[locale]/about/page.tsx` (mengganti blok `<span class="h-1 w-12
bg-accent"/> + <h1>` yang saat ini ditulis manual). `about/page.tsx`
bagian tim juga.

### Fase 2 — poles

- **`TourCard.tsx`**: pill kategori jadi overlay kiri-atas gambar (bukan teks
  di badan); hover `group-hover:scale-105` gambar + `hover:-translate-y-1` +
  `hover:shadow-xl hover:shadow-red-900/10`; baris durasi/lokasi pakai ikon
  `lucide-react` (`Clock`, `MapPin`). **Props tidak berubah** (`{ tour, locale }`).
- **`Footer.tsx`**: dari 3 baris → footer penuh: brand + tagline; kolom nav
  (Tours/Hotels/Gallery/Journal/About/Contact — pakai `getAvailability()` +
  `dict`, pola dari `Header.tsx`); tautan WhatsApp `chatHref`; backlink
  "Part of Welcome Manado"; baris copyright `© {year} Welcome Manado`. Token.
- **`Header.tsx` (opsional)**: pecah jadi shell `"use client"` yang menyetel
  `data-scrolled` saat `scrollY > 8`; transparan + teks putih di atas hero
  (halaman beranda), `bg-surface/80 backdrop-blur border-b` setelah scroll /
  di halaman lain. Hanya bila cakupan lain sudah tuntas.

### Tailwind / CSS

`tailwind.config.ts` — tambah:
```ts
keyframes: {
  "ken-burns": { from: { transform: "scale(1.12)" }, to: { transform: "scale(1)" } },
  float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
},
animation: {
  "ken-burns": "ken-burns 8s ease-out both",
  float: "float 6s ease-in-out infinite",
},
```
`globals.css` — tambah `.hide-scrollbar` (`scrollbar-width:none` +
`::-webkit-scrollbar{display:none}`). Blok `@media (prefers-reduced-motion)`
yang ada sudah mematikan `animation`/`transition` global — cukup.

### i18n — kunci baru pada `Dict` (`lib/dictionary.ts`), diisi 8 bahasa

| kunci | contoh `en` |
|-------|-------------|
| `heroBadge` | "Small-group tours · North Sulawesi" |
| `featuredToursBadge` | "Best of Manado" |
| `featuredToursLede` | "A few trips our guests keep coming back for." |
| `whyUsBadge` | "The Welcome Manado difference" |
| `whyUsPitch` | "Run by people who grew up on these reefs, not a call centre." |
| `bandTitle` | "Reefs, volcanoes, and the road between them" |
| `bandText` | "Every trip is run by a local guide who knows which turning to take." |
| `galleryBadge` | "From past trips" |
| `viewFullGallery` | "View full gallery" |
| `journalBadge` | "Field notes" |
| `viewAllArticles` | "All articles" |
| `reviewsBadge` | "Recognized excellence" |
| `reviewsHeading` | "What travelers say" |
| `reviewsRatings` | "ratings" |
| `showLess` | "Show less" | (pasangan `readMore` yang sudah ada) |
| `ctaTitle` | "Planning a trip to North Sulawesi?" |
| `ctaText` | "Tell us roughly when and how many — we reply in your language." |

Nilai `ko`/`zh` mengacu gaya `client_wm/src/locales`; 5 bahasa Eropa
mengikuti nada entri Dict yang sudah ada. Ditulis saat implementasi, di-review
bareng.

## Yang TIDAK dikerjakan (YAGNI)

- Tidak ada endpoint / tabel ulasan baru di `api_wm`. Ulasan tetap statis.
- Tidak memuat widget/skrip TripAdvisor atau Google.
- Tidak ada teaser Hotel di beranda (situs induk pun tidak punya).
- Tidak ada filter kategori di `tours/` (tile galeri & tombol semua menuju
  halaman indeks yang ada).
- Tidak menyentuh halaman detail (`tours/[slug]`, `hotels/[slug]`,
  `blog/[slug]`), form kontak, SEO/sitemap, atau proses deploy.
- `Header` scroll-aware hanya bila waktu tersisa.

## Rencana uji / verifikasi

1. `NODE_ENV=production npm run build` — static export lolos untuk **semua**
   `publishedLocales()`; tidak ada error `generateStaticParams` / gambar /
   `remotePatterns`.
2. `npm run preview` lalu buka:
   - `/en/` — semua 8 bagian tampil, dark mode toggle di tiap bagian, carousel
     berputar, `ReviewScroller` panah jalan, "Read more" jalan.
   - `/ko/` atau `/zh/` — skrip non-Latin tidak merusak tata letak judul
     `tracking-tighter`.
   - satu locale tanpa about/gallery/blog (mis. `/fr/`) — WhyUs, GalleryStrip,
     JournalTeaser **hilang mulus**, tidak ada bagian kosong / heading
     menggantung.
3. `prefers-reduced-motion: reduce` (DevTools) — carousel diam di gambar 1,
   tidak ada Ken Burns / float / ping.
4. Lighthouse cepat pada `/en/` — hero LCP wajar (`priority` di layer 0),
   CLS ~0 (carousel absolut, tinggi section terkunci).
5. Halaman `tours/` & `about/` masih benar setelah `SectionHeading` dipasang.

## Urutan implementasi (ringkas — detail di plan)

1. `tailwind.config.ts` + `globals.css` helper.
2. `lib/dictionary.ts` — kunci baru 8 bahasa.
3. `components/SectionHeading.tsx`.
4. `lib/home-reviews.ts` — port ulasan.
5. Komponen `components/home/*` satu per satu (Hero → FeaturedTours → WhyUs →
   CinematicBand → GalleryStrip → Reviews → JournalTeaser → HomeCta).
6. Rangkai `app/[locale]/page.tsx`.
7. `npm run build` + verifikasi manual (bagian "Rencana uji").
8. Fase 2: `TourCard`, retrofit `SectionHeading` ke `tours/`+`about/`, `Footer`.
9. (opsional) `Header` scroll-aware.
10. Build + verifikasi ulang. Commit per langkah bermakna. Push pertama =
    keputusan pengguna; TIDAK merge ke `main` sendiri.
