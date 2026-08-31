# Beranda intl_wm Sinematik — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rombak `app/[locale]/page.tsx` dari 2 bagian (hero + featured tours) menjadi landing page 8 bagian bergaya sinematik yang meniru ritme `welcomemanado.com`, plus poles komponen bersama — semua dari data `/api/intl/*` yang sudah ada.

**Architecture:** Orkestrator `page.tsx` mengambil semua data build-time via `Promise.all` lalu merender komponen server per bagian, tiap bagian bergerbang per bahasa lewat `getAvailability()`. Interaksi (carousel hero, scroller ulasan) di komponen `"use client"` kecil. Warna lewat token CSS-var yang sudah ada supaya dark mode utuh. Ulasan Google/TripAdvisor diport sebagai data statis bertipe (API intl belum punya endpoint ulasan).

**Tech Stack:** Next.js 14 (App Router, `output: "export"`), React 18 server components, TypeScript strict, Tailwind CSS 3.4 (token semantik), `lucide-react` 0.417 (sudah di dependencies, belum dipakai), `next/image` `unoptimized`.

**Spec:** `docs/superpowers/specs/2026-08-31-beranda-sinematik-design.md` — baca bersama plan ini; rasional tiap keputusan ada di sana.

## Global Constraints

- **Static export.** Tidak ada runtime server. SEMUA fetch `/api/intl/*` hanya di server component / `generateStaticParams` / `generateMetadata`, di-memo di `lib/api.ts`. UI baru TIDAK menambah fetch sisi klien.
- **Komponen `"use client"` hanya untuk interaksi.** Yang boleh client: `HeroCarousel`, `ReviewScroller`, (opsional) `HeaderShell`. Sisanya server.
- **Warna lewat token.** Kelas: `bg-canvas / bg-surface / bg-surface-2 / border-line / text-ink / text-ink-2 / text-ink-3 / bg-accent / text-accent`. JANGAN `bg-slate-*` untuk UI yang ikut dark mode. Bagian sengaja-gelap (`CinematicBand`, `Hero` latar) memakai `bg-slate-950` + teks putih sebagai konstanta desain yang disadari.
- **Gerbang per bahasa.** `getAvailability()` → `availability[locale].{about,gallery,blog,hotels}`. Bagian dari About/Gallery/Blog WAJIB bergerbang; `fr/de/it/es/nl` saat ini tidak punya data itu.
- **`Dict` bersifat exhaustive** (`Record<Locale, Dict>`). Menambah kunci ke tipe `Dict` tanpa mengisi 8 bahasa = gagal `tsc`. Itu fitur, bukan bug.
- **Tanpa skrip pihak ketiga.** Tidak memuat widget TripAdvisor (`jscache.com`) / apa pun dari Google. Hanya kartu bergaya + tautan keluar.
- **`prefers-reduced-motion`.** `globals.css` sudah mematikan `animation`/`transition` global. Komponen auto-motion (`HeroCarousel`) TAMBAHAN wajib cek `matchMedia` supaya tidak menjadwalkan `setInterval`.
- **`next.config.js` `images.remotePatterns` = hanya `api.welcomemanado.my.id`.** Bila build gagal karena host gambar lain, tambah pola di sana (langkah verifikasi tiap task yang render `<Image>`).
- **Alur git:** kerja di branch `feat/beranda-sinematik` (sudah dibuat dari `dev`). Commit tiap task. JANGAN merge ke `main`. Push pertama = keputusan pengguna.
- **Verifikasi:** repo ini TIDAK punya test runner (pola yang ada: `tsc` + `next build` + cek manual). Gate cepat per task: `npx tsc --noEmit`. Gate penuh di task milestone: `NODE_ENV=production npm run build` (butuh jaringan ke `api.welcomemanado.my.id`). Cek visual: `npm run dev` lalu buka `http://localhost:3000/en/` (pengguna melakukan ini sendiri).

Semua perintah dijalankan dari `/Users/marchelinoraco/Documents/2026/welcomeManado/intl_wm`.

---

## File Structure

| File | Tanggung jawab |
|------|----------------|
| `tailwind.config.ts` *(modif)* | +keyframes `ken-burns`, `float` |
| `app/globals.css` *(modif)* | +`.hide-scrollbar` |
| `lib/dictionary.ts` *(modif)* | +18 kunci pada `Dict`, diisi 8 bahasa |
| `lib/home-reviews.ts` *(baru)* | tipe `Review`, `HOME_REVIEWS`, `GOOGLE_RATING` |
| `components/SectionHeading.tsx` *(baru)* | pola badge + judul(+aksen) + lede + aksi |
| `components/home/Hero.tsx` *(baru)* | server: copy + CTA + `<HeroCarousel>` |
| `components/home/HeroCarousel.tsx` *(baru)* | client: crossfade + Ken Burns |
| `components/home/FeaturedTours.tsx` *(baru)* | server: SectionHeading + grid TourCard |
| `components/home/WhyUs.tsx` *(baru)* | server: dari `AboutStory` |
| `components/home/CinematicBand.tsx` *(baru)* | server: pita gelap full-bleed + parallax |
| `components/home/GalleryStrip.tsx` *(baru)* | server: bento 6 foto |
| `components/home/Reviews.tsx` *(baru)* | server: kartu Google + TA + `<ReviewScroller>` |
| `components/home/ReviewScroller.tsx` *(baru)* | client: snap-scroll + panah + expand |
| `components/home/JournalTeaser.tsx` *(baru)* | server: 3 kartu blog |
| `components/home/HomeCta.tsx` *(baru)* | server: panel aksen + Contact + WhatsApp |
| `app/[locale]/page.tsx` *(rombak)* | orkestrator: fetch + gerbang + susun |
| `components/TourCard.tsx` *(modif, Fase 2)* | pill kategori overlay, baris ikon, hover |
| `app/[locale]/tours/page.tsx` *(modif, Fase 2)* | pakai `<SectionHeading>` |
| `app/[locale]/about/page.tsx` *(modif, Fase 2)* | pakai `<SectionHeading>` di bagian tim |
| `components/Footer.tsx` *(rombak, Fase 2)* | footer penuh: kolom nav + WA + copyright |
| `components/HeaderShell.tsx` *(baru, Fase 2 opsional)* | client: header transparan di atas hero |
| `components/Header.tsx` *(modif, Fase 2 opsional)* | bungkus isi dengan `<HeaderShell>` |

---

## Task 1: Foundation — keyframes Tailwind + helper CSS

**Files:**
- Modify: `tailwind.config.ts` (blok `keyframes` & `animation` di dalam `theme.extend`)
- Modify: `app/globals.css` (tambah aturan `.hide-scrollbar`)

**Interfaces:**
- Consumes: —
- Produces: kelas utility `animate-ken-burns`, `animate-float`, `.hide-scrollbar` (dipakai Task 5 & 10)

- [ ] **Step 1: Tambah keyframes & animation di `tailwind.config.ts`**

Di dalam `theme.extend.keyframes` (setelah `"menu-in"`), tambah:

```ts
        "ken-burns": {
          from: { transform: "scale(1.12)" },
          to: { transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
```

Di dalam `theme.extend.animation` (setelah `"menu-in"`), tambah:

```ts
        "ken-burns": "ken-burns 8s ease-out both",
        float: "float 6s ease-in-out infinite",
```

- [ ] **Step 2: Tambah `.hide-scrollbar` di `app/globals.css`**

Setelah blok `.rich-text a { … }` di akhir file, tambah:

```css
/* Sembunyikan scrollbar tapi tetap bisa di-scroll — dipakai baris kartu ulasan. */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 3: Verifikasi config valid**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

Run: `npm run dev` lalu buka `http://localhost:3000/en/`, pastikan halaman lama tetap tampil (belum ada perubahan visual). Hentikan dev server.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "chore(beranda): keyframes ken-burns/float + helper .hide-scrollbar"
```

---

## Task 2: i18n — 18 kunci baru pada `Dict`, diisi 8 bahasa

**Files:**
- Modify: `lib/dictionary.ts` (tipe `Dict` + kedelapan objek locale di `DICTIONARY`)

**Interfaces:**
- Consumes: —
- Produces: kunci `Dict` baru: `heroBadge`, `featuredToursBadge`, `featuredToursLede`, `whyUsBadge`, `whyUsPitch`, `bandTitle`, `bandText`, `galleryBadge`, `viewFullGallery`, `journalBadge`, `viewAllArticles`, `reviewsBadge`, `reviewsHeading`, `reviewsRatings`, `showLess`, `ctaTitle`, `ctaText` — semua `string`. (`readMore` sudah ada.)

- [ ] **Step 1: Tambah field ke tipe `Dict`**

Di `type Dict = { … }`, setelah `readMore: string;` tambahkan:

```ts
  heroBadge: string;
  featuredToursBadge: string;
  featuredToursLede: string;
  whyUsBadge: string;
  whyUsPitch: string;
  bandTitle: string;
  bandText: string;
  galleryBadge: string;
  viewFullGallery: string;
  journalBadge: string;
  viewAllArticles: string;
  reviewsBadge: string;
  reviewsHeading: string;
  reviewsRatings: string;
  showLess: string;
  ctaTitle: string;
  ctaText: string;
```

- [ ] **Step 2: Isi nilai di tiap objek locale**

Tambahkan blok berikut ke tiap objek di `DICTIONARY` (letakkan setelah `readMore:` masing-masing). **Nilai per bahasa:**

`en`:
```ts
    heroBadge: "Small-group tours · North Sulawesi",
    featuredToursBadge: "Best of Manado",
    featuredToursLede: "A few trips our guests keep coming back for.",
    whyUsBadge: "The Welcome Manado difference",
    whyUsPitch: "Run by people who grew up on these reefs, not a call centre.",
    bandTitle: "Reefs, volcanoes, and the road between them",
    bandText: "Every trip is run by a local guide who knows which turning to take.",
    galleryBadge: "From past trips",
    viewFullGallery: "View full gallery",
    journalBadge: "Field notes",
    viewAllArticles: "All articles",
    reviewsBadge: "Recognized excellence",
    reviewsHeading: "What travelers say",
    reviewsRatings: "ratings",
    showLess: "Show less",
    ctaTitle: "Planning a trip to North Sulawesi?",
    ctaText: "Tell us roughly when and how many — we reply in your language, usually within a day.",
```

`ko`:
```ts
    heroBadge: "소규모 투어 · 북술라웨시",
    featuredToursBadge: "마나도 추천",
    featuredToursLede: "손님들이 다시 찾는 여행들.",
    whyUsBadge: "Welcome Manado의 차이",
    whyUsPitch: "콜센터가 아니라, 이 산호초에서 자란 사람들이 직접 운영합니다.",
    bandTitle: "산호초와 화산, 그리고 그 사이의 길",
    bandText: "모든 여행은 어느 길로 가야 할지 아는 현지 가이드가 함께합니다.",
    galleryBadge: "지난 여행에서",
    viewFullGallery: "갤러리 전체 보기",
    journalBadge: "여행 노트",
    viewAllArticles: "전체 글 보기",
    reviewsBadge: "인정받은 우수성",
    reviewsHeading: "여행자들의 후기",
    reviewsRatings: "개 평가",
    showLess: "간략히",
    ctaTitle: "북술라웨시 여행을 계획 중이신가요?",
    ctaText: "대략 언제, 몇 분인지 알려주세요 — 사용하시는 언어로, 보통 하루 안에 답장드립니다.",
```

`zh`:
```ts
    heroBadge: "小团游 · 北苏拉威西",
    featuredToursBadge: "美娜多精选",
    featuredToursLede: "旅客一再回访的几段旅程。",
    whyUsBadge: "Welcome Manado 的不同",
    whyUsPitch: "由在这片珊瑚礁边长大的人经营，不是客服中心。",
    bandTitle: "珊瑚礁、火山，以及之间的路",
    bandText: "每一段行程都有知道该在哪里转弯的当地向导带领。",
    galleryBadge: "过往旅程",
    viewFullGallery: "查看完整相册",
    journalBadge: "旅途手记",
    viewAllArticles: "全部文章",
    reviewsBadge: "备受认可",
    reviewsHeading: "旅客怎么说",
    reviewsRatings: "条评价",
    showLess: "收起",
    ctaTitle: "正在计划北苏拉威西之旅？",
    ctaText: "告诉我们大致的时间和人数 —— 我们会用您的语言回覆，通常一天之内。",
```

`fr`:
```ts
    heroBadge: "Circuits en petit groupe · Nord de Sulawesi",
    featuredToursBadge: "Le meilleur de Manado",
    featuredToursLede: "Quelques circuits pour lesquels nos clients reviennent.",
    whyUsBadge: "La différence Welcome Manado",
    whyUsPitch: "Gérée par des gens qui ont grandi sur ces récifs, pas un centre d'appels.",
    bandTitle: "Récifs, volcans et la route qui les relie",
    bandText: "Chaque circuit est mené par un guide local qui sait quelle route prendre.",
    galleryBadge: "De nos circuits passés",
    viewFullGallery: "Voir toute la galerie",
    journalBadge: "Carnet de terrain",
    viewAllArticles: "Tous les articles",
    reviewsBadge: "Excellence reconnue",
    reviewsHeading: "Ce que disent les voyageurs",
    reviewsRatings: "avis",
    showLess: "Voir moins",
    ctaTitle: "Vous préparez un voyage dans le Nord de Sulawesi ?",
    ctaText: "Dites-nous à peu près quand et combien vous êtes — nous répondons dans votre langue, en général sous 24 heures.",
```

`de`:
```ts
    heroBadge: "Touren in kleinen Gruppen · Nord-Sulawesi",
    featuredToursBadge: "Das Beste von Manado",
    featuredToursLede: "Ein paar Reisen, für die unsere Gäste immer wiederkommen.",
    whyUsBadge: "Der Welcome-Manado-Unterschied",
    whyUsPitch: "Geführt von Menschen, die an diesen Riffen aufgewachsen sind – kein Callcenter.",
    bandTitle: "Riffe, Vulkane und die Straße dazwischen",
    bandText: "Jede Reise wird von einem einheimischen Guide geführt, der jede Abzweigung kennt.",
    galleryBadge: "Aus vergangenen Reisen",
    viewFullGallery: "Ganze Galerie ansehen",
    journalBadge: "Notizen von unterwegs",
    viewAllArticles: "Alle Artikel",
    reviewsBadge: "Anerkannte Exzellenz",
    reviewsHeading: "Was Reisende sagen",
    reviewsRatings: "Bewertungen",
    showLess: "Weniger anzeigen",
    ctaTitle: "Planen Sie eine Reise nach Nord-Sulawesi?",
    ctaText: "Sagen Sie uns ungefähr wann und wie viele — wir antworten in Ihrer Sprache, meist innerhalb eines Tages.",
```

`it`:
```ts
    heroBadge: "Tour in piccoli gruppi · Nord Sulawesi",
    featuredToursBadge: "Il meglio di Manado",
    featuredToursLede: "Alcuni viaggi per cui i nostri ospiti tornano.",
    whyUsBadge: "La differenza Welcome Manado",
    whyUsPitch: "Gestita da persone cresciute su queste barriere coralline, non un call center.",
    bandTitle: "Barriere coralline, vulcani e la strada che li unisce",
    bandText: "Ogni viaggio è guidato da una guida locale che sa quale strada prendere.",
    galleryBadge: "Dai viaggi passati",
    viewFullGallery: "Vedi tutta la galleria",
    journalBadge: "Appunti di viaggio",
    viewAllArticles: "Tutti gli articoli",
    reviewsBadge: "Eccellenza riconosciuta",
    reviewsHeading: "Cosa dicono i viaggiatori",
    reviewsRatings: "recensioni",
    showLess: "Mostra meno",
    ctaTitle: "Stai organizzando un viaggio nel Nord Sulawesi?",
    ctaText: "Diteci più o meno quando e in quanti — rispondiamo nella vostra lingua, di solito entro un giorno.",
```

`es`:
```ts
    heroBadge: "Tours en grupos reducidos · Norte de Célebes",
    featuredToursBadge: "Lo mejor de Manado",
    featuredToursLede: "Algunos viajes por los que nuestros huéspedes vuelven.",
    whyUsBadge: "La diferencia de Welcome Manado",
    whyUsPitch: "Gestionado por gente que creció en estos arrecifes, no un centro de llamadas.",
    bandTitle: "Arrecifes, volcanes y el camino entre ellos",
    bandText: "Cada viaje lo dirige un guía local que sabe qué desvío tomar.",
    galleryBadge: "De viajes anteriores",
    viewFullGallery: "Ver galería completa",
    journalBadge: "Cuaderno de viaje",
    viewAllArticles: "Todos los artículos",
    reviewsBadge: "Excelencia reconocida",
    reviewsHeading: "Lo que dicen los viajeros",
    reviewsRatings: "valoraciones",
    showLess: "Ver menos",
    ctaTitle: "¿Planeas un viaje al norte de Célebes?",
    ctaText: "Cuéntanos aproximadamente cuándo y cuántos sois — respondemos en tu idioma, normalmente en menos de un día.",
```

`nl`:
```ts
    heroBadge: "Tours in kleine groepen · Noord-Sulawesi",
    featuredToursBadge: "Het beste van Manado",
    featuredToursLede: "Een paar reizen waarvoor onze gasten terugkomen.",
    whyUsBadge: "Het Welcome Manado-verschil",
    whyUsPitch: "Geleid door mensen die op deze riffen zijn opgegroeid, geen callcenter.",
    bandTitle: "Riffen, vulkanen en de weg ertussen",
    bandText: "Elke reis wordt geleid door een lokale gids die weet welke afslag te nemen.",
    galleryBadge: "Van eerdere reizen",
    viewFullGallery: "Hele galerij bekijken",
    journalBadge: "Aantekeningen onderweg",
    viewAllArticles: "Alle artikelen",
    reviewsBadge: "Erkende kwaliteit",
    reviewsHeading: "Wat reizigers zeggen",
    reviewsRatings: "beoordelingen",
    showLess: "Minder tonen",
    ctaTitle: "Plan je een reis naar Noord-Sulawesi?",
    ctaText: "Vertel ons ongeveer wanneer en met hoeveel — we antwoorden in je eigen taal, meestal binnen een dag.",
```

- [ ] **Step 3: Verifikasi tipe exhaustive**

Run: `npx tsc --noEmit`
Expected: tidak ada error. (Bila satu bahasa terlewat satu kunci, `tsc` menyebut objek mana & kunci mana.)

- [ ] **Step 4: Commit**

```bash
git add lib/dictionary.ts
git commit -m "feat(beranda): 18 kunci i18n untuk bagian beranda baru (8 bahasa)"
```

---

## Task 3: `SectionHeading` — komponen judul bagian bersama

**Files:**
- Create: `components/SectionHeading.tsx`

**Interfaces:**
- Consumes: —
- Produces:
  ```ts
  type SectionHeadingProps = {
    badge?: string;
    title: string;
    accent?: string;
    lede?: string;
    action?: { href: string; label: string };
    tone?: "light" | "dark";      // default "light"
    headingLevel?: 1 | 2;         // default 2
  };
  export default function SectionHeading(props: SectionHeadingProps): JSX.Element
  ```

- [ ] **Step 1: Buat `components/SectionHeading.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  badge?: string;
  title: string;
  accent?: string;
  lede?: string;
  action?: { href: string; label: string };
  tone?: "light" | "dark";
  headingLevel?: 1 | 2;
};

/**
 * Pola judul bagian yang berulang di seluruh situs: garis aksen + label
 * ter-track kecil, judul tebal uppercase (kata aksen opsional diwarnai),
 * lede opsional, dan tombol aksi opsional di kanan (pada lg).
 */
export default function SectionHeading({
  badge,
  title,
  accent,
  lede,
  action,
  tone = "light",
  headingLevel = 2,
}: Props) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const ledeColor = tone === "dark" ? "text-white/70" : "text-ink-2";

  return (
    <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        {badge && (
          <div className="flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-accent" />
            <span className="text-[11px] font-black uppercase tracking-[0.35em] text-accent">
              {badge}
            </span>
          </div>
        )}
        <Heading
          className={`text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl ${
            badge ? "mt-4" : ""
          } ${titleColor}`}
        >
          {title}
          {accent && <span className="text-accent"> {accent}</span>}
        </Heading>
        {lede && (
          <p className={`mt-4 text-base font-medium leading-relaxed ${ledeColor}`}>
            {lede}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-ink px-7 py-3.5 text-[11px] font-black uppercase tracking-widest text-canvas transition-colors hover:bg-accent hover:text-white lg:self-auto"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error. (Belum ada konsumen — komponen leaf.)

- [ ] **Step 3: Commit**

```bash
git add components/SectionHeading.tsx
git commit -m "feat(beranda): komponen SectionHeading bersama"
```

---

## Task 4: `lib/home-reviews.ts` — port ulasan asli

**Files:**
- Create: `lib/home-reviews.ts`

**Interfaces:**
- Consumes: —
- Produces:
  ```ts
  export type Review = {
    source: "tripadvisor" | "google";
    name: string;
    location?: string;
    time: string;
    stars: number;
    title?: string;
    text: string;
    color: string;
  };
  export const HOME_REVIEWS: Review[];          // 5 TripAdvisor + 2 Google
  export const GOOGLE_RATING: { value: string; count: number };
  ```

**Catatan port:** teks ulasan disalin **verbatim** dari
`client_wm/src/views/home/Home.vue` (`tripAdvisorReviews` + `googleReviews`).
Dua penyesuaian yang disengaja untuk audiens internasional: (1) key `expanded`
dibuang; (2) `location` dan singkatan bulan pada `time` dinormalkan ke bahasa
Inggris (`"Jerman"`→`"Germany"`, `"Roma, Italia"`→`"Rome, Italy"`,
`"Agu 2026"`→`"Aug 2026"`, `"Mei 2026"`→`"May 2026"`, `"Des 2025"`→`"Dec 2025"`).
Teks ulasan itu sendiri TIDAK diubah.

- [ ] **Step 1: Buat `lib/home-reviews.ts`**

```ts
/**
 * Ulasan asli dari listing TripAdvisor Welcome Manado (d34101092) & profil
 * Google Bisnis. Diport verbatim dari client_wm/src/views/home/Home.vue —
 * teks tidak diubah; hanya `location` & singkatan bulan yang dinormalkan ke
 * bahasa Inggris. Ditampilkan apa adanya di semua locale (ulasan tidak
 * diterjemahkan) — sama seperti situs induk.
 *
 * API /api/intl/* belum punya endpoint ulasan. Bila nanti ada, ganti file ini
 * dengan fetch build-time di lib/api.ts.
 */
export type Review = {
  source: "tripadvisor" | "google";
  name: string;
  location?: string;
  time: string;
  stars: number;
  title?: string;
  text: string;
  color: string;
};

export const HOME_REVIEWS: Review[] = [
  {
    source: "tripadvisor",
    name: "Stefan A",
    time: "Aug 2026",
    stars: 5,
    color: "#6D4C9F",
    title: "Great 6-day trip North Sulawesi",
    text: "This summer, as part of our tour of Indonesia, our family of five booked a 6-day Tangkoko Adventure Tour through Welcome Manado. On the day of departure, we were picked up by Fikri (guide) and Darren (driver). We had a fantastic VIP bus at our disposal. The tour consisted of four days on the mainland and two days at a resort on Bunaken. We saw and did so much during the tour. North Sulawesi has such beautiful scenery. The wildlife was the highlight of the trip. Our guide (Monik) at the Tangkoko Nature Reserve was very enthusiastic and managed to spot almost every animal—except for the tarantula. The hotels were lovely, although the rooms at the Grand Master were significantly worse; they smelled bad and had a lot of mold. The days spent relaxing on Bunaken were fantastic. We saw plenty of coral, fish, and turtles. Fikri took excellent care of us throughout the trip and handled everything perfectly, even though the schedule was too tight at times. Darren navigated the large VIP bus effortlessly through the narrow, busy streets. Thank you, Welcome Manado, for an unforgettable trip! Best regards, The Ahne family",
  },
  {
    source: "tripadvisor",
    name: "Maxim P",
    location: "Germany",
    time: "May 2026",
    stars: 5,
    color: "#C1442E",
    title: "Great agency to explore Northern Sulawesi",
    text: "I booked a customized 4 night package as a solo traveller with a private guide and driver. Arrived in Manado in the early morning with the Transnusa flight from Denpasar. We explored the mountains around Tomohon and the market, did the Mahawu crater hike and visited the Waruga Sawangan cemetary on the way to Tangkoko Nature Reserve. Spent 2 nights in Tangkoko in a very comfortable little lodge. 2 evenings were perfect to explore the nocturnal wildlife like tarsiers, bear cuscus, owls and spiders. In the morning hours we spend several hours in the jungle exploring monkeys and endemic birds. The other 2 nights were spent on Bunaken Island with a boat trip to the beautiful vulcanic island Manado Tua and a snorkeling tour to the spectacular drop-off reefs surrounding the island. Welcome Manado was of great assistence in creating the perfect program for my Sulawesi visit and on the spot my guide Fikri was very helpful and pleasant and provided a lot of interesting background information about his home island - assisted by additional local guides on the various sights. For me it was the perfect way to spend 5 days exploring beautiful Sulawesi with professional planning and no hassle :) I will come back to explore more areas of the island and choose Welcome Manado again!",
  },
  {
    source: "tripadvisor",
    name: "AneelOnTheRoad",
    location: "Austin, Texas",
    time: "Jun 2026",
    stars: 5,
    color: "#1E5FA8",
    title: "Great views and wildlife! Friendly and adaptable guide",
    text: "We did a tour to the Tangkoko Nature Reserve and Tunan Waterfall and liked it so much we did another tour the next day to see Tarsiers in the mangroves from Rap-Rap beach (the description says \"canoes\", but we used kayaks). The guide was very friendly and we saw beautiful sights and rare wildlife. We mentioned that we were interested in birds, and the guide and driver kept their eyes peeled and pointed out many that we would have missed.\n\nI also appreciate that the guide (Herton) was very adaptable. When thunderstorms hit at the waterfall, we were prepared with umbrellas, and when one lookout was closed, we got another spectacular view from a lovely cafe. While we were passing through Manado, we had an unusual request: to find some local cloth. They took us to a boutique with amazing Minahasa weaving.",
  },
  {
    source: "tripadvisor",
    name: "Dream19529040944",
    location: "Rome, Italy",
    time: "Aug 2026",
    stars: 5,
    color: "#00857A",
    title: "Bellissimo viaggio, ottima agenzia.",
    text: "Sono un'agenzia locale professionale li abbiamo contattati ad inizio anno ed hanno soddisfatto ogni richiesta, anche le più articolate. Abbiamo fatto delle modifiche durante il viaggio e ci hanno accontentati. Che dire accoglienti, precisi e organizzati. Abbiamo avuto una guida professionale (Fikri) che ci ha seguito su tutto e che consiglio (ottimo inglese per altro). Ultimo, ma non ultimo, eccellente rapporto qualità prezzo, si saltano gli intermediari europei. Noi abbiamo fatto 13 giorni Sulawesi nord.",
  },
  {
    source: "tripadvisor",
    name: "NAF22",
    location: "Lisbon, Portugal",
    time: "Dec 2025",
    stars: 5,
    color: "#E91E63",
    title: "Amazing tour and experience from Manado",
    text: "What an amazing experience with Welcome Manado! The 3night 4 day tour around North of Sulawesi was just the perfect escape which completed our Bunaken holiday.\nThe planning of the tour and communication were just perfect. All was customized to our requests and promptly adjusted and communicated in fast pace. Thank you Eby and team.\nOur tour guide and driver made sure the live experience would be perfect, safe and personalized. Dony (tour guide) did an amazing job, always taking care of every little detail, explaining the tour and places, while having everything ready and on time. He was present, always antecipating our needs and also leaving room for the group to enjoy our own moments.\nThank you so much Dony!\nAbout the tour, let me share the good moments and places. We were picked up at Manado airport, went around Manado, stoped in a local coffee shop (local experience), went to few worship houses, then we went to Christ blessing… we drove to Tunan waterfall in a park (20' walking) which we loved and is an easy one. We stayed in Tangkoko park (lovely hotel Tangkoko Santuary) and did a morning tour with a local ranger… we saw a big black monkey community, birds, tarsius, bear cuscus… was a lovely nature tour.\nWe had a snorkeling tour to Gangga and Lihaga with lunch at the beach. Top corals and diversity of fish.\nIt was funny also to have karaoke in our van (and when the micros did not work perfectly They made sure to substitute immediately, just giving an example of the extra mile the team was going).\nI highly recommend the tour company and Dony if you are planning a tour from Manado or North Sulawesi. The overall experience couldn't be better.",
  },
  {
    source: "google",
    name: "Joanna Chu",
    time: "a year ago",
    stars: 5,
    color: "#607D8B",
    text: "A big thank you to Ima & Opo, our guide & driver from Welcome Manado Wisata whom had shown great hospitality during our Tarsiers Tour. They did the extra miles to recommend us great food places and brought us to Jesus's Blessing Statue even though its not in the itinerary. The lunch at Manres Hills were good, and price is cheap for the ambience & scenic view. We highly recommend Welcome Manado Wisata for any tours in Manado 😊",
  },
  {
    source: "google",
    name: "Lili Suryanti",
    time: "2 months ago",
    stars: 5,
    color: "#4CAF50",
    text: "This is my first time been in Manado. I came w/ my guests from China. It was nice first impression for us. We love the hotel where we stayed at Fourpoints, also the water activities such as snorkling. The services that given by our local guide Fikri also great, we bought the package from Welcome Manado. Very responseful n helpful. Sure will be back again for our next trip.",
  },
];

/**
 * Rating agregat Google. API intl belum punya endpoint — nilai disalin dari
 * yang live di client_wm per 2026-08-31. PERBARUI MANUAL bila berubah.
 */
export const GOOGLE_RATING = { value: "4.9", count: 39 };
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

- [ ] **Step 3: Commit**

```bash
git add lib/home-reviews.ts
git commit -m "feat(beranda): port ulasan asli Google + TripAdvisor sebagai data statis"
```

---

## Task 5: Rombak `page.tsx` (lapisan data) + `Hero` + `HeroCarousel`

**Files:**
- Create: `components/home/HeroCarousel.tsx`
- Create: `components/home/Hero.tsx`
- Modify: `app/[locale]/page.tsx` (rombak total)

**Interfaces:**
- Consumes: `dict` (`lib/dictionary`), `chatHref`/`chatLabelKey` (`lib/contact`), `Locale` (`lib/locales`), `getHome`/`getAbout`/`getGallery`/`getBlogPosts` + tipe (`lib/api`), `getAvailability`/`publishedLocales` (`lib/availability`), `animate-ken-burns`/`animate-float` (Task 1).
- Produces:
  ```ts
  // components/home/HeroCarousel.tsx
  export default function HeroCarousel(props: { images: string[] }): JSX.Element  // "use client"
  // components/home/Hero.tsx
  export default function Hero(props: { locale: Locale; images: string[] }): JSX.Element
  ```
  `page.tsx` sekarang mengambil `{ hero_images, featured_tours }`, `about`
  (`AboutPayload`), `gallery` (`GalleryItem[]`), `posts` (`BlogList[]`),
  `availability` — tersedia untuk task bagian berikutnya.

- [ ] **Step 1: Buat `components/home/HeroCarousel.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Carousel gambar hero: crossfade antar layer + Ken Burns pada layer aktif.
 * SSG merender semua layer; hanya layer 0 mulai `opacity-100`, jadi tanpa JS
 * gambar pertama tetap tampil. Auto-advance dimatikan saat prefers-reduced-motion.
 */
export default function HeroCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      6000,
    );
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="absolute inset-0 -z-10 bg-slate-950">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${
              i === index ? "motion-safe:animate-ken-burns" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Buat `components/home/Hero.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { chatHref, chatLabelKey } from "@/lib/contact";

export default function Hero({
  locale,
  images,
}: {
  locale: Locale;
  images: string[];
}) {
  const t = dict(locale);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-slate-950">
      {images.length > 0 && <HeroCarousel images={images} />}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px] motion-safe:animate-float" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px] motion-safe:animate-float [animation-delay:3s]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl animate-reveal-up px-6 py-28 text-center">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-accent motion-safe:animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
            {t.heroBadge}
          </span>
        </p>

        <h1 className="mt-8 text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white md:text-6xl lg:text-7xl">
          {t.heroTitle}
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-relaxed text-white/80 md:text-xl">
          {t.heroSubtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/tours/`}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-9 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-red-600/25 transition-transform hover:scale-105"
          >
            {t.exploreTours}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={chatHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/25 bg-white/10 px-9 py-4 text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white hover:text-slate-900"
          >
            {t[chatLabelKey(locale)]}
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-float"
        aria-hidden="true"
      >
        <svg
          className="h-6 w-6 text-white/70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Rombak `app/[locale]/page.tsx`**

Ganti SELURUH isi file dengan:

```tsx
import Hero from "@/components/home/Hero";
import TourCard from "@/components/TourCard";
import Reveal from "@/components/Reveal";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { getAvailability, publishedLocales } from "@/lib/availability";
import { getHome, getAbout, getGallery, getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = dict(locale);

  const [{ hero_images, featured_tours }, about, gallery, posts, availability] =
    await Promise.all([
      getHome(locale),
      getAbout(locale),
      getGallery(locale),
      getBlogPosts(locale),
      getAvailability(),
    ]);

  // Referensi dipakai task-task bagian berikutnya (WhyUs, GalleryStrip, dst.).
  void about;
  void gallery;
  void posts;
  void availability;

  return (
    <>
      <Hero locale={locale} images={hero_images} />

      {featured_tours.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal className="mb-12 flex items-center gap-4">
            <span className="h-1 w-12 rounded-full bg-accent" />
            <h2 className="text-2xl font-black uppercase tracking-tighter text-ink">
              {t.featuredTours}
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured_tours.map((tour, i) => (
              <Reveal key={tour.slug} delay={Math.min(i, 5) * 70} className="h-full">
                <TourCard tour={tour} locale={locale} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
```

> Blok *featured tours* lama sengaja dipertahankan sementara — Task 6
> menggantinya dengan `<FeaturedTours>`. `void x` menahan warning
> "unused" tanpa menghapus fetch (Task 7+ memakainya).

- [ ] **Step 4: Verifikasi tipe + build**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

Run: `NODE_ENV=production npm run build`
Expected: build sukses, folder `out/` berisi `en/index.html` dll. Bila gagal
di `next/image` karena host `hero_images`, tambahkan hostname ke
`next.config.js` `images.remotePatterns` dan ulangi.

- [ ] **Step 5: Cek visual (opsional bila jaringan ada)**

`npm run dev` → `http://localhost:3000/en/`: hero setinggi layar, gambar
berganti tiap 6 dtk dengan crossfade + zoom lambat, pill kaca + 2 tombol,
petunjuk scroll di bawah. Blok featured tours lama masih di bawahnya.

- [ ] **Step 6: Commit**

```bash
git add app/[locale]/page.tsx components/home/Hero.tsx components/home/HeroCarousel.tsx
git commit -m "feat(beranda): hero sinematik (carousel + Ken Burns) + lapisan data page.tsx"
```

---

## Task 6: `FeaturedTours`

**Files:**
- Create: `components/home/FeaturedTours.tsx`
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 3), `TourCard`, `Reveal`, `dict`, `TourList` (`lib/api`).
- Produces: `export default function FeaturedTours(props: { locale: Locale; tours: TourList[] }): JSX.Element`

- [ ] **Step 1: Buat `components/home/FeaturedTours.tsx`**

```tsx
import TourCard from "@/components/TourCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { TourList } from "@/lib/api";

export default function FeaturedTours({
  locale,
  tours,
}: {
  locale: Locale;
  tours: TourList[];
}) {
  const t = dict(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeading
        badge={t.featuredToursBadge}
        title={t.featuredTours}
        lede={t.featuredToursLede}
        action={{ href: `/${locale}/tours/`, label: t.allTours }}
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, i) => (
          <Reveal key={tour.slug} delay={Math.min(i, 5) * 70} className="h-full">
            <TourCard tour={tour} locale={locale} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Pasang di `page.tsx`**

Tambah import: `import FeaturedTours from "@/components/home/FeaturedTours";`
Hapus import `TourCard`, `Reveal`, `dict` bila tidak lagi dipakai di file (cek:
`dict` masih dipakai? setelah langkah ini tidak — hapus juga `const t = …`).
Ganti seluruh blok `{featured_tours.length > 0 && ( <section>…</section> )}`
dengan:

```tsx
      {featured_tours.length > 0 && (
        <FeaturedTours locale={locale} tours={featured_tours} />
      )}
```

- [ ] **Step 3: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error (tak ada import/variabel menganggur).

- [ ] **Step 4: Commit**

```bash
git add components/home/FeaturedTours.tsx app/[locale]/page.tsx
git commit -m "feat(beranda): bagian FeaturedTours pakai SectionHeading"
```

---

## Task 7: `WhyUs` — dari About story

**Files:**
- Create: `components/home/WhyUs.tsx`
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `RichText`, `Reveal`, `dict`, `AboutStory` (`lib/api`).
- Produces: `export default function WhyUs(props: { locale: Locale; story: AboutStory }): JSX.Element`
- Gerbang di `page.tsx`: `availability[locale].about && about.story`

- [ ] **Step 1: Buat `components/home/WhyUs.tsx`**

```tsx
import RichText from "@/components/RichText";
import Reveal from "@/components/Reveal";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { AboutStory } from "@/lib/api";

export default function WhyUs({
  locale,
  story,
}: {
  locale: Locale;
  story: AboutStory;
}) {
  const t = dict(locale);
  const stats = [
    { value: story.experience_value, label: story.experience_label },
    { value: story.travelers_value, label: story.travelers_label },
  ].filter((s) => s.value);
  const meta = [story.since_text, story.pioneering_text].filter(Boolean).join(" · ");

  return (
    <section className="bg-surface-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-28">
        <div className="lg:col-span-5">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
            {t.whyUsBadge}
          </span>
          <h2 className="mt-6 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-ink md:text-5xl">
            {story.title_lead} <span className="text-accent">{story.title_accent}</span>
          </h2>
          <RichText
            html={story.paragraph_one}
            className="mt-6 line-clamp-6 text-base font-medium leading-[1.8] text-ink-2"
          />
          {meta && (
            <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-ink-3">
              {meta}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className="rounded-[1.5rem] border border-line bg-surface p-7"
            >
              <p className="text-3xl font-black uppercase tracking-tight text-ink md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-[11px] font-black uppercase tracking-widest text-ink-3">
                {s.label}
              </p>
            </Reveal>
          ))}
          <Reveal
            delay={stats.length * 80}
            className="rounded-[1.5rem] bg-gradient-to-br from-red-600 to-red-800 p-8 text-white sm:col-span-2"
          >
            <p className="text-lg font-black uppercase leading-tight tracking-tight md:text-xl">
              {t.whyUsPitch}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

> `line-clamp-6` mungkin memotong paragraf HTML di tengah — dapat diterima
> untuk teaser; teks penuh ada di halaman About.

- [ ] **Step 2: Pasang di `page.tsx`**

Import: `import WhyUs from "@/components/home/WhyUs";`
Hapus `void about;`. Setelah blok `<FeaturedTours>` tambah:

```tsx
      {availability[locale].about && about.story && (
        <WhyUs locale={locale} story={about.story} />
      )}
```

- [ ] **Step 3: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error. (`about.story` bertipe `AboutStory | null`; narrowing
`&& about.story` membuat prop cocok.)

- [ ] **Step 4: Commit**

```bash
git add components/home/WhyUs.tsx app/[locale]/page.tsx
git commit -m "feat(beranda): bagian WhyUs dari About story (bergerbang about)"
```

---

## Task 8: `CinematicBand` — pita gelap parallax

**Files:**
- Create: `components/home/CinematicBand.tsx`
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `dict`.
- Produces: `export default function CinematicBand(props: { locale: Locale; image: string }): JSX.Element`
- Gerbang di `page.tsx`: `const bandImage = about.story?.image_url ?? hero_images[0] ?? null; … {bandImage && …}`

- [ ] **Step 1: Buat `components/home/CinematicBand.tsx`**

```tsx
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";

export default function CinematicBand({
  locale,
  image,
}: {
  locale: Locale;
  image: string;
}) {
  const t = dict(locale);

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-28 text-white lg:py-36">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center lg:bg-fixed"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/70" />
      <div className="pointer-events-none absolute -right-32 top-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-accent/15 blur-[140px]" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
          {t.bandTitle}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/80">
          {t.bandText}
        </p>
        <Link
          href={`/${locale}/tours/`}
          className="mt-9 inline-block rounded-xl bg-white px-9 py-4 text-[11px] font-black uppercase tracking-widest text-slate-900 transition-colors hover:bg-accent hover:text-white"
        >
          {t.exploreTours}
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Pasang di `page.tsx`**

Import: `import CinematicBand from "@/components/home/CinematicBand";`
Setelah fetch, tambah: `const bandImage = about.story?.image_url ?? hero_images[0] ?? null;`
Setelah blok `<WhyUs>` tambah:

```tsx
      {bandImage && <CinematicBand locale={locale} image={bandImage} />}
```

- [ ] **Step 3: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

- [ ] **Step 4: Commit**

```bash
git add components/home/CinematicBand.tsx app/[locale]/page.tsx
git commit -m "feat(beranda): pita sinematik gelap dengan parallax"
```

---

## Task 9: `GalleryStrip` — bento foto

**Files:**
- Create: `components/home/GalleryStrip.tsx`
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `dict`, `GalleryItem` (`lib/api`).
- Produces: `export default function GalleryStrip(props: { locale: Locale; items: (GalleryItem & { image_path: string })[] }): JSX.Element`
- Gerbang di `page.tsx`: `availability[locale].gallery && galleryImages.length >= 3`

- [ ] **Step 1: Buat `components/home/GalleryStrip.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { GalleryItem } from "@/lib/api";

export default function GalleryStrip({
  locale,
  items,
}: {
  locale: Locale;
  items: (GalleryItem & { image_path: string })[];
}) {
  const t = dict(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeading
        badge={t.galleryBadge}
        title={t.galleryHeading}
        action={{ href: `/${locale}/gallery/`, label: t.viewFullGallery }}
      />
      <div className="grid auto-rows-[170px] grid-cols-2 gap-4 md:auto-rows-[210px] md:grid-cols-4">
        {items.map((item, i) => (
          <Link
            key={item.id}
            href={`/${locale}/gallery/`}
            className={`group relative overflow-hidden rounded-[1.5rem] bg-surface-2 ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              src={item.image_path}
              alt={item.title}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
            {item.title && (
              <p className="absolute inset-x-0 bottom-0 line-clamp-2 p-4 text-sm font-black leading-tight text-white">
                {item.title}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Pasang di `page.tsx`**

Import: `import GalleryStrip from "@/components/home/GalleryStrip";`
Hapus `void gallery;`. Setelah fetch tambah:

```tsx
  const galleryImages = gallery.filter(
    (g): g is typeof g & { image_path: string } => Boolean(g.image_path),
  );
```

Setelah `<CinematicBand>` tambah:

```tsx
      {availability[locale].gallery && galleryImages.length >= 3 && (
        <GalleryStrip locale={locale} items={galleryImages.slice(0, 6)} />
      )}
```

- [ ] **Step 3: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error (type predicate menyempitkan `image_path` ke `string`).

- [ ] **Step 4: Commit**

```bash
git add components/home/GalleryStrip.tsx app/[locale]/page.tsx
git commit -m "feat(beranda): strip galeri bento (bergerbang gallery)"
```

---

## Task 10: `Reviews` + `ReviewScroller`

**Files:**
- Create: `components/home/ReviewScroller.tsx`
- Create: `components/home/Reviews.tsx`
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `dict`, `HOME_REVIEWS`/`GOOGLE_RATING`/`Review` (`lib/home-reviews`), `.hide-scrollbar` (Task 1), ikon `Star`/`ChevronLeft`/`ChevronRight` (`lucide-react`).
- Produces:
  ```ts
  export default function ReviewScroller(props: {
    reviews: Review[]; readMore: string; showLess: string;
  }): JSX.Element  // "use client"
  export default function Reviews(props: { locale: Locale }): JSX.Element
  ```
- Gerbang: tidak ada — selalu render.

- [ ] **Step 1: Buat `components/home/ReviewScroller.tsx`**

```tsx
"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Review } from "@/lib/home-reviews";

export default function ReviewScroller({
  reviews,
  readMore,
  showLess,
}: {
  reviews: Review[];
  readMore: string;
  showLess: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 400, behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} readMore={readMore} showLess={showLess} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous reviews"
        className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink-2 shadow-lg transition-colors hover:text-accent md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="More reviews"
        className="absolute right-0 top-1/2 hidden h-11 w-11 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink-2 shadow-lg transition-colors hover:text-accent md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function ReviewCard({
  review,
  readMore,
  showLess,
}: {
  review: Review;
  readMore: string;
  showLess: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 150;
  const shown =
    expanded || !long ? review.text : `${review.text.slice(0, 150).trimEnd()}…`;

  return (
    <article className="flex min-w-[300px] max-w-[380px] snap-start flex-col rounded-[1.5rem] border border-line bg-surface p-7 md:min-w-[360px]">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
          style={{ background: review.color }}
        >
          {review.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-ink">{review.name}</p>
          <p className="truncate text-xs text-ink-3">
            {review.location ? `${review.location} · ` : ""}
            {review.time}
          </p>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-1">
        {review.source === "tripadvisor"
          ? Array.from({ length: review.stars }).map((_, i) => (
              <span key={i} className="h-3.5 w-3.5 rounded-full bg-[#00AA6C]" />
            ))
          : Array.from({ length: review.stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
      </div>

      {review.title && (
        <p className="mb-2 font-bold leading-snug text-ink">{review.title}</p>
      )}

      <p className="flex-1 whitespace-pre-line text-sm leading-relaxed text-ink-2">
        {shown}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-sm font-bold text-accent hover:underline"
        >
          {expanded ? showLess : readMore}
        </button>
      )}

      <p className="mt-6 border-t border-line pt-4 text-[11px] font-black uppercase tracking-widest text-ink-3">
        {review.source === "tripadvisor" ? "Posted on Tripadvisor" : "Posted on Google"}
      </p>
    </article>
  );
}
```

- [ ] **Step 2: Buat `components/home/Reviews.tsx`**

```tsx
import { Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ReviewScroller from "./ReviewScroller";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { HOME_REVIEWS, GOOGLE_RATING } from "@/lib/home-reviews";

const GOOGLE_URL = "https://www.google.com/search?q=welcomemanado";
const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g297721-d34101092-Reviews-Welcome_Manado-Manado_North_Sulawesi_Sulawesi.html";

export default function Reviews({ locale }: { locale: Locale }) {
  const t = dict(locale);

  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading badge={t.reviewsBadge} title={t.reviewsHeading} />

        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-4 rounded-[1.5rem] border border-line bg-surface p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-baseline gap-0.5 text-3xl font-bold">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-4xl font-black text-ink">{GOOGLE_RATING.value}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-ink-3">
                ({GOOGLE_RATING.count} {t.reviewsRatings})
              </p>
            </div>
            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-xl border border-line px-6 py-3 text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              Google
            </a>
          </div>

          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-line bg-surface p-8 text-center transition-colors hover:border-[#00AA6C]"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-3">
              {t.reviewsBadge}
            </span>
            <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="15" fill="#00AA6C" />
              <circle cx="11" cy="16" r="4.6" fill="#fff" />
              <circle cx="21" cy="16" r="4.6" fill="#fff" />
              <circle cx="11" cy="16" r="1.9" fill="#1a1a1a" />
              <circle cx="21" cy="16" r="1.9" fill="#1a1a1a" />
            </svg>
            <span className="text-lg font-black uppercase tracking-tighter text-ink">
              Tripadvisor
            </span>
          </a>
        </div>

        <ReviewScroller
          reviews={HOME_REVIEWS}
          readMore={t.readMore}
          showLess={t.showLess}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Pasang di `page.tsx`**

Import: `import Reviews from "@/components/home/Reviews";`
Setelah blok `<GalleryStrip>` tambah:

```tsx
      <Reviews locale={locale} />
```

- [ ] **Step 4: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

- [ ] **Step 5: Commit**

```bash
git add components/home/Reviews.tsx components/home/ReviewScroller.tsx app/[locale]/page.tsx
git commit -m "feat(beranda): bagian ulasan Google + TripAdvisor dengan scroller"
```

---

## Task 11: `JournalTeaser`

**Files:**
- Create: `components/home/JournalTeaser.tsx`
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading`, `Reveal`, `dict`, `HREFLANG`/`Locale` (`lib/locales`), `BlogList` (`lib/api`).
- Produces: `export default function JournalTeaser(props: { locale: Locale; posts: BlogList[] }): JSX.Element`
- Gerbang: `availability[locale].blog && posts.length > 0`

- [ ] **Step 1: Buat `components/home/JournalTeaser.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { dict } from "@/lib/dictionary";
import { HREFLANG, type Locale } from "@/lib/locales";
import type { BlogList } from "@/lib/api";

function formatDate(iso: string | null, locale: Locale): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(HREFLANG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export default function JournalTeaser({
  locale,
  posts,
}: {
  locale: Locale;
  posts: BlogList[];
}) {
  const t = dict(locale);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <SectionHeading
        badge={t.journalBadge}
        title={t.blogHeading}
        action={{ href: `/${locale}/blog/`, label: t.viewAllArticles }}
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={Math.min(i, 3) * 70} className="h-full">
            <Link
              href={`/${locale}/blog/${post.slug}/`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                {post.featured_image && (
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {post.category && (
                  <span className="absolute left-4 top-4 rounded-lg bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    {post.category.name}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                {post.published_at && (
                  <p className="text-[11px] font-black uppercase tracking-widest text-ink-3">
                    {formatDate(post.published_at, locale)}
                  </p>
                )}
                <h3 className="mt-2 line-clamp-2 text-lg font-black uppercase leading-tight tracking-tight text-ink">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-ink-2">
                    {post.excerpt}
                  </p>
                )}
                <span className="mt-auto pt-6 text-[11px] font-black uppercase tracking-widest text-accent">
                  {t.readMore} →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Pasang di `page.tsx`**

Import: `import JournalTeaser from "@/components/home/JournalTeaser";`
Hapus `void posts;`. Setelah `<Reviews>` tambah:

```tsx
      {availability[locale].blog && posts.length > 0 && (
        <JournalTeaser locale={locale} posts={posts.slice(0, 3)} />
      )}
```

- [ ] **Step 3: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

- [ ] **Step 4: Commit**

```bash
git add components/home/JournalTeaser.tsx app/[locale]/page.tsx
git commit -m "feat(beranda): teaser jurnal (bergerbang blog)"
```

---

## Task 12: `HomeCta` + verifikasi beranda penuh

**Files:**
- Create: `components/home/HomeCta.tsx`
- Modify: `app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `dict`, `chatHref`/`chatLabelKey` (`lib/contact`), ikon `MessageCircle`/`Palmtree`/`Compass` (`lucide-react`).
- Produces: `export default function HomeCta(props: { locale: Locale }): JSX.Element`
- Gerbang: tidak ada — selalu render (bagian terakhir).

- [ ] **Step 1: Buat `components/home/HomeCta.tsx`**

```tsx
import Link from "next/link";
import { Compass, MessageCircle, Palmtree } from "lucide-react";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { chatHref, chatLabelKey } from "@/lib/contact";

export default function HomeCta({ locale }: { locale: Locale }) {
  const t = dict(locale);

  return (
    <section className="px-6 pb-24 pt-10 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-accent p-12 text-center text-white md:rounded-[3rem] lg:p-20">
        <div className="relative z-10">
          <h2 className="text-3xl font-black uppercase leading-tight tracking-tighter md:text-5xl">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg">
            {t.ctaText}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/contact/`}
              className="rounded-xl bg-white px-9 py-4 text-[11px] font-black uppercase tracking-widest text-accent transition-colors hover:bg-slate-900 hover:text-white"
            >
              {t.navContact}
            </Link>
            <a
              href={chatHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-9 py-4 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:bg-red-800"
            >
              <MessageCircle className="h-4 w-4" />
              {t[chatLabelKey(locale)]}
            </a>
          </div>
        </div>
        <Palmtree
          className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rotate-12 text-white/10"
          aria-hidden="true"
        />
        <Compass
          className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 -rotate-12 text-white/5"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Pasang di `page.tsx` + rapikan**

Import: `import HomeCta from "@/components/home/HomeCta";`
Hapus `void availability;` (sekarang dipakai gerbang). Setelah `<JournalTeaser>` tambah:

```tsx
      <HomeCta locale={locale} />
```

`page.tsx` final harus tampak seperti:

```tsx
import Hero from "@/components/home/Hero";
import FeaturedTours from "@/components/home/FeaturedTours";
import WhyUs from "@/components/home/WhyUs";
import CinematicBand from "@/components/home/CinematicBand";
import GalleryStrip from "@/components/home/GalleryStrip";
import Reviews from "@/components/home/Reviews";
import JournalTeaser from "@/components/home/JournalTeaser";
import HomeCta from "@/components/home/HomeCta";
import type { Locale } from "@/lib/locales";
import { getAvailability, publishedLocales } from "@/lib/availability";
import { getHome, getAbout, getGallery, getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  return (await publishedLocales()).map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  const [{ hero_images, featured_tours }, about, gallery, posts, availability] =
    await Promise.all([
      getHome(locale),
      getAbout(locale),
      getGallery(locale),
      getBlogPosts(locale),
      getAvailability(),
    ]);

  const a = availability[locale];
  const galleryImages = gallery.filter(
    (g): g is typeof g & { image_path: string } => Boolean(g.image_path),
  );
  const bandImage = about.story?.image_url ?? hero_images[0] ?? null;

  return (
    <>
      <Hero locale={locale} images={hero_images} />
      {featured_tours.length > 0 && (
        <FeaturedTours locale={locale} tours={featured_tours} />
      )}
      {a.about && about.story && <WhyUs locale={locale} story={about.story} />}
      {bandImage && <CinematicBand locale={locale} image={bandImage} />}
      {a.gallery && galleryImages.length >= 3 && (
        <GalleryStrip locale={locale} items={galleryImages.slice(0, 6)} />
      )}
      <Reviews locale={locale} />
      {a.blog && posts.length > 0 && (
        <JournalTeaser locale={locale} posts={posts.slice(0, 3)} />
      )}
      <HomeCta locale={locale} />
    </>
  );
}
```

- [ ] **Step 3: Verifikasi tipe + build penuh**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

Run: `NODE_ENV=production npm run build`
Expected: build sukses untuk semua `publishedLocales()`. Tidak ada error
`generateStaticParams` / gambar / `remotePatterns`.

- [ ] **Step 4: Cek visual manual (pengguna)**

`npm run dev`, lalu:
- `http://localhost:3000/en/` — 8 bagian tampil urut: Hero → FeaturedTours →
  WhyUs → CinematicBand → GalleryStrip → Reviews → JournalTeaser → HomeCta.
  Toggle tema di header: tiap bagian ikut gelap/terang dengan benar (kecuali
  Hero & CinematicBand yang memang selalu gelap).
- `http://localhost:3000/fr/` — WhyUs, GalleryStrip, JournalTeaser HILANG
  (fr tak punya about/gallery/blog); Hero, FeaturedTours, CinematicBand,
  Reviews, HomeCta tetap ada, tanpa bagian kosong / heading menggantung.
- `http://localhost:3000/ko/` atau `/zh/` — judul `tracking-tighter` tidak
  merusak tata letak di skrip non-Latin.
- DevTools → Rendering → "Emulate prefers-reduced-motion: reduce" → reload
  `/en/` — carousel diam di gambar 1, tidak ada zoom/float/ping.
- `ReviewScroller`: panah kiri/kanan menggeser baris; "Read more"/"Show less"
  membuka/menutup teks.

- [ ] **Step 5: Commit**

```bash
git add components/home/HomeCta.tsx app/[locale]/page.tsx
git commit -m "feat(beranda): panel CTA + rangkai 8 bagian beranda"
```

---

## Task 13: Fase 2 — poles `TourCard`

**Files:**
- Modify: `components/TourCard.tsx` (ganti isi)

**Interfaces:**
- Consumes: ikon `Clock`/`MapPin` (`lucide-react`), `excerptFromHtml` (`lib/format`), `dict`, `TourList`.
- Produces: `TourCard` — **props tidak berubah** (`{ tour: TourList; locale: Locale }`). Dipakai oleh `FeaturedTours` (Task 6) & `app/[locale]/tours/page.tsx`.

- [ ] **Step 1: Ganti isi `components/TourCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import type { TourList } from "@/lib/api";
import { excerptFromHtml } from "@/lib/format";

export default function TourCard({ tour, locale }: { tour: TourList; locale: Locale }) {
  const t = dict(locale);
  const duration =
    tour.duration_nights > 0
      ? `${tour.duration_days} ${t.days} / ${tour.duration_nights} ${t.nights}`
      : `${tour.duration_days} ${t.days}`;

  return (
    <Link
      href={`/${locale}/tours/${tour.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-red-900/10 dark:hover:shadow-black/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        {tour.cover_image && (
          <Image
            src={tour.cover_image}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {(tour.featured_badge || tour.category) && (
          <span className="absolute left-5 top-5 rounded-lg bg-accent px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {tour.featured_badge || tour.category?.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl font-black uppercase leading-tight tracking-tighter text-ink">
          {tour.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-black uppercase tracking-widest text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {tour.location}
          </span>
        </div>
        <p className="mt-4 line-clamp-3 text-sm font-medium leading-relaxed text-ink-2">
          {excerptFromHtml(tour.description)}
        </p>
        <span className="mt-auto pt-7 text-[11px] font-black uppercase tracking-widest text-accent">
          {t.viewDetails} →
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

Cek visual: `npm run dev` → `/en/` (grid FeaturedTours) & `/en/tours/` — kartu
punya pill kategori di pojok gambar, baris ikon durasi·lokasi, hover angkat +
gambar zoom.

- [ ] **Step 3: Commit**

```bash
git add components/TourCard.tsx
git commit -m "feat(beranda): poles TourCard — pill kategori overlay, baris ikon, hover"
```

---

## Task 14: Fase 2 — retrofit `SectionHeading` ke `tours/` & `about/`

**Files:**
- Modify: `app/[locale]/tours/page.tsx`
- Modify: `app/[locale]/about/page.tsx` (hanya blok heading tim)

**Interfaces:**
- Consumes: `SectionHeading` (Task 3).
- Produces: — (tak ada API baru; hanya menyeragamkan markup)

- [ ] **Step 1: `tours/page.tsx` — pakai `<SectionHeading>`**

Tambah import: `import SectionHeading from "@/components/SectionHeading";`
Ganti blok:

```tsx
      <div className="mb-12 flex items-center gap-4">
        <span className="h-1 w-12 rounded-full bg-accent" />
        <h1 className="text-3xl font-black uppercase tracking-tighter text-ink">{t.allTours}</h1>
      </div>
```

dengan:

```tsx
      <SectionHeading badge={t.featuredToursBadge} title={t.allTours} headingLevel={1} />
```

- [ ] **Step 2: `about/page.tsx` — heading tim pakai `<SectionHeading>`**

Tambah import: `import SectionHeading from "@/components/SectionHeading";`
Ganti blok:

```tsx
          <div className="mb-10 flex items-center gap-4">
            <span className="h-1 w-12 rounded-full bg-accent" />
            <h2 className="text-2xl font-black uppercase tracking-tighter text-ink">{t.teamHeading}</h2>
          </div>
```

dengan:

```tsx
          <SectionHeading title={t.teamHeading} />
```

> Heading utama halaman About (`story.title_lead` + `title_accent`) SENGAJA
> dibiarkan — itu perlakuan hero tersendiri (ukuran `md:text-6xl`, tanpa
> badge), bukan judul bagian.

- [ ] **Step 3: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

Cek visual: `/en/tours/` (judul H1 dengan garis aksen) & `/en/about/` (heading
tim seragam dengan beranda). Pastikan `t` masih dipakai di kedua file (kalau
tidak — hapus `const t = dict(...)` yang menganggur; `tours/page.tsx` masih
pakai `t.allTours` lewat prop, jadi tetap perlu).

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/tours/page.tsx app/[locale]/about/page.tsx
git commit -m "refactor(beranda): tours & about pakai SectionHeading bersama"
```

---

## Task 15: Fase 2 — perluas `Footer`

**Files:**
- Modify: `components/Footer.tsx` (ganti isi; jadi `async`)

**Interfaces:**
- Consumes: `getAvailability` (`lib/availability`), `chatHref`/`chatLabelKey` (`lib/contact`), `dict`.
- Produces: `Footer` — props tidak berubah (`{ locale: Locale }`), sekarang `async`. `layout.tsx` sudah `await`-ready (dipakai di server component tree; `<Footer locale={locale} />` di JSX server component menerima Promise—Next 14 mendukung async server component sebagai anak).

> Catatan: `layout.tsx` merender `<Footer locale={locale} />` langsung. Async
> server component sebagai child di RSC didukung — tidak perlu ubah `layout.tsx`.

- [ ] **Step 1: Ganti isi `components/Footer.tsx`**

```tsx
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { getAvailability } from "@/lib/availability";
import { chatHref, chatLabelKey } from "@/lib/contact";

export default async function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const a = (await getAvailability())[locale];

  const nav = [
    { href: `/${locale}/tours/`, label: t.allTours, show: true },
    { href: `/${locale}/hotels/`, label: t.navHotels, show: a.hotels },
    { href: `/${locale}/gallery/`, label: t.navGallery, show: a.gallery },
    { href: `/${locale}/blog/`, label: t.navBlog, show: a.blog },
    { href: `/${locale}/about/`, label: t.navAbout, show: a.about },
    { href: `/${locale}/contact/`, label: t.navContact, show: true },
  ].filter((i) => i.show);

  return (
    <footer className="mt-32 border-t border-line bg-surface-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.6fr_1fr_1fr] lg:px-10">
        <div>
          <p className="text-xl font-black uppercase tracking-tighter text-ink">
            manado<span className="text-accent">.tours</span>
          </p>
          <p className="mt-3 max-w-xs text-sm font-medium text-ink-2">{t.tagline}</p>
          <a
            href="https://welcomemanado.com"
            className="mt-6 inline-block text-[11px] font-black uppercase tracking-widest text-ink-3 transition-colors hover:text-accent"
          >
            {t.partOf} →
          </a>
        </div>

        <nav className="flex flex-col gap-3">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:text-accent"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <a
            href={chatHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:text-accent"
          >
            {t[chatLabelKey(locale)]} →
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-6 py-6 text-[11px] font-black uppercase tracking-widest text-ink-3 lg:px-10">
          © {new Date().getFullYear()} Welcome Manado
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verifikasi tipe + build**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

Run: `NODE_ENV=production npm run build`
Expected: build sukses. (`Footer` async di setiap halaman — pastikan tidak ada
regresi.)

Cek visual: footer di halaman mana pun — 3 kolom, kolom nav menyesuaikan
bahasa (di `/fr/` hanya Tours + Contact), tautan WhatsApp, baris copyright.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat(beranda): footer penuh — kolom nav bergerbang + kontak + copyright"
```

---

## Task 16 (OPSIONAL): Fase 2 — header transparan di atas hero

> Kerjakan HANYA bila Task 1–15 selesai mulus dan masih ada waktu. Tidak wajib.
> Bila dilewati, hentikan setelah Task 15.

**Files:**
- Create: `components/HeaderShell.tsx`
- Modify: `components/Header.tsx`
- Modify: `app/globals.css` (aturan `header[data-transparent]`)

**Interfaces:**
- Consumes: `usePathname` (`next/navigation`).
- Produces: `export default function HeaderShell(props: { locale: string; children: ReactNode }): JSX.Element` — `"use client"`. Membungkus isi `<header>` lama; menyetel `data-transparent` saat di beranda & belum scroll.

- [ ] **Step 1: Buat `components/HeaderShell.tsx`**

```tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Membungkus isi header. Di beranda ({locale} atau {locale}/) dan sebelum
 * pengguna scroll, header transparan di atas hero gelap; setelah scroll —
 * atau di halaman lain — kembali solid (surface + blur).
 */
export default function HeaderShell({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const transparent = onHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-transparent={transparent || undefined}
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-surface/80 backdrop-blur-md"
      }`}
    >
      {children}
    </header>
  );
}
```

- [ ] **Step 2: Ubah `components/Header.tsx`**

Ganti elemen `<header …>` terluar dengan `<HeaderShell locale={locale}>` dan
`</header>` dengan `</HeaderShell>`. Tambah import
`import HeaderShell from "./HeaderShell";`. Pada brand & link nav, tambah kelas
penanda supaya CSS bisa memutihkannya saat transparan:
- `<span className="… text-ink brand-mark">` pada brand `manado`
- `className="… text-ink-2 … nav-link"` pada tiap `<Link>` nav

(Isi `<div className="mx-auto flex max-w-7xl …">` dan seterusnya tetap sama.)

- [ ] **Step 3: Tambah aturan di `app/globals.css`**

Setelah `.hide-scrollbar` (Task 1), tambah:

```css
/* Header transparan di atas hero: putihkan teks & kontrol. */
header[data-transparent] .brand-mark,
header[data-transparent] .nav-link {
  color: #fff;
}
header[data-transparent] .nav-link:hover {
  color: rgb(var(--accent));
}
```

- [ ] **Step 4: Verifikasi**

Run: `npx tsc --noEmit`
Expected: tidak ada error.

Run: `NODE_ENV=production npm run build`
Expected: build sukses.

Cek visual: `/en/` — header transparan menumpuk di atas hero, teks putih;
scroll ke bawah → header jadi solid `surface` + blur + garis. Di `/en/tours/`
header selalu solid. Toggle tema tetap jalan.

- [ ] **Step 5: Commit**

```bash
git add components/HeaderShell.tsx components/Header.tsx app/globals.css
git commit -m "feat(beranda): header transparan di atas hero, solid setelah scroll"
```

---

## Self-Review (dijalankan penulis plan — sudah lolos)

**1. Spec coverage:**
- Hero sinematik (carousel + Ken Burns + blob + pill + scroll cue) → Task 5 ✓
- FeaturedTours + SectionHeading + tombol All Tours → Task 6 ✓
- WhyUs dari About story (stats + kartu aksen), bergerbang about → Task 7 ✓
- CinematicBand gelap + parallax, gerbang gambar → Task 8 ✓
- GalleryStrip bento, bergerbang gallery + ≥3 → Task 9 ✓
- Reviews (kartu Google + TA + scroller), ulasan diport → Task 4 + Task 10 ✓
- JournalTeaser, bergerbang blog → Task 11 ✓
- HomeCta panel → Task 12 ✓
- SectionHeading bersama + retrofit tours/about → Task 3 + Task 14 ✓
- ~18 kunci i18n × 8 bahasa → Task 2 ✓
- keyframes ken-burns/float + .hide-scrollbar → Task 1 ✓
- TourCard poles → Task 13 ✓
- Footer penuh → Task 15 ✓
- Header scroll-aware (opsional) → Task 16 ✓
- Verifikasi build semua locale + reduced-motion + gerbang /fr/ → Task 12 Step 3–4 ✓
- Tidak ada endpoint/skrip pihak ketiga, rating hardcoded → Task 4 ✓ / Task 10 (tak ada `<script>`) ✓

**2. Placeholder scan:** tidak ada "TBD/TODO/nanti"; semua langkah kode berisi kode utuh. Data ulasan lengkap di Task 4. Terjemahan lengkap 8 bahasa di Task 2.

**3. Type consistency:**
- `Review` didefinisikan Task 4, dipakai identik Task 10 (`reviews: Review[]`).
- `SectionHeading` props (`badge?`, `title`, `accent?`, `lede?`, `action?`, `tone?`, `headingLevel?`) — dipakai konsisten di Task 6/9/10/11/14.
- `HeroCarousel({ images: string[] })` Task 5 — dipanggil `<HeroCarousel images={images} />` di `Hero` Task 5. ✓
- `page.tsx` `a = availability[locale]` diperkenalkan final di Task 12; task antara (7/9/11) menulis `availability[locale].x` langsung — konsisten (Task 12 Step 2 merapikan ke `a.x`). ✓
- `galleryImages` type predicate menghasilkan `(GalleryItem & { image_path: string })[]` = prop `GalleryStrip.items`. ✓
- `GOOGLE_RATING` `{ value: string; count: number }` — dipakai `.value` / `.count` di Task 10. ✓

## Execution Handoff

Plan lengkap & tersimpan di `docs/superpowers/plans/2026-08-31-beranda-sinematik.md`.
