"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import type { Locale } from "@/lib/locales";

type NavItem = { href: string; label: string };

const PARENT_URL = "https://welcomemanado.com";

/**
 * Header "pill" mengambang. `Header.tsx` (server) mengambil data nav + bahasa
 * lalu menyerahkannya ke sini. Di beranda ({locale} / {locale}/) sebelum
 * di-scroll dan sebelum menu mobile dibuka → pill transparan (kaca) di atas
 * hero dengan teks putih; selain itu → pill solid (surface + blur + bayang).
 *
 * `<main>` diberi padding atas di layout dan hero digeser `-mt` yang sepadan,
 * sehingga pill benar-benar melayang di atas hero yang tetap full-bleed,
 * sementara halaman lain kontennya mulai di bawah pill.
 */
export default function HeaderShell({
  locale,
  nav,
  published,
}: {
  locale: Locale;
  nav: NavItem[];
  published: Locale[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const transparent = onHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu saat berpindah halaman atau melebar ke desktop.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const cta = (
    <a
      href={PARENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/25 transition-transform hover:scale-105"
    >
      Welcome Manado
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div
          className={`mt-3 flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-colors duration-300 lg:px-7 lg:py-3 ${
            transparent
              ? "border border-white/15 bg-white/5 backdrop-blur-md"
              : "border border-line bg-surface/90 shadow-lg shadow-slate-900/5 backdrop-blur-md"
          }`}
        >
          <Link
            href={`/${locale}/`}
            onClick={() => setOpen(false)}
            className={`shrink-0 text-lg font-black uppercase tracking-tighter lg:text-xl ${
              transparent ? "text-white" : "text-ink"
            }`}
          >
            manado<span className="text-accent">.tours</span>
          </Link>

          <nav className="hidden items-center gap-x-6 lg:flex">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={`text-[11px] font-black uppercase tracking-widest transition-colors hover:text-accent ${
                  transparent ? "text-white/85" : "text-ink-2"
                }`}
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-1 lg:flex">
            <ThemeToggle onDark={transparent} />
            <LanguageSwitcher current={locale} availableIn={published} onDark={transparent} />
            <span className="ml-2">{cta}</span>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle onDark={transparent} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              }`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 origin-top animate-menu-in rounded-3xl border border-line bg-surface p-3 shadow-xl lg:hidden">
            <nav className="flex flex-col">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-widest text-ink-2 transition-colors hover:bg-surface-2 hover:text-accent"
                >
                  {i.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-line px-2 pt-3">
              {/* Pemilih bahasa duduk di pojok kiri panel — panelnya harus
                  melebar ke kanan, bukan ke kiri keluar layar. */}
              <LanguageSwitcher current={locale} availableIn={published} align="left" />
              {cta}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
