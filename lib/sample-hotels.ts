import type { Locale } from "./locales";

/**
 * DATA CONTOH — SEMENTARA, AKAN DIBUANG.
 * Pengganti: `GET /api/intl/hotels?locale=xx` dan `/hotels/{slug}?locale=xx`.
 * Bentuk tipe di bawah sengaja dicocokkan dengan `HotelResource` di api_wm.
 *
 * Nama hotel adalah nama diri — tidak diterjemahkan, sama seperti di API.
 */

export type Hotel = {
  slug: string;
  name: string;
  location: string;
  category: string;
  stars: number;
  facilities: string;
  description: string | null;
  primary_image: string;
  images: string[];
};

const IMG = {
  reef: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=70",
  city: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=70",
  hill: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=70",
};

const DESCRIPTIONS: Record<Locale, string[]> = {
  en: [
    "Twenty minutes by boat from the Bunaken jetty, with a house reef that starts at the end of the pier. Rooms are simple and open to the sea breeze rather than air-conditioned — most guests here are divers who spend daylight in the water.",
    "In the middle of Manado, walking distance from the waterfront restaurants and the night market. The airport run takes about thirty minutes, and the boat harbour for Bunaken is ten minutes away.",
    "Up in the Minahasa highlands where the nights are cool enough for a blanket. Built around a garden with a view down to Lake Linow, and a twenty-minute drive from Tomohon market.",
  ],
  ko: [
    "부나켄 선착장에서 배로 20분, 잔교 끝에서 바로 하우스 리프가 시작됩니다. 객실은 소박하고 에어컨 대신 바닷바람이 통하도록 열려 있습니다 — 이곳 손님 대부분은 낮 시간을 물속에서 보내는 다이버입니다.",
    "마나도 시내 한복판, 해안가 식당과 야시장까지 걸어갈 수 있는 거리입니다. 공항까지 약 30분, 부나켄행 선착장까지는 10분 거리입니다.",
    "밤이면 담요가 필요할 만큼 선선한 미나하사 고원에 있습니다. 리노우 호수가 내려다보이는 정원을 중심으로 지어졌고, 토모혼 시장까지 차로 20분입니다.",
  ],
  zh: [
    "从布纳肯码头乘船二十分钟，栈桥尽头即是近岸珊瑚礁。客房陈设简单，不设空调而是敞开迎海风 —— 住在这里的多是白天泡在水里的潜水者。",
    "位于美娜多市中心，步行即可到海滨餐厅与夜市。到机场约三十分钟，到前往布纳肯的码头十分钟。",
    "坐落在夜里需要盖被子的米纳哈萨高地。围绕一座花园而建，可俯瞰利瑙湖，距托莫洪市场车程二十分钟。",
  ],
  fr: [], de: [], it: [], es: [], nl: [],
} as Record<Locale, string[]>;

const BASE = [
  {
    slug: "bunaken-dive-lodge",
    name: "Bunaken Dive Lodge",
    location: "Bunaken Island",
    category: "Dive resort",
    stars: 3,
    facilities: "House reef\nDive centre\nRestaurant\nBoat transfers\nFresh water showers",
    primary_image: IMG.reef,
    images: [IMG.reef, IMG.city],
  },
  {
    slug: "manado-bay-hotel",
    name: "Manado Bay Hotel",
    location: "Manado City",
    category: "City hotel",
    stars: 4,
    facilities: "Airport shuttle\nPool\nRestaurant\nMeeting rooms\nWi-Fi",
    primary_image: IMG.city,
    images: [IMG.city, IMG.hill],
  },
  {
    slug: "tomohon-highland-retreat",
    name: "Tomohon Highland Retreat",
    location: "Tomohon",
    category: "Highland lodge",
    stars: 3,
    facilities: "Garden\nLake view\nRestaurant\nFireplace\nGuided walks",
    primary_image: IMG.hill,
    images: [IMG.hill, IMG.reef],
  },
];

export function getHotels(locale: Locale): Hotel[] {
  const desc = DESCRIPTIONS[locale] ?? [];
  if (desc.length === 0) return [];

  return BASE.map((h, i) => ({ ...h, description: desc[i] ?? null }));
}

export function getHotel(locale: Locale, slug: string): Hotel | undefined {
  return getHotels(locale).find((h) => h.slug === slug);
}
