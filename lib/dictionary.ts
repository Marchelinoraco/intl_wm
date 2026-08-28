import type { Locale } from "./locales";

/**
 * String antarmuka — teks yang TIDAK berasal dari database (label, tombol,
 * judul bagian). Teks konten (judul paket, deskripsi, itinerary) datang dari
 * /api/intl/* dalam bahasa yang diminta.
 *
 * Nilai en/ko/zh mengikuti client_wm/src/locales agar konsisten dengan situs
 * yang sudah berjalan. Kelima bahasa Eropa diisi khusus untuk situs ini.
 */
type Dict = {
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreTours: string;
  featuredTours: string;
  allTours: string;
  viewDetails: string;
  experienceDetails: string;
  plannedItinerary: string;
  inclusions: string;
  exclusions: string;
  accommodation: string;
  days: string;
  nights: string;
  pricingInfo: string;
  contactInquiry: string;
  bestPrice: string;
  askOnWhatsapp: string;
  askOnKakao: string;
  askOnWechat: string;
  partOf: string;
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
};

export const DICTIONARY: Record<Locale, Dict> = {
  en: {
    tagline: "Tours in Manado & North Sulawesi",
    heroTitle: "Dive Bunaken. Climb Tomohon. Sail Likupang.",
    heroSubtitle:
      "Small-group tours run by people who grew up here — reefs, volcanoes, and villages most visitors never reach.",
    exploreTours: "Explore Tours",
    featuredTours: "Featured Tours",
    allTours: "All Tours",
    viewDetails: "View Details",
    experienceDetails: "Experience Details",
    plannedItinerary: "Planned Itinerary",
    inclusions: "Included",
    exclusions: "Not Included",
    accommodation: "Accommodation",
    days: "Days",
    nights: "Nights",
    pricingInfo: "Pricing Information",
    contactInquiry: "Contact us for pricing",
    bestPrice: "Best Price Guarantee",
    askOnWhatsapp: "Ask on WhatsApp",
    askOnKakao: "Ask on KakaoTalk",
    askOnWechat: "Ask on WeChat",
    partOf: "Part of Welcome Manado",
    navHotels: "Hotels",
    navGallery: "Gallery",
    navBlog: "Journal",
    navAbout: "About",
    navContact: "Contact",
    hotelsHeading: "Where to stay",
    hotelsLede:
      "Places we book for our own guests — on the reef, in the city, and up in the highlands.",
    facilities: "Facilities",
    galleryHeading: "Gallery",
    blogHeading: "Journal",
    readMore: "Read more",
    aboutHeading: "About us",
    teamHeading: "The people who run it",
    contactHeading: "Talk to us",
    contactLede:
      "Tell us roughly when you are coming and how many of you there are. We reply in your language, usually within a day.",
  },
  ko: {
    tagline: "마나도 & 북술라웨시 투어",
    heroTitle: "부나켄 다이빙. 토모혼 트레킹. 리쿠팡 항해.",
    heroSubtitle:
      "이곳에서 나고 자란 사람들이 안내하는 소규모 투어 — 일반 여행객이 닿지 못하는 산호초와 화산, 그리고 마을까지.",
    exploreTours: "투어 둘러보기",
    featuredTours: "추천 투어",
    allTours: "전체 투어",
    viewDetails: "상세 보기",
    experienceDetails: "상세 내용",
    plannedItinerary: "계획된 일정",
    inclusions: "포함 사항",
    exclusions: "불포함 사항",
    accommodation: "숙소",
    days: "일",
    nights: "박",
    pricingInfo: "가격 안내",
    contactInquiry: "가격 문의하기",
    bestPrice: "최저가 보장",
    askOnWhatsapp: "WhatsApp 문의",
    askOnKakao: "카카오톡 문의",
    askOnWechat: "WeChat 문의",
    partOf: "Welcome Manado 운영",
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
    contactLede:
      "대략 언제 오시는지, 몇 분이신지 알려주세요. 사용하시는 언어로, 보통 하루 안에 답변드립니다.",
  },
  zh: {
    tagline: "美娜多与北苏拉威西旅游",
    heroTitle: "潜水布纳肯。登上托莫洪。航行利库邦。",
    heroSubtitle:
      "由土生土长的当地人带领的小团游 —— 珊瑚礁、火山，以及大多数游客到不了的村落。",
    exploreTours: "探索行程",
    featuredTours: "精选行程",
    allTours: "全部行程",
    viewDetails: "查看详情",
    experienceDetails: "体验详情",
    plannedItinerary: "计划行程",
    inclusions: "费用包含",
    exclusions: "费用不含",
    accommodation: "住宿",
    days: "天",
    nights: "晚",
    pricingInfo: "价格信息",
    contactInquiry: "咨询价格",
    bestPrice: "最佳价格保证",
    askOnWhatsapp: "WhatsApp 咨询",
    askOnKakao: "KakaoTalk 咨询",
    askOnWechat: "微信咨询",
    partOf: "Welcome Manado 旗下",
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
  },
  fr: {
    tagline: "Circuits à Manado et dans le Nord de Sulawesi",
    heroTitle: "Plongez à Bunaken. Grimpez à Tomohon. Naviguez à Likupang.",
    heroSubtitle:
      "Des circuits en petit groupe menés par ceux qui ont grandi ici — récifs, volcans et villages que la plupart des visiteurs ne voient jamais.",
    exploreTours: "Découvrir les circuits",
    featuredTours: "Circuits en vedette",
    allTours: "Tous les circuits",
    viewDetails: "Voir les détails",
    experienceDetails: "Détails de l'expérience",
    plannedItinerary: "Itinéraire prévu",
    inclusions: "Inclus",
    exclusions: "Non inclus",
    accommodation: "Hébergement",
    days: "Jours",
    nights: "Nuits",
    pricingInfo: "Informations tarifaires",
    contactInquiry: "Contactez-nous pour les tarifs",
    bestPrice: "Meilleur prix garanti",
    askOnWhatsapp: "Demander sur WhatsApp",
    askOnKakao: "Demander sur KakaoTalk",
    askOnWechat: "Demander sur WeChat",
    partOf: "Une marque de Welcome Manado",
    navHotels: "Hôtels",
    navGallery: "Galerie",
    navBlog: "Journal",
    navAbout: "À propos",
    navContact: "Contact",
    hotelsHeading: "Où loger",
    hotelsLede:
      "Des adresses que nous réservons pour nos propres clients — sur le récif, en ville et sur les hauts plateaux.",
    facilities: "Équipements",
    galleryHeading: "Galerie",
    blogHeading: "Journal",
    readMore: "Lire la suite",
    aboutHeading: "À propos de nous",
    teamHeading: "Ceux qui font vivre l'agence",
    contactHeading: "Parlez-nous",
    contactLede:
      "Dites-nous à peu près quand vous venez et combien vous êtes. Nous répondons dans votre langue, généralement sous 24 heures.",
  },
  de: {
    tagline: "Touren in Manado und Nord-Sulawesi",
    heroTitle: "Tauchen in Bunaken. Wandern in Tomohon. Segeln in Likupang.",
    heroSubtitle:
      "Touren in kleinen Gruppen, geführt von Menschen, die hier aufgewachsen sind — Riffe, Vulkane und Dörfer, die die meisten Besucher nie erreichen.",
    exploreTours: "Touren entdecken",
    featuredTours: "Ausgewählte Touren",
    allTours: "Alle Touren",
    viewDetails: "Details ansehen",
    experienceDetails: "Details zum Erlebnis",
    plannedItinerary: "Geplanter Reiseverlauf",
    inclusions: "Inbegriffen",
    exclusions: "Nicht inbegriffen",
    accommodation: "Unterkunft",
    days: "Tage",
    nights: "Nächte",
    pricingInfo: "Preisinformationen",
    contactInquiry: "Kontaktieren Sie uns für Preise",
    bestPrice: "Bestpreisgarantie",
    askOnWhatsapp: "Auf WhatsApp fragen",
    askOnKakao: "Auf KakaoTalk fragen",
    askOnWechat: "Auf WeChat fragen",
    partOf: "Teil von Welcome Manado",
    navHotels: "Hotels",
    navGallery: "Galerie",
    navBlog: "Journal",
    navAbout: "Über uns",
    navContact: "Kontakt",
    hotelsHeading: "Wo übernachten",
    hotelsLede:
      "Adressen, die wir für unsere eigenen Gäste buchen — am Riff, in der Stadt und im Hochland.",
    facilities: "Ausstattung",
    galleryHeading: "Galerie",
    blogHeading: "Journal",
    readMore: "Weiterlesen",
    aboutHeading: "Über uns",
    teamHeading: "Die Menschen dahinter",
    contactHeading: "Sprechen Sie mit uns",
    contactLede:
      "Sagen Sie uns ungefähr, wann Sie kommen und wie viele Sie sind. Wir antworten in Ihrer Sprache, meist innerhalb eines Tages.",
  },
  it: {
    tagline: "Tour a Manado e nel Nord Sulawesi",
    heroTitle: "Immersioni a Bunaken. Trekking a Tomohon. Vela a Likupang.",
    heroSubtitle:
      "Tour in piccoli gruppi guidati da chi è cresciuto qui — barriere coralline, vulcani e villaggi che la maggior parte dei visitatori non raggiunge mai.",
    exploreTours: "Scopri i tour",
    featuredTours: "Tour in evidenza",
    allTours: "Tutti i tour",
    viewDetails: "Vedi dettagli",
    experienceDetails: "Dettagli dell'esperienza",
    plannedItinerary: "Itinerario previsto",
    inclusions: "Incluso",
    exclusions: "Non incluso",
    accommodation: "Alloggio",
    days: "Giorni",
    nights: "Notti",
    pricingInfo: "Informazioni sui prezzi",
    contactInquiry: "Contattaci per i prezzi",
    bestPrice: "Miglior prezzo garantito",
    askOnWhatsapp: "Chiedi su WhatsApp",
    askOnKakao: "Chiedi su KakaoTalk",
    askOnWechat: "Chiedi su WeChat",
    partOf: "Parte di Welcome Manado",
    navHotels: "Hotel",
    navGallery: "Galleria",
    navBlog: "Diario",
    navAbout: "Chi siamo",
    navContact: "Contatti",
    hotelsHeading: "Dove alloggiare",
    hotelsLede:
      "Strutture che prenotiamo per i nostri ospiti — sulla barriera corallina, in città e sugli altopiani.",
    facilities: "Servizi",
    galleryHeading: "Galleria",
    blogHeading: "Diario",
    readMore: "Leggi di più",
    aboutHeading: "Chi siamo",
    teamHeading: "Le persone che la gestiscono",
    contactHeading: "Parla con noi",
    contactLede:
      "Diteci più o meno quando arrivate e in quanti siete. Rispondiamo nella vostra lingua, di solito entro un giorno.",
  },
  es: {
    tagline: "Tours en Manado y el norte de Célebes",
    heroTitle: "Bucea en Bunaken. Sube a Tomohon. Navega en Likupang.",
    heroSubtitle:
      "Tours en grupos reducidos guiados por gente que creció aquí — arrecifes, volcanes y aldeas que la mayoría de los visitantes nunca alcanza.",
    exploreTours: "Explorar tours",
    featuredTours: "Tours destacados",
    allTours: "Todos los tours",
    viewDetails: "Ver detalles",
    experienceDetails: "Detalles de la experiencia",
    plannedItinerary: "Itinerario previsto",
    inclusions: "Incluido",
    exclusions: "No incluido",
    accommodation: "Alojamiento",
    days: "Días",
    nights: "Noches",
    pricingInfo: "Información de precios",
    contactInquiry: "Contáctanos para precios",
    bestPrice: "Mejor precio garantizado",
    askOnWhatsapp: "Preguntar por WhatsApp",
    askOnKakao: "Preguntar por KakaoTalk",
    askOnWechat: "Preguntar por WeChat",
    partOf: "Parte de Welcome Manado",
    navHotels: "Hoteles",
    navGallery: "Galería",
    navBlog: "Diario",
    navAbout: "Nosotros",
    navContact: "Contacto",
    hotelsHeading: "Dónde alojarse",
    hotelsLede:
      "Lugares que reservamos para nuestros propios huéspedes — en el arrecife, en la ciudad y en las tierras altas.",
    facilities: "Instalaciones",
    galleryHeading: "Galería",
    blogHeading: "Diario",
    readMore: "Leer más",
    aboutHeading: "Sobre nosotros",
    teamHeading: "Las personas que lo hacen posible",
    contactHeading: "Habla con nosotros",
    contactLede:
      "Cuéntanos aproximadamente cuándo vienes y cuántos sois. Respondemos en tu idioma, normalmente en menos de un día.",
  },
  nl: {
    tagline: "Tours in Manado en Noord-Sulawesi",
    heroTitle: "Duik in Bunaken. Beklim Tomohon. Zeil naar Likupang.",
    heroSubtitle:
      "Tours in kleine groepen, geleid door mensen die hier zijn opgegroeid — riffen, vulkanen en dorpen die de meeste bezoekers nooit bereiken.",
    exploreTours: "Tours ontdekken",
    featuredTours: "Uitgelichte tours",
    allTours: "Alle tours",
    viewDetails: "Details bekijken",
    experienceDetails: "Details van de ervaring",
    plannedItinerary: "Gepland reisschema",
    inclusions: "Inbegrepen",
    exclusions: "Niet inbegrepen",
    accommodation: "Accommodatie",
    days: "Dagen",
    nights: "Nachten",
    pricingInfo: "Prijsinformatie",
    contactInquiry: "Neem contact op voor prijzen",
    bestPrice: "Laagsteprijsgarantie",
    askOnWhatsapp: "Vraag het via WhatsApp",
    askOnKakao: "Vraag het via KakaoTalk",
    askOnWechat: "Vraag het via WeChat",
    partOf: "Onderdeel van Welcome Manado",
    navHotels: "Hotels",
    navGallery: "Galerij",
    navBlog: "Journaal",
    navAbout: "Over ons",
    navContact: "Contact",
    hotelsHeading: "Waar te overnachten",
    hotelsLede:
      "Plekken die we voor onze eigen gasten boeken — aan het rif, in de stad en in het hoogland.",
    facilities: "Voorzieningen",
    galleryHeading: "Galerij",
    blogHeading: "Journaal",
    readMore: "Lees meer",
    aboutHeading: "Over ons",
    teamHeading: "De mensen erachter",
    contactHeading: "Praat met ons",
    contactLede:
      "Vertel ons ongeveer wanneer je komt en met hoeveel jullie zijn. We antwoorden in je eigen taal, meestal binnen een dag.",
  },
};

export function dict(locale: Locale): Dict {
  return DICTIONARY[locale];
}
