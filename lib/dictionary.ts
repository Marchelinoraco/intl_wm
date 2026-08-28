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
  navHotels: string;
  navGallery: string;
  navBlog: string;
  navAbout: string;
  navContact: string;
  hotelsHeading: string;
  hotelsLede: string;
  facilities: string;
  galleryHeading: string;
  blogHeading: string;
  readMore: string;
  aboutHeading: string;
  teamHeading: string;
  contactHeading: string;
  contactLede: string;
  formName: string;
  formEmail: string;
  formPax: string;
  formMessage: string;
  formSend: string;
  formNote: string;
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
    navHotels: "Hotels",
    navGallery: "Gallery",
    navBlog: "Journal",
    navAbout: "About",
    navContact: "Contact",
    hotelsHeading: "Where to stay",
    hotelsLede: "Places we book for our own guests — on the reef, in the city, and up in the highlands.",
    facilities: "Facilities",
    galleryHeading: "Gallery",
    blogHeading: "Journal",
    readMore: "Read more",
    aboutHeading: "About us",
    teamHeading: "The people who run it",
    contactHeading: "Talk to us",
    contactLede: "Tell us roughly when you are coming and how many of you there are. We reply in your language, usually within a day.",
    formName: "Your name",
    formEmail: "Email",
    formPax: "How many travellers",
    formMessage: "What are you looking for?",
    formSend: "Send enquiry",
    formNote: "Not connected yet — this form is part of the site skeleton.",
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
    navHotels: "호텔",
    navGallery: "갤러리",
    navBlog: "저널",
    navAbout: "소개",
    navContact: "문의",
    hotelsHeading: "숙소",
    hotelsLede: "저희가 손님께 직접 예약해 드리는 곳들 — 산호초 위, 시내, 그리고 고원.",
    facilities: "시설",
    galleryHeading: "갤러리",
    blogHeading: "저널",
    readMore: "더 읽기",
    aboutHeading: "소개",
    teamHeading: "함께하는 사람들",
    contactHeading: "문의하기",
    contactLede: "대략 언제 오시는지, 몇 분이신지 알려주세요. 사용하시는 언어로, 보통 하루 안에 답변드립니다.",
    formName: "성함",
    formEmail: "이메일",
    formPax: "인원",
    formMessage: "무엇을 찾고 계신가요?",
    formSend: "문의 보내기",
    formNote: "아직 연결되지 않았습니다 — 이 양식은 사이트 기본 골격의 일부입니다.",
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
    navHotels: "住宿",
    navGallery: "相册",
    navBlog: "手记",
    navAbout: "关于",
    navContact: "联系",
    hotelsHeading: "住在哪里",
    hotelsLede: "我们为自家客人预订的地方 —— 珊瑚礁旁、市区之中，以及高地之上。",
    facilities: "设施",
    galleryHeading: "相册",
    blogHeading: "手记",
    readMore: "阅读全文",
    aboutHeading: "关于我们",
    teamHeading: "带你出行的人",
    contactHeading: "联系我们",
    contactLede: "告诉我们大致的出行时间和人数。我们会用您的语言回覆，通常一天之内。",
    formName: "您的姓名",
    formEmail: "电子邮箱",
    formPax: "出行人数",
    formMessage: "您在找什么样的行程？",
    formSend: "发送咨询",
    formNote: "尚未接通 —— 此表单属于站点骨架的一部分。",
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
