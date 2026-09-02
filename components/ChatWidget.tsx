"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ICON_PATH, type IconName } from "@/lib/social-icons";

/**
 * Status bersama widget obrolan. Dua tempat memakainya: tombol mengambang
 * <FloatingChat> di kanan bawah, dan ikon WeChat/KakaoTalk di footer — menekan
 * ikon di footer memunculkan kartu QR yang sama di dekat tombol mengambang,
 * persis seperti welcomemanado.com.
 *
 * Padanan `composables/chatWidget.js` di client_wm. Bedanya di sana state-nya
 * modul global; di sini React context, supaya tiap halaman mulai bersih.
 */
export type ChatChannel = "wechat" | "kakao";

type ChatWidgetValue = {
  menuOpen: boolean;
  card: ChatChannel | null;
  toggleMenu: () => void;
  toggleCard: (channel: ChatChannel) => void;
  openCard: (channel: ChatChannel) => void;
  closeCard: () => void;
  closeAll: () => void;
};

const ChatWidgetContext = createContext<ChatWidgetValue | null>(null);

export function ChatWidgetProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [card, setCard] = useState<ChatChannel | null>(null);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setCard(null);
  }, []);

  // Menutup menu ikut menutup kartu; membukanya tidak — kartu yang tadi
  // dipanggil dari footer harus tetap terlihat saat menu dibuka.
  const toggleMenu = useCallback(() => {
    if (menuOpen) closeAll();
    else setMenuOpen(true);
  }, [menuOpen, closeAll]);

  const openCard = useCallback((channel: ChatChannel) => setCard(channel), []);
  const closeCard = useCallback(() => setCard(null), []);
  const toggleCard = useCallback(
    (channel: ChatChannel) => setCard((c) => (c === channel ? null : channel)),
    [],
  );

  // Escape menutup semuanya — kartu QR menutupi sudut layar, jadi harus ada
  // jalan keluar lewat papan ketik.
  useEffect(() => {
    if (!menuOpen && !card) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, card, closeAll]);

  const value = useMemo<ChatWidgetValue>(
    () => ({ menuOpen, card, toggleMenu, toggleCard, openCard, closeCard, closeAll }),
    [menuOpen, card, toggleMenu, toggleCard, openCard, closeCard, closeAll],
  );

  return <ChatWidgetContext.Provider value={value}>{children}</ChatWidgetContext.Provider>;
}

export function useChatWidget(): ChatWidgetValue {
  const ctx = useContext(ChatWidgetContext);
  if (!ctx) throw new Error("useChatWidget harus dipakai di dalam <ChatWidgetProvider>");
  return ctx;
}

/**
 * Ikon WeChat/KakaoTalk di footer. Bukan tautan — keduanya tidak punya URL
 * yang bisa dibuka, yang ada hanya QR — jadi ini tombol yang memunculkan kartu.
 * Dipakai dari <Footer> yang komponen server, karenanya dipisah ke sini.
 */
export function ChatCardButton({
  channel,
  icon,
  label,
  className,
}: {
  channel: ChatChannel;
  icon: IconName;
  label: string;
  className?: string;
}) {
  const { openCard } = useChatWidget();
  return (
    <button type="button" onClick={() => openCard(channel)} aria-label={label} className={className}>
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={ICON_PATH[icon]} />
      </svg>
    </button>
  );
}
