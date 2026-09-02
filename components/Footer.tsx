import Image from "next/image";
import Link from "next/link";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/locales";
import { getAvailability } from "@/lib/availability";
import { MEMBERSHIPS, SOCIAL_LINKS } from "@/lib/contact";
import { ICON_PATH } from "@/lib/social-icons";
import { ChatCardButton } from "./ChatWidget";
import ContactDetails from "./ContactDetails";

/**
 * Susunannya mengikuti footer welcomemanado.com — merek + sosial, tautan cepat,
 * kontak, pita keanggotaan, hak cipta — tapi warnanya lewat token tema, bukan
 * `gray-950` mati seperti di sana: situs ini punya sakelar terang/gelap.
 *
 * Warna hover tiap kanal sengaja ditulis di sini, bukan di `lib/contact.ts`,
 * karena `content` di tailwind.config hanya memindai `app/` dan `components/`.
 */
const CHIP =
  "flex h-10 w-10 items-center justify-center rounded-full bg-ink/[0.07] text-ink-2 transition-all duration-300";

const SOCIAL_HOVER: Record<string, string> = {
  Instagram:
    "hover:bg-[image:linear-gradient(135deg,#833ab4_0%,#fd1d1d_50%,#fcb045_100%)] hover:text-white",
  TikTok: "hover:bg-black hover:text-white",
  Facebook: "hover:bg-[#1877F2] hover:text-white",
  WhatsApp: "hover:bg-[#25D366] hover:text-white",
};

/** Logo ASITA jauh lebih persegi dari dua lainnya; tingginya dinaikkan supaya
 * ketiganya terlihat sebobot, sebagaimana di situs induk. */
const LOGO_HEIGHT: Record<string, string> = {
  IINTOA: "h-11 md:h-12",
  ASITA: "h-14 md:h-16",
  ASTINDO: "h-11 md:h-12",
};

export default async function Footer({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const a = (await getAvailability())[locale];

  const nav = [
    { href: `/${locale}/tours/`, label: t.allTours, show: true },
    { href: `/${locale}/hotels/`, label: t.navHotels, show: a.hotels },
    { href: `/${locale}/gallery/`, label: t.navGallery, show: a.gallery },
    { href: `/${locale}/blog/`, label: t.navBlog, show: a.blog },
    { href: `/${locale}/about/`, label: t.navAbout, show: a.about },
    { href: `/${locale}/contact/`, label: t.navContact, show: true },
  ].filter((i) => i.show);

  const heading = "mb-8 text-sm font-black uppercase tracking-[0.2em] text-ink";

  return (
    <footer className="mt-32 border-t border-line bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-16">
          <div className="md:col-span-2">
            <p className="text-3xl font-black uppercase tracking-tighter text-ink">
              manado<span className="text-accent">.tours</span>
            </p>
            <p className="mb-10 mt-8 max-w-md text-base font-light leading-relaxed text-ink-2">
              {t.footerDescription}
            </p>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={`${CHIP} ${SOCIAL_HOVER[s.name]}`}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={ICON_PATH[s.icon]} />
                  </svg>
                </a>
              ))}
              {/* WeChat & KakaoTalk tidak punya URL — keduanya memunculkan
                  kartu QR milik <FloatingChat> di kanan bawah. */}
              <ChatCardButton
                channel="wechat"
                icon="wechat"
                label={t.wechatTitle}
                className={`${CHIP} hover:bg-[#07C160] hover:text-white`}
              />
              <ChatCardButton
                channel="kakao"
                icon="kakao"
                label={t.kakaoTitle}
                className={`${CHIP} hover:bg-[#FEE500] hover:text-slate-900`}
              />
            </div>

            {/* Tautan balik ke situs induk: memperkuat kedua domain di mata Google, menegaskan ini perusahaan yang sama. Sengaja buka di tab yang sama. */}
            <a
              href="https://welcomemanado.com"
              className="mt-10 inline-block text-[11px] font-black uppercase tracking-widest text-ink-3 transition-colors hover:text-accent"
            >
              {t.partOf} →
            </a>
          </div>

          <div>
            <h2 className={heading}>{t.quickLinks}</h2>
            <ul className="space-y-4">
              {nav.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="flex items-center text-sm font-medium text-ink-2 transition-colors hover:text-accent"
                  >
                    <span className="mr-2" aria-hidden="true">
                      #
                    </span>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>{t.getInTouch}</h2>
            <ContactDetails />
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <h2 className="text-center text-sm font-medium tracking-[0.2em] text-ink-3 md:text-base">
            ~ Member Of ~
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-24">
            {MEMBERSHIPS.map((m) => (
              <a
                key={m.name}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                /* Latar putih dipatok: ketiga logo bergambar latar putih, jadi
                   tanpa ini mereka hilang di mode gelap. */
                className="rounded-xl bg-white px-5 py-3 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={m.src}
                  alt={m.name}
                  width={220}
                  height={90}
                  className={`w-auto object-contain ${LOGO_HEIGHT[m.name]}`}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <p className="text-[11px] font-black uppercase tracking-widest text-ink-3">
            © {new Date().getFullYear()} Welcome Manado. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
