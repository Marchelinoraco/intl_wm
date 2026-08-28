# manado.tours — situs pasar internasional

Frontend terpisah untuk pasar internasional Welcome Manado. Menjual paket wisata
Manado dan Sulawesi Utara kepada turis asing dalam delapan bahasa.

`welcomemanado.com` tidak berubah perannya: tetap melayani pasar Indonesia dengan
katalog lokal, nasional, dan internasional.

## Teknologi

Next.js 14 (App Router) dengan `output: "export"`, React 18, Tailwind 3, TypeScript —
mengikuti tumpukan `transport_wm` yang sudah berjalan.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka **`http://localhost:3000/en/`** — bukan `/`. Root `/` ditangani nginx di
production lewat redirect 302 berdasarkan `Accept-Language`; static export tidak
menjalankan middleware Next.js, jadi tidak ada halaman di root saat pengembangan.

## Build

```bash
npm run build
```

Menghasilkan folder `out/` berisi HTML statis murni — setara `dist/` pada
`client_wm`, dilayani nginx tanpa Node.js di belakangnya. `out/` memuat kedelapan
bahasa (`en` `ko` `zh` `fr` `de` `it` `es` `nl`): beranda + tours + contact untuk
semua, plus hotels/gallery/blog/about hanya untuk bahasa yang kontennya sudah ada
(`en` `ko` `zh`).

Konfigurasi nginx perlu `try_files $uri $uri/ $uri.html /404.html` karena keluarannya
berbentuk `tours/index.html`, bukan satu `index.html` seperti SPA.

Prosedur rilis lengkap (build → `rsync out/` → nginx → verifikasi) ada di
[`deploy/README.md`](deploy/README.md).

## Verifikasi kontrak API

`npm run check-api` memanggil `/api/intl/*` production dan memeriksa bentuk
respons masih sesuai asumsi `lib/api.ts`. Otomatis jalan sebelum `npm run build`.

## Bahasa

Delapan bahasa sasaran: `en` `ko` `zh` `fr` `de` `it` `es` `nl`. Bahasa Indonesia
sengaja tidak dilayani di domain ini.

`PUBLISHED_LOCALES` di `lib/locales.ts` menentukan bahasa mana yang dibangun. Bahasa
yang belum punya konten tidak menghasilkan halaman, tidak muncul di sitemap maupun
`hreflang`, dan tidak tampil di pengalih bahasa.

## Status: KERANGKA

Data masih contoh di `lib/sample-data.ts` dan **akan dibuang**. Penggantinya adalah
pengambilan data saat build dari `/api/intl/*` di `api_wm`, yang bentuk responsnya
sudah sengaja dicocokkan dengan tipe di berkas itu.

Belum ada: hotel, travel-info, galeri, blog, profil, formulir pemesanan, sitemap,
structured data, dan hreflang silang-domain ke `welcomemanado.com`.

## Dokumen

- Spec: `client_wm/docs/superpowers/specs/2026-08-17-manado-tours-intl-site-design.md`
- Rencana backend: `client_wm/docs/superpowers/plans/2026-08-17-manado-tours-backend.md`
