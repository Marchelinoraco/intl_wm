import type { Locale } from "./locales";

/**
 * String antarmuka. Ini teks yang TIDAK berasal dari database — label, tombol,
 * dan judul bagian. Teks konten (judul paket, deskripsi, itinerary) datang dari
 * `/api/intl/*` yang sudah menyajikannya dalam bahasa yang diminta.
 *
 * Nilai en/ko/zh diambil dari client_wm/src/locales agar konsisten dengan situs
 * yang sudah berjalan.
 */
type Dict = {
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreTours: string;
  viewDetails: string;
  experienceDetails: string;
  plannedItinerary: string;
  inclusions: string;
  exclusions: string;
  bestPrice: string;
  days: string;
  nights: string;
  from: string;
  askOnWhatsapp: string;
  askOnKakao: string;
  askOnWechat: string;
  partOf: string;
  allTours: string;
};

export const DICTIONARY: Record<Locale, Dict> = {
  en: {
    tagline: "Tours in Manado & North Sulawesi",
    heroTitle: "Dive Bunaken. Climb Tomohon. Sail Likupang.",
    heroSubtitle:
      "Small-group tours run by people who grew up here — reefs, volcanoes, and villages most visitors never reach.",
    exploreTours: "Explore Tours",
    viewDetails: "View Details",
    experienceDetails: "Experience Details",
    plannedItinerary: "Planned Itinerary",
    inclusions: "Included",
    exclusions: "Not Included",
    bestPrice: "Best Price Guarantee",
    days: "Days",
    nights: "Nights",
    from: "From",
    askOnWhatsapp: "Ask on WhatsApp",
    askOnKakao: "Ask on KakaoTalk",
    askOnWechat: "Ask on WeChat",
    partOf: "Part of Welcome Manado",
    allTours: "All Tours",
  },
  ko: {
    tagline: "마나도 & 북술라웨시 투어",
    heroTitle: "부나켄 다이빙. 토모혼 트레킹. 리쿠팡 항해.",
    heroSubtitle:
      "이곳에서 나고 자란 사람들이 안내하는 소규모 투어 — 일반 여행객이 닿지 못하는 산호초와 화산, 그리고 마을까지.",
    exploreTours: "투어 둘러보기",
    viewDetails: "상세 보기",
    experienceDetails: "상세 내용",
    plannedItinerary: "계획된 일정",
    inclusions: "포함 사항",
    exclusions: "불포함 사항",
    bestPrice: "최저가 보장",
    days: "일",
    nights: "박",
    from: "최저",
    askOnWhatsapp: "WhatsApp 문의",
    askOnKakao: "카카오톡 문의",
    askOnWechat: "WeChat 문의",
    partOf: "Welcome Manado 운영",
    allTours: "전체 투어",
  },
  zh: {
    tagline: "美娜多与北苏拉威西旅游",
    heroTitle: "潜水布纳肯。登上托莫洪。航行利库邦。",
    heroSubtitle:
      "由土生土长的当地人带领的小团游 —— 珊瑚礁、火山，以及大多数游客到不了的村落。",
    exploreTours: "探索行程",
    viewDetails: "查看详情",
    experienceDetails: "体验详情",
    plannedItinerary: "计划行程",
    inclusions: "费用包含",
    exclusions: "费用不含",
    bestPrice: "最佳价格保证",
    days: "天",
    nights: "晚",
    from: "起",
    askOnWhatsapp: "WhatsApp 咨询",
    askOnKakao: "KakaoTalk 咨询",
    askOnWechat: "微信咨询",
    partOf: "Welcome Manado 旗下",
    allTours: "全部行程",
  },
  // Lima bahasa Eropa belum punya konten; PUBLISHED_LOCALES menahannya agar
  // tidak dibangun. Entri ini menjaga tipe tetap lengkap.
  fr: {} as Dict,
  de: {} as Dict,
  it: {} as Dict,
  es: {} as Dict,
  nl: {} as Dict,
};

export function dict(locale: Locale): Dict {
  return DICTIONARY[locale];
}
