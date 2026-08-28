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
