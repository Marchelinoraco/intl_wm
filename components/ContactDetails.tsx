import { EMAILS, MAPS_URL, OFFICE_ADDRESS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

/**
 * Alamat kantor, telepon, dan surel — satu blok, dipakai di kolom "Hubungi
 * Kami" pada footer dan di halaman kontak. Bentuknya (titik aksen + baris yang
 * bisa ditekan) mengikuti welcomemanado.com.
 *
 * Semuanya tautan yang berguna di ponsel: alamat membuka Google Maps, telepon
 * memanggil, surel membuka aplikasi surat.
 */
export default function ContactDetails({ className = "" }: { className?: string }) {
  const row = "flex items-start text-sm font-medium text-ink-2 transition-colors hover:text-accent";
  const bullet = "mr-3 mt-1 text-xs text-accent";

  return (
    <div className={`space-y-6 ${className}`}>
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={row}>
        <span className={bullet} aria-hidden="true">
          ●
        </span>
        {OFFICE_ADDRESS}
      </a>

      <a href={`tel:${PHONE_TEL}`} className={row}>
        <span className={bullet} aria-hidden="true">
          ●
        </span>
        {PHONE_DISPLAY}
      </a>

      {EMAILS.map((email) => (
        <a key={email} href={`mailto:${email}`} className={`${row} break-all`}>
          <span className={bullet} aria-hidden="true">
            ●
          </span>
          {email}
        </a>
      ))}
    </div>
  );
}
