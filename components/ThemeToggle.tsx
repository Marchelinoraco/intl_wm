"use client";

import { useEffect, useState } from "react";

/**
 * Tombol light/dark. Tema awal sudah di-set inline-script di <head> (tanpa
 * kedip) — komponen ini hanya menyinkronkan ikon lalu meng-toggle kelas
 * `.dark` di <html> + menyimpan pilihan ke localStorage.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    // Crossfade warna hanya selama pergantian tema.
    root.classList.add("theme-anim");
    root.classList.toggle("dark", next);
    window.setTimeout(() => root.classList.remove("theme-anim"), 320);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* localStorage bisa diblok — abaikan, pilihan tak tersimpan saja */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
    >
      {/* Ikon di-swap CSS-only supaya tak ada kedip sebelum useEffect jalan:
          .dark → tampil bulan, selain itu → matahari. */}
      <svg
        className="h-[18px] w-[18px] dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        className="hidden h-[18px] w-[18px] dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
