# Deploy manado.tours — tahap coming soon

Yang di-deploy pada tahap ini **hanya** isi folder `coming-soon/`: satu halaman
statis, logo, favicon, dan robots.txt.

## Yang TIDAK boleh ikut ter-deploy

Folder `out/` hasil `npm run build` berisi **kerangka dengan data contoh** —
paket tour fiktif beserta harga karangan dan foto stok. Itu belum boleh publik.
Jangan mengunggah `out/` sampai situsnya benar-benar tersambung ke `/api/intl/*`
dan diisi konten sungguhan.

## Langkah di VPS

Ada dua cara mengirim berkasnya. Pilih salah satu.

### Cara A — clone dari GitHub (disarankan)

Sama polanya dengan cara Anda men-deploy erp_wm: repo ada di server, pembaruan
cukup `git pull`. Di VPS:

```bash
sudo mkdir -p /srv && cd /srv
sudo git clone -b feat/coming-soon https://github.com/Marchelinoraco/intl_wm.git
sudo ln -s /srv/intl_wm/coming-soon /var/www/manado.tours
```

`ln -s` membuat nginx menyajikan langsung dari folder repo, sehingga pembaruan
berikutnya cukup:

```bash
cd /srv/intl_wm && sudo git pull
```

Tidak ada langkah salin, tidak ada risiko folder di server menyimpang dari repo.

### Cara B — rsync dari mesin lokal

```bash
rsync -avz --delete coming-soon/ user@VPS:/var/www/manado.tours/
```

Lebih cepat untuk sekali jalan, tapi isi server jadi salinan lepas yang tidak
tercatat di git.

### Selanjutnya, di VPS (berlaku untuk kedua cara):

```bash
# 2. Kepemilikan berkas (untuk Cara A, arahkan ke /srv/intl_wm)
sudo chown -R www-data:www-data /var/www/manado.tours

# 3. Pasang konfigurasi nginx
sudo cp nginx-manado-tours.conf /etc/nginx/sites-available/manado.tours
sudo ln -s /etc/nginx/sites-available/manado.tours /etc/nginx/sites-enabled/
sudo nginx -t          # wajib lolos sebelum lanjut
sudo systemctl reload nginx

# 4. Sertifikat HTTPS
sudo certbot --nginx -d manado.tours -d www.manado.tours
```

## DNS

Arahkan `manado.tours` dan `www.manado.tours` ke IP VPS dengan A record.

Kalau Cloudflare sudah dipakai (sesuai spec bagian 9), tambahkan domainnya ke
Cloudflare lebih dulu, arahkan nameserver di registrar, lalu buat A record di
Cloudflare dengan proxy **aktif**. Jalankan `certbot` **setelah** DNS menyebar —
kalau tidak, validasinya gagal.

## Verifikasi setelah deploy

```bash
curl -I https://manado.tours/                    # 200, content-type text/html
curl -s https://manado.tours/ | grep -o "<title>.*</title>"
curl -I https://manado.tours/en/tours/           # 200 juga — tidak ada dead end
curl -s https://manado.tours/robots.txt
```

Periksa juga preview tautannya dengan mengirim `https://manado.tours` ke diri
sendiri lewat WhatsApp — judul, deskripsi, dan logo harus muncul. Itu sekaligus
membuktikan meta tag-nya terbaca crawler.

## Saat situs sungguhan siap terbit

1. Ganti blok `location /` di konfigurasi nginx dengan versi yang ada di bagian
   bawah `nginx-manado-tours.conf`
2. Arahkan symlink ke folder build situs sungguhan, atau `rsync` folder `out/`
   menggantikan isi `/var/www/manado.tours/`
3. Daftarkan sitemap di Google Search Console

Header `Cache-Control: no-cache` pada HTML dipasang justru untuk momen ini —
pengunjung yang pernah membuka halaman coming soon langsung melihat situs baru,
tanpa menunggu cache peramban kedaluwarsa.
