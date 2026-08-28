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

const HTML_ENTITY: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

/** Teks polos singkat dari HTML untuk ringkasan kartu — buang tag & entity, potong. */
export function excerptFromHtml(html: string, max = 140): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    // Decode entity umum dulu (mis. `&amp;` → `&` supaya "Gangga &amp; Lihaga"
    // tidak jadi "Gangga  Lihaga"), lalu buang sisa entity apa pun.
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp|#39);/g, (m) => HTML_ENTITY[m])
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}
