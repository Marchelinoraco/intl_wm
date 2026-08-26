# Deploy manado.tours di aaPanel

Panduan ini menggantikan `README.md` kalau server Anda memakai aaPanel.
Repo sudah di-clone ke `/www/wwwroot/intl_wm`.

---

## 1. Pindahkan DNS dari parkir Hostinger ke VPS

Per 2026-08-26, `manado.tours` masih mengarah ke `2.57.91.91` — halaman parkir
Hostinger. VPS Anda ada di `103.172.205.136`. Selama ini belum diubah, apa pun
yang dipasang di aaPanel tidak akan terlihat.

Di **hPanel Hostinger → Domains → manado.tours → DNS/Nameserver**.

Keadaan awal (diperiksa 2026-08-26) hanya dua record:

| Jenis | Nama | Konten | TTL |
|---|---|---|---|
| CNAME | `www` | `manado.tours` | 300 |
| A | `@` | `2.57.91.91` | 50 |

**Cukup satu yang diubah.** Klik ikon pensil di baris A `@`, ganti Value dari
`2.57.91.91` menjadi `103.172.205.136`.

**TTL harus diisi 60**, bukan dibiarkan 50. Record lamanya memang tersimpan
dengan TTL 50, tetapi form edit hPanel menolak nilai di bawah 60 ("Value TTL
harus di antara 60 dan 86400"). 60 adalah minimum yang diizinkan, jadi
penyebarannya tetap secepat mungkin.

**Biarkan CNAME `www`.** Ia menunjuk ke apex, jadi otomatis ikut ke IP baru
begitu A record diubah. Tidak perlu dibuatkan A record sendiri.

**Jangan tekan "Reset DNS record".** Tombol itu mengembalikan seluruh record ke
bawaan Hostinger, termasuk record parkir yang justru sedang kita singkirkan.

Tunggu sampai perubahan menyebar sebelum lanjut ke SSL. Periksa dari laptop:

```bash
dig +short manado.tours
# harus mengembalikan 103.172.205.136
```

TTL 300 detik berarti biasanya beberapa menit, bukan berjam-jam.

---

## 2. Buat site di aaPanel

**Website → Add site**

| Kolom | Isi |
|---|---|
| Domain name | `manado.tours` dan `www.manado.tours` (satu per baris) |
| Root directory | **`/www/wwwroot/intl_wm/coming-soon`** |
| FTP | Tidak perlu |
| Database | Tidak perlu |
| PHP version | Static / Pure static |

### Root directory-nya WAJIB `coming-soon`, bukan `intl_wm`

Ini bagian yang paling mudah keliru dan akibatnya nyata. Kalau root diarahkan
ke `/www/wwwroot/intl_wm`, maka yang ikut terbuka ke publik adalah:

- `https://manado.tours/.git/` — seluruh riwayat repo bisa diunduh orang
- `https://manado.tours/deploy/AAPANEL.md` — berisi IP VPS dan tata letak server Anda
- `https://manado.tours/README.md`

Reponya memang publik, jadi kodenya bukan rahasia — tetapi membocorkan `.git`
dan catatan server tetap membuka permukaan serangan yang tidak perlu.

Dengan root di `coming-soon`, yang tersaji hanya `index.html`, `logo.png`,
`favicon-48x48.png`, dan `robots.txt`. Tidak ada yang lain.

### Setelah site dibuat

aaPanel kadang menaruh `index.html` bawaannya sendiri di root directory.
**Periksa halaman Anda tidak tertimpa:**

```bash
head -5 /www/wwwroot/intl_wm/coming-soon/index.html
# harus memuat <title>Manado Tours — Coming Soon | Welcome Manado</title>
```

Kalau tertimpa, pulihkan dengan `cd /www/wwwroot/intl_wm && git checkout -- coming-soon/`.

Lalu betulkan kepemilikan berkas:

```bash
chown -R www:www /www/wwwroot/intl_wm
```

---

## 3. Sajikan satu halaman untuk semua path

Supaya `/en/tours/` dan path lain tidak berujung 404 selama masa tunggu.

**Website → manado.tours → Config** (editor konfigurasi nginx site),
cari blok `location /` lalu jadikan:

```nginx
location / {
    try_files $uri /index.html;
}
```

Simpan. aaPanel memuat ulang nginx sendiri. Kalau tombol simpan menolak,
berarti ada salah ketik — pesan errornya muncul di layar.

---

## 4. SSL

**Website → manado.tours → SSL → Let's Encrypt**

Centang `manado.tours` dan `www.manado.tours`, ajukan. Setelah terbit,
aktifkan **Force HTTPS**.

Ini hanya berhasil kalau langkah 1 sudah menyebar — Let's Encrypt memvalidasi
dengan mengakses domainnya, dan kalau masih mengarah ke Hostinger, validasinya
gagal.

---

## 5. Verifikasi

Dari laptop, bukan dari server:

```bash
dig +short manado.tours                      # 103.172.205.136
curl -sI https://manado.tours/ | head -3     # 200
curl -s https://manado.tours/ | grep -o "<title>.*</title>"
curl -sI https://manado.tours/en/tours/ | head -1   # 200, bukan 404
curl -s https://manado.tours/robots.txt

# Ini HARUS gagal — kalau berhasil, root directory salah
curl -sI https://manado.tours/.git/config | head -1   # harapkan 404
```

Terakhir, kirim `https://manado.tours` ke diri sendiri lewat WhatsApp. Judul,
deskripsi, dan logo harus muncul di preview — itu membuktikan meta tag-nya
terbaca crawler, yang justru jadi alasan halaman ini dibuat rapi sejak awal.

---

## 6. Memperbarui halaman nanti

```bash
cd /www/wwwroot/intl_wm && git pull
```

Tidak perlu menyalin apa pun; nginx menyajikan langsung dari folder repo.

---

## Saat situs sungguhan siap terbit

**Jangan** mengarahkan root ke `out/` hasil build sekarang — isinya paket tour
fiktif dengan harga karangan dan foto stok. Baru setelah situsnya tersambung ke
`/api/intl/*` dan diisi konten sungguhan:

1. Ubah Root directory site jadi folder build situs sungguhan
2. Ganti `location /` jadi `try_files $uri $uri/ $uri.html /404.html;` — static
   export menghasilkan `en/tours/index.html`, bukan satu index.html seperti SPA
3. Tambahkan pengalihan bahasa di root (lihat catatan di `nginx-manado-tours.conf`)
4. Daftarkan sitemap di Google Search Console
