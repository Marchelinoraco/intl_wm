"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { KAKAO, WECHAT } from "@/lib/contact";
import { ICON_PATH } from "@/lib/social-icons";
import { useChatWidget, type ChatChannel } from "./ChatWidget";

/**
 * Tombol obrolan mengambang di kanan bawah — port React dari
 * `components/FloatingChat.vue` di client_wm. Menekan tombol merah membuka tiga
 * kanal; WhatsApp langsung menuju click-to-chat, WeChat & KakaoTalk memunculkan
 * kartu QR karena keduanya tidak punya tautan yang bisa dibuka.
 *
 * Semua teks masuk lewat prop: komponen ini client, sedangkan kamus dibaca di
 * server — jadi `layout.tsx` yang menerjemahkan lalu mengoper hasilnya.
 */
export type ChatCardStrings = {
  title: string;
  scan: string;
  description: string;
  copy: string;
  copied: string;
};

export type ChatStrings = {
  menuTitle: string;
  close: string;
  wechat: ChatCardStrings;
  kakao: ChatCardStrings;
};

/** Salin ke papan klip; `execCommand` sebagai cadangan untuk browser lama
 * dan untuk halaman yang tak dianggap "secure context". */
async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    document.body.removeChild(helper);
  }
}

function CopyButton({
  value,
  label,
  labelDone,
  className,
}: {
  value: string;
  label: string;
  labelDone: string;
  className: string;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      onClick={async () => {
        await copyText(value);
        setDone(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setDone(false), 2000);
      }}
      className={`w-full rounded-2xl py-3 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${className}`}
    >
      {done ? labelDone : label}
    </button>
  );
}

/** Kerangka kartu QR — sama untuk WeChat dan KakaoTalk, isinya yang berbeda. */
function ChatCard({
  strings,
  closeLabel,
  qr,
  copyValue,
  copyClassName,
  onClose,
  children,
}: {
  strings: ChatCardStrings;
  closeLabel: string;
  qr: string;
  copyValue: string;
  copyClassName: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-reveal-up relative w-64 rounded-3xl border border-line bg-surface p-6 text-center shadow-2xl shadow-slate-900/20 dark:shadow-black/60">
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-3 top-3 text-ink-3 transition-colors hover:text-ink"
      >
        <X className="h-4 w-4" />
      </button>

      <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-ink-3">
        {strings.title}
      </p>

      {/* Latar putih dipatok: kode QR harus kontras gelap-di-atas-terang untuk
          bisa dipindai, jadi bagian ini sengaja tidak ikut tema. */}
      <div className="mx-auto w-fit rounded-2xl border border-line bg-white p-1">
        <Image src={qr} alt={strings.scan} width={160} height={160} className="h-40 w-40 rounded-xl" />
      </div>

      <p className="mt-4 text-xs font-medium text-ink-3">{strings.scan}</p>
      {children}
      <p className="mb-5 mt-1 text-xs font-medium text-ink-3">{strings.description}</p>

      <CopyButton
        value={copyValue}
        label={strings.copy}
        labelDone={strings.copied}
        className={copyClassName}
      />
    </div>
  );
}

export default function FloatingChat({
  strings,
  whatsappHref,
}: {
  strings: ChatStrings;
  whatsappHref: string;
}) {
  const { menuOpen, card, toggleMenu, toggleCard, closeCard, closeAll } = useChatWidget();

  const channelButton =
    "group flex animate-reveal-up items-center gap-3";
  const channelLabel =
    "rounded-xl bg-surface px-4 py-2 text-[10px] font-black uppercase tracking-widest text-ink shadow-lg whitespace-nowrap";
  const channelIcon =
    "flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform duration-300 group-hover:scale-110";

  const channels: { key: ChatChannel; label: string; icon: "wechat" | "kakao"; tint: string }[] = [
    { key: "wechat", label: strings.wechat.title, icon: "wechat", tint: "bg-[#07C160] text-white" },
    { key: "kakao", label: strings.kakao.title, icon: "kakao", tint: "bg-[#FEE500] text-slate-900" },
  ];

  return (
    <div className="fixed bottom-6 right-5 z-[99] flex flex-col items-end gap-4 lg:bottom-8 lg:right-8">
      {card === "wechat" && (
        <ChatCard
          strings={strings.wechat}
          closeLabel={strings.close}
          qr={WECHAT.qr}
          copyValue={WECHAT.id}
          copyClassName="bg-[#07C160] text-white hover:bg-[#06AD56]"
          onClose={closeCard}
        >
          <p className="mt-3 text-xl font-black tracking-tight text-ink">{WECHAT.id}</p>
        </ChatCard>
      )}

      {card === "kakao" && (
        <ChatCard
          strings={strings.kakao}
          closeLabel={strings.close}
          qr={KAKAO.qr}
          copyValue={KAKAO.phone}
          copyClassName="bg-[#FEE500] text-slate-900 hover:bg-[#FDD800]"
          onClose={closeCard}
        >
          <p className="mt-3 text-xl font-black tracking-tight text-ink">{KAKAO.id}</p>
          <p className="mt-1 text-sm font-bold text-ink-2">{KAKAO.phone}</p>
          <p className="mt-1 break-all text-xs font-medium text-ink-3">{KAKAO.email}</p>
        </ChatCard>
      )}

      {menuOpen && (
        <div className="flex flex-col items-end gap-3">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={channelButton} onClick={closeAll}>
            <span className={channelLabel}>WhatsApp</span>
            <span className={`${channelIcon} bg-[#25D366] text-white`}>
              <MessageCircle className="h-7 w-7" />
            </span>
          </a>

          {channels.map((c) => (
            <button key={c.key} type="button" className={channelButton} onClick={() => toggleCard(c.key)}>
              <span className={channelLabel}>{c.label}</span>
              <span className={`${channelIcon} ${c.tint}`}>
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={ICON_PATH[c.icon]} />
                </svg>
              </span>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label={strings.menuTitle}
        className="group flex items-center gap-3"
      >
        {!menuOpen && (
          <span className="whitespace-nowrap rounded-xl bg-surface px-4 py-2 text-[10px] font-black uppercase tracking-widest text-ink shadow-lg">
            {strings.menuTitle}
          </span>
        )}
        <span
          className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-2xl shadow-red-600/40 transition-all duration-300 group-hover:scale-110 group-active:scale-95 ${
            menuOpen ? "" : "motion-safe:animate-float"
          }`}
        >
          {menuOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <>
              <MessageCircle className="h-8 w-8" />
              <span className="absolute -right-2 -top-2 flex h-5 w-5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-white bg-accent" />
              </span>
            </>
          )}
        </span>
      </button>
    </div>
  );
}
