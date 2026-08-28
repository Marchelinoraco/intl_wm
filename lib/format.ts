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
