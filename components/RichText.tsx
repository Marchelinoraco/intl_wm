/**
 * Satu-satunya tempat konten HTML dari /api/intl/* disisipkan. Konten berasal
 * dari database milik sistem sendiri (bukan input pengguna), jadi
 * dangerouslySetInnerHTML di sini bukan celah XSS — sama seperti client_wm
 * merender description tour lewat v-html.
 */
export default function RichText({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
