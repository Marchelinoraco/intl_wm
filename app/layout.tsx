import "./globals.css";

/**
 * Root layout sengaja hanya meneruskan children.
 *
 * `<html lang>` dan `<body>` dirender oleh `app/[locale]/layout.tsx`, karena
 * atribut `lang` harus mengikuti bahasa halaman — halaman Korea dengan
 * `lang="en"` adalah sinyal yang salah bagi mesin pencari.
 *
 * Tidak ada `app/page.tsx`: root `/` ditangani nginx dengan redirect 302
 * berdasarkan `Accept-Language`. Saat `npm run dev`, buka `/en/` langsung.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
