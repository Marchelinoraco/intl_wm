import type { Locale } from "./locales";

/**
 * ============================================================================
 * DATA CONTOH — SEMENTARA, AKAN DIBUANG
 * ============================================================================
 * Berkas ini ada supaya tampilan dan struktur URL bisa dinilai sebelum
 * endpoint `/api/intl/*` di api_wm selesai (Task 6-13 rencana backend).
 *
 * Penggantinya nanti: pengambilan data saat build dari
 *   GET /api/intl/tours?locale=xx
 *   GET /api/intl/tours/{slug}?locale=xx
 * yang bentuk responsnya sudah sengaja dicocokkan dengan tipe di bawah.
 *
 * Angka dan teks di sini KARANGAN. Jangan dipakai sebagai acuan harga.
 * ============================================================================
 */

export type ItineraryDay = {
  day_number: number;
  title: string;
  description: string;
  hotel_info: string | null;
  meals_info: string | null;
};

export type Tour = {
  slug: string;
  title: string;
  description: string;
  location: string;
  base_price: number;
  price_usd: number | null;
  duration_days: number;
  duration_nights: number;
  is_featured: boolean;
  cover_image: string;
  category: { slug: string; name: string };
  inclusions: string;
  exclusions: string;
  itineraries: ItineraryDay[];
};

const IMG = {
  bunaken:
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=70",
  tomohon:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=70",
  likupang:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=70",
};

const TOURS: Record<Locale, Tour[]> = {
  en: [
    {
      slug: "bunaken-3d2n",
      title: "Bunaken Marine Park — 3 Days 2 Nights",
      description:
        "Bunaken's wall drops away to more than a kilometre, and the visibility on a good morning runs past thirty metres. Over three days you dive or snorkel four sites, sleep on the island rather than commuting from the city, and eat what the boat crew cooks.",
      location: "Bunaken, North Sulawesi",
      base_price: 4200000,
      price_usd: 265,
      duration_days: 3,
      duration_nights: 2,
      is_featured: true,
      cover_image: IMG.bunaken,
      category: { slug: "marine", name: "Marine" },
      inclusions:
        "Island accommodation (2 nights)\nAll meals\nBoat transfers\nLicensed dive guide\nPark entrance fee",
      exclusions: "Flights to Manado\nDive equipment rental\nPersonal expenses\nTips",
      itineraries: [
        {
          day_number: 1,
          title: "Arrival and first descent",
          description:
            "Pick-up at Sam Ratulangi airport, thirty minutes by road to the harbour, then forty minutes across to Bunaken. Afternoon check dive on the house reef to sort weights and buoyancy.",
          hotel_info: "Bunaken beachfront cottage",
          meals_info: "Lunch, dinner",
        },
        {
          day_number: 2,
          title: "Two wall dives and the mangroves",
          description:
            "Morning at Lekuan I and Fukui Point — turtles are near-certain on Lekuan. Afternoon is slower: a paddle through the mangrove channel where juvenile fish shelter.",
          hotel_info: "Bunaken beachfront cottage",
          meals_info: "Breakfast, lunch, dinner",
        },
        {
          day_number: 3,
          title: "Sunrise dive and return",
          description:
            "One early dive before the current turns, then back to Manado by late morning. Airport drop-off timed to your flight.",
          hotel_info: null,
          meals_info: "Breakfast",
        },
      ],
    },
    {
      slug: "tomohon-volcano-market",
      title: "Tomohon Volcano & Highland Market — Day Trip",
      description:
        "Mount Mahawu's crater rim is a twenty-minute walk from the car park, and on a clear morning you see Manado Bay on one side and the Minahasa highlands on the other. The day continues through flower fields to Tomohon's market — vivid, and not for every stomach.",
      location: "Tomohon, North Sulawesi",
      base_price: 950000,
      price_usd: 60,
      duration_days: 1,
      duration_nights: 0,
      is_featured: true,
      cover_image: IMG.tomohon,
      category: { slug: "highland", name: "Highland" },
      inclusions:
        "Private car with driver\nEnglish-speaking guide\nLunch\nEntrance fees\nBottled water",
      exclusions: "Accommodation\nPersonal shopping\nTips",
      itineraries: [
        {
          day_number: 1,
          title: "Crater, flowers, and market",
          description:
            "Depart Manado at 06:30 to beat the cloud. Mahawu crater rim, then Linow Lake where the water shifts colour with the light, then Tomohon market and back by late afternoon.",
          hotel_info: null,
          meals_info: "Lunch",
        },
      ],
    },
    {
      slug: "likupang-island-hopping",
      title: "Likupang Island Hopping — 2 Days 1 Night",
      description:
        "The islands off Likupang are quieter than Bunaken and shallower, which suits snorkellers and families. Two days is enough for three islands, a beach barbecue, and one night in a bungalow where the loudest thing is the water.",
      location: "Likupang, North Sulawesi",
      base_price: 2600000,
      price_usd: 165,
      duration_days: 2,
      duration_nights: 1,
      is_featured: false,
      cover_image: IMG.likupang,
      category: { slug: "marine", name: "Marine" },
      inclusions:
        "Bungalow (1 night)\nAll meals\nBoat and snorkel gear\nGuide\nTransfers from Manado",
      exclusions: "Flights\nAlcoholic drinks\nTips",
      itineraries: [
        {
          day_number: 1,
          title: "Three islands and a barbecue",
          description:
            "Two hours by road to Likupang, then out to Gangga and Lihaga. Snorkelling at both, lunch cooked on the sand, sunset from the bungalow deck.",
          hotel_info: "Likupang beach bungalow",
          meals_info: "Lunch, dinner",
        },
        {
          day_number: 2,
          title: "Morning swim and return",
          description:
            "An unhurried morning — swim, breakfast, one more short crossing if the sea is flat — then the drive back to Manado.",
          hotel_info: null,
          meals_info: "Breakfast, lunch",
        },
      ],
    },
  ],
  ko: [
    {
      slug: "bunaken-3d2n",
      title: "부나켄 해양공원 — 2박 3일",
      description:
        "부나켄의 수중 절벽은 1km 아래까지 떨어지고, 맑은 아침에는 시야가 30m를 넘습니다. 3일 동안 네 곳의 포인트에서 다이빙 또는 스노클링을 하고, 시내에서 오가는 대신 섬에서 묵으며, 보트 승무원이 만든 음식을 먹습니다.",
      location: "부나켄, 북술라웨시",
      base_price: 4200000,
      price_usd: 265,
      duration_days: 3,
      duration_nights: 2,
      is_featured: true,
      cover_image: IMG.bunaken,
      category: { slug: "marine", name: "해양" },
      inclusions: "섬 숙박 2박\n전 일정 식사\n보트 이동\n자격 보유 다이브 가이드\n국립공원 입장료",
      exclusions: "마나도까지 항공권\n장비 대여\n개인 경비\n팁",
      itineraries: [
        {
          day_number: 1,
          title: "도착과 첫 입수",
          description:
            "삼 라툴랑이 공항 픽업 후 항구까지 30분, 부나켄까지 배로 40분. 오후에는 하우스 리프에서 웨이트와 부력을 맞추는 체크 다이빙을 합니다.",
          hotel_info: "부나켄 해변 코티지",
          meals_info: "점심, 저녁",
        },
        {
          day_number: 2,
          title: "월 다이빙 두 번과 맹그로브",
          description:
            "오전에는 르쿠안 I과 후쿠이 포인트 — 르쿠안에서는 바다거북을 거의 확실히 만납니다. 오후는 느리게, 어린 물고기가 숨는 맹그로브 수로를 노 저어 지납니다.",
          hotel_info: "부나켄 해변 코티지",
          meals_info: "아침, 점심, 저녁",
        },
        {
          day_number: 3,
          title: "일출 다이빙과 귀환",
          description:
            "조류가 바뀌기 전 이른 다이빙 한 번, 그리고 늦은 오전에 마나도로 돌아옵니다. 공항 샌딩은 항공편 시간에 맞춥니다.",
          hotel_info: null,
          meals_info: "아침",
        },
      ],
    },
    {
      slug: "tomohon-volcano-market",
      title: "토모혼 화산 & 고원 시장 — 당일 투어",
      description:
        "마하우 화산 분화구 능선은 주차장에서 걸어서 20분입니다. 맑은 아침에는 한쪽으로 마나도 만이, 반대쪽으로 미나하사 고원이 보입니다. 이후 꽃밭을 지나 토모혼 시장으로 향합니다 — 강렬하고, 모두에게 편한 곳은 아닙니다.",
      location: "토모혼, 북술라웨시",
      base_price: 950000,
      price_usd: 60,
      duration_days: 1,
      duration_nights: 0,
      is_featured: true,
      cover_image: IMG.tomohon,
      category: { slug: "highland", name: "고원" },
      inclusions: "기사 포함 전용 차량\n영어 가이드\n점심\n입장료\n생수",
      exclusions: "숙박\n개인 쇼핑\n팁",
      itineraries: [
        {
          day_number: 1,
          title: "분화구, 꽃, 그리고 시장",
          description:
            "구름이 끼기 전 06:30에 마나도 출발. 마하우 분화구 능선, 빛에 따라 색이 바뀌는 리노우 호수, 그리고 토모혼 시장을 거쳐 늦은 오후에 돌아옵니다.",
          hotel_info: null,
          meals_info: "점심",
        },
      ],
    },
    {
      slug: "likupang-island-hopping",
      title: "리쿠팡 아일랜드 호핑 — 1박 2일",
      description:
        "리쿠팡 앞바다의 섬들은 부나켄보다 조용하고 수심이 얕아 스노클러와 가족 여행에 잘 맞습니다. 이틀이면 섬 세 곳과 해변 바비큐, 그리고 파도 소리가 가장 큰 소음인 방갈로에서의 하룻밤에 충분합니다.",
      location: "리쿠팡, 북술라웨시",
      base_price: 2600000,
      price_usd: 165,
      duration_days: 2,
      duration_nights: 1,
      is_featured: false,
      cover_image: IMG.likupang,
      category: { slug: "marine", name: "해양" },
      inclusions: "방갈로 1박\n전 일정 식사\n보트 및 스노클 장비\n가이드\n마나도 왕복 이동",
      exclusions: "항공권\n주류\n팁",
      itineraries: [
        {
          day_number: 1,
          title: "세 개의 섬과 바비큐",
          description:
            "육로로 두 시간 달려 리쿠팡, 이어 강가섬과 리하가섬으로. 두 곳 모두에서 스노클링, 모래 위에서 지은 점심, 방갈로 데크에서 보는 일몰.",
          hotel_info: "리쿠팡 해변 방갈로",
          meals_info: "점심, 저녁",
        },
        {
          day_number: 2,
          title: "아침 수영과 귀환",
          description:
            "서두르지 않는 아침 — 수영, 식사, 바다가 잔잔하면 짧은 항해 한 번 더 — 그리고 마나도로 돌아갑니다.",
          hotel_info: null,
          meals_info: "아침, 점심",
        },
      ],
    },
  ],
  zh: [
    {
      slug: "bunaken-3d2n",
      title: "布纳肯海洋公园 — 3天2晚",
      description:
        "布纳肯的水下峭壁垂直落差超过一公里，天气好的清晨能见度可达三十米以上。三天里潜水或浮潜四个点位，住在岛上而不是每天从市区往返，吃船员现做的饭菜。",
      location: "布纳肯，北苏拉威西",
      base_price: 4200000,
      price_usd: 265,
      duration_days: 3,
      duration_nights: 2,
      is_featured: true,
      cover_image: IMG.bunaken,
      category: { slug: "marine", name: "海洋" },
      inclusions: "岛上住宿两晚\n全程餐食\n船只接驳\n持证潜导\n国家公园门票",
      exclusions: "往返美娜多机票\n潜水装备租赁\n个人消费\n小费",
      itineraries: [
        {
          day_number: 1,
          title: "抵达与首潜",
          description:
            "沙姆拉图兰吉机场接机，车程三十分钟到码头，再乘船四十分钟抵达布纳肯。下午在近岸礁做适应潜，调整配重与中性浮力。",
          hotel_info: "布纳肯海滨小屋",
          meals_info: "午餐、晚餐",
        },
        {
          day_number: 2,
          title: "两次峭壁潜水与红树林",
          description:
            "上午前往勒库安一号与福井角 —— 在勒库安几乎必见海龟。下午节奏放慢，划过红树林水道，那里是幼鱼的庇护所。",
          hotel_info: "布纳肯海滨小屋",
          meals_info: "早餐、午餐、晚餐",
        },
        {
          day_number: 3,
          title: "日出潜水与返程",
          description:
            "趁水流转向前完成一次清晨潜水，上午晚些时候返回美娜多。送机时间按您的航班安排。",
          hotel_info: null,
          meals_info: "早餐",
        },
      ],
    },
    {
      slug: "tomohon-volcano-market",
      title: "托莫洪火山与高地市场 — 一日游",
      description:
        "从停车场步行二十分钟即可抵达马哈武火山口边缘。晴朗的清晨，一侧是美娜多湾，另一侧是米纳哈萨高地。之后穿过花田前往托莫洪市场 —— 冲击力十足，并非人人都能适应。",
      location: "托莫洪，北苏拉威西",
      base_price: 950000,
      price_usd: 60,
      duration_days: 1,
      duration_nights: 0,
      is_featured: true,
      cover_image: IMG.tomohon,
      category: { slug: "highland", name: "高地" },
      inclusions: "专车及司机\n英语导游\n午餐\n门票\n瓶装水",
      exclusions: "住宿\n个人购物\n小费",
      itineraries: [
        {
          day_number: 1,
          title: "火山口、花田与市场",
          description:
            "06:30 从美娜多出发，赶在云层升起之前。马哈武火山口边缘，随后是随光线变色的利瑙湖，再到托莫洪市场，傍晚前返回。",
          hotel_info: null,
          meals_info: "午餐",
        },
      ],
    },
    {
      slug: "likupang-island-hopping",
      title: "利库邦跳岛 — 2天1晚",
      description:
        "利库邦外海的岛屿比布纳肯更安静、水更浅，适合浮潜者与家庭出行。两天足够走三座岛、来一场沙滩烧烤，并在一间以海浪声为最大噪音的木屋住上一晚。",
      location: "利库邦，北苏拉威西",
      base_price: 2600000,
      price_usd: 165,
      duration_days: 2,
      duration_nights: 1,
      is_featured: false,
      cover_image: IMG.likupang,
      category: { slug: "marine", name: "海洋" },
      inclusions: "木屋住宿一晚\n全程餐食\n船只与浮潜装备\n导游\n美娜多往返接送",
      exclusions: "机票\n酒精饮品\n小费",
      itineraries: [
        {
          day_number: 1,
          title: "三座岛与一场烧烤",
          description:
            "车行两小时抵达利库邦，随后出海前往甘加岛与利哈加岛。两处均可浮潜，午餐在沙滩上现做，日落在木屋平台上看。",
          hotel_info: "利库邦海滩木屋",
          meals_info: "午餐、晚餐",
        },
        {
          day_number: 2,
          title: "晨泳与返程",
          description:
            "不赶时间的早晨 —— 游泳、早餐，海面平静的话再来一次短程出海 —— 然后驱车返回美娜多。",
          hotel_info: null,
          meals_info: "早餐、午餐",
        },
      ],
    },
  ],
  fr: [],
  de: [],
  it: [],
  es: [],
  nl: [],
};

export function getTours(locale: Locale): Tour[] {
  return TOURS[locale] ?? [];
}

export function getTour(locale: Locale, slug: string): Tour | undefined {
  return getTours(locale).find((t) => t.slug === slug);
}

/** Slug yang punya terjemahan di locale ini — dipakai `generateStaticParams`. */
export function getTourSlugs(locale: Locale): string[] {
  return getTours(locale).map((t) => t.slug);
}
