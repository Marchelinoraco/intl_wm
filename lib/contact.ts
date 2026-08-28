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
