import type { Locale } from "./locales";

/**
 * Satu-satunya sumber data kontak perusahaan. Nilainya dicerminkan dari
 * client_wm (welcomemanado.com) supaya kedua situs tak pernah berbeda: kalau
 * pemilik ganti nomor atau surel, ubah DI SINI saja, lalu samakan di sana.
 *
 * Isinya sengaja data murni — tanpa kelas Tailwind. Warna dan ukuran tinggal
 * di komponen, karena `lib/` tidak dipindai oleh `content` di tailwind.config.
 */

/** Kanal kontak per bahasa. KakaoTalk (ko) & WeChat (zh) belum punya channel
 * resmi — untuk rilis pertama semuanya memakai tautan WhatsApp yang sama.
 * Begitu pemilik memberi channel sungguhan, ganti nilai DI SINI saja. */
const WHATSAPP = "6282173738822";

/** Alamat kantor, sama persis dengan `common.officeAddress` di client_wm. */
export const OFFICE_ADDRESS =
  "Grha Merdeka – Jl. AA. Maramis No. 17, Kairagi Dua, Manado – Indonesia";

/** Pin Google Maps kantor — tujuan tautan alamat di footer & halaman kontak. */
export const MAPS_URL = "https://maps.app.goo.gl/sSe6ReKHVfowT2xs9";

/** Telepon: bentuk baca untuk mata, bentuk `tel:` untuk perangkat. */
export const PHONE_DISPLAY = "+62 821-7373-8822";
export const PHONE_TEL = "+6282173738822";

/** Dua surel resmi, urutannya mengikuti footer welcomemanado.com. */
export const EMAILS = ["info@welcomemanado.com", "tour.welcomemanado@gmail.com"] as const;

/** Kartu WeChat: pemindaian QR, atau tambah manual lewat ID. */
export const WECHAT = { id: "WelcomeManado", qr: "/wechat-qr.png" } as const;

/**
 * Kartu KakaoTalk. Surelnya memang berbeda dari `EMAILS` di atas — di
 * welcomemanado.com pun begitu (`tour2.` di kartu Kakao, `tour.` di footer).
 * Disalin apa adanya; jangan "dirapikan" tanpa konfirmasi pemilik.
 */
export const KAKAO = {
  id: "Welcome Manado",
  phone: "+62-821-7373-8822",
  email: "tour2.welcomemanado@gmail.com",
  qr: "/kakao-qr.png",
} as const;

/** Akun sosial yang berupa tautan biasa. WeChat & KakaoTalk tidak di sini:
 * keduanya membuka kartu QR, bukan menuju ke luar. */
export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://instagram.com/welcomemanadotours",
  },
  {
    name: "TikTok",
    icon: "tiktok",
    href: "https://www.tiktok.com/@welcomemanadotours?_r=1&_t=ZS-9650ww50qye",
  },
  {
    name: "Facebook",
    icon: "facebook",
    href: "https://web.facebook.com/welcomemanadowisata/?_rdc=1&_rdr#",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    href: `https://wa.me/${WHATSAPP}`,
  },
] as const;

/**
 * Asosiasi tempat perusahaan terdaftar — pita "Member Of" di footer. Logonya
 * disimpan lokal (termasuk ASITA, yang di client_wm masih menumpang server
 * asita.id) supaya ekspor statis ini tidak bergantung pada server pihak lain.
 */
export const MEMBERSHIPS = [
  { name: "IINTOA", href: "https://www.iintoa.org/", src: "/members/intoa.jpeg" },
  { name: "ASITA", href: "https://asita.id/", src: "/members/asita.png" },
  { name: "ASTINDO", href: "https://astindo.org/", src: "/members/astindo.jpeg" },
] as const;

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
