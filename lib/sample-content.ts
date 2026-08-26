import type { Locale } from "./locales";

/**
 * DATA CONTOH — SEMENTARA, AKAN DIBUANG.
 * Pengganti: `/api/intl/blog`, `/api/intl/gallery`, `/api/intl/about`.
 * Bentuk tipe dicocokkan dengan resource yang bersangkutan di api_wm.
 */

// ─── Blog ────────────────────────────────────────────────────────────────

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image: string;
  author: string;
  published_at: string;
  category: { slug: string; name: string } | null;
};

const BLOG_IMG = {
  diving: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=70",
  market: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=70",
  season: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=70",
};

type BlogSeed = { title: string; excerpt: string; content: string; category: string };

const BLOG: Record<Locale, BlogSeed[]> = {
  en: [
    {
      title: "When to dive Bunaken, and when not to",
      excerpt: "Visibility, currents, and the months most divers get wrong.",
      content:
        "Bunaken is diveable all year, which is why people assume any week is as good as another. It is not. March through October brings the flattest seas and visibility that regularly passes thirty metres.\n\nNovember to February is the wet season. Dives still happen most days, but afternoon rain stirs the surface and the crossing from Manado gets bumpy. If those months are your only option, book mornings and keep a spare day.",
      category: "Diving",
    },
    {
      title: "Eating in Tomohon without regretting it",
      excerpt: "The market is famous for the wrong reasons. Here is what to actually order.",
      content:
        "Tomohon market gets written about for its extreme meat section, and visitors arrive braced for it. That is one corner of a large market, and it is easy to skip.\n\nWhat is worth your time is the produce: highland vegetables that reach Manado a day later and cost twice as much, chillies in six varieties, and the cinnamon and cloves this region has traded for centuries. Eat at the warungs on the far side.",
      category: "Food",
    },
    {
      title: "Getting to Manado from Singapore and Seoul",
      excerpt: "Routes, connections, and how long the transfers actually take.",
      content:
        "Sam Ratulangi airport takes international flights from Singapore and, seasonally, direct charters from several East Asian cities. From Singapore the flight is under four hours.\n\nFrom Seoul most travellers connect through Singapore or Jakarta. Allow three hours for the Jakarta transfer — domestic and international terminals are separate and the shuttle is slow at peak times.",
      category: "Travel tips",
    },
  ],
  ko: [
    {
      title: "부나켄 다이빙, 언제 가고 언제 피할까",
      excerpt: "시야, 조류, 그리고 많은 다이버가 잘못 고르는 달.",
      content:
        "부나켄은 일 년 내내 다이빙이 가능합니다. 그래서 어느 주에 가든 비슷하리라 여기기 쉽지만, 그렇지 않습니다. 3월부터 10월까지가 바다가 가장 잔잔하고, 시야가 30미터를 넘는 날이 잦습니다.\n\n11월부터 2월은 우기입니다. 대부분의 날에 다이빙은 진행되지만 오후 비가 수면을 흔들고 마나도에서 건너오는 뱃길이 거칠어집니다. 이 시기밖에 시간이 없다면 오전 일정으로 잡고 예비일을 하루 두세요.",
      category: "다이빙",
    },
    {
      title: "후회 없이 토모혼에서 먹기",
      excerpt: "시장이 유명해진 이유는 엉뚱합니다. 실제로 무엇을 주문할지 알려드립니다.",
      content:
        "토모혼 시장은 극단적인 육류 코너로 회자되고, 방문객은 그것을 각오하고 옵니다. 하지만 그곳은 넓은 시장의 한 귀퉁이일 뿐이고, 지나치기도 쉽습니다.\n\n시간을 들일 만한 것은 농산물입니다. 하루 뒤 마나도에 도착해 두 배 값이 되는 고원 채소, 여섯 종류의 고추, 그리고 이 지역이 수백 년간 거래해온 계피와 정향. 식사는 시장 반대편 와룽에서 하세요.",
      category: "음식",
    },
    {
      title: "싱가포르와 서울에서 마나도 가는 법",
      excerpt: "노선, 환승, 그리고 실제로 걸리는 시간.",
      content:
        "삼 라툴랑이 공항은 싱가포르에서 오는 국제선을 받고, 시기에 따라 동아시아 여러 도시에서 직항 전세기가 들어옵니다. 싱가포르에서는 네 시간이 채 걸리지 않습니다.\n\n서울에서는 대개 싱가포르나 자카르타를 경유합니다. 자카르타 환승은 세 시간을 잡으세요 — 국내선과 국제선 터미널이 분리되어 있고 혼잡 시간대에는 셔틀이 느립니다.",
      category: "여행 팁",
    },
  ],
  zh: [
    {
      title: "布纳肯潜水，什么时候该去，什么时候别去",
      excerpt: "能见度、水流，以及多数潜水者选错的月份。",
      content:
        "布纳肯全年可潜，于是人们以为哪一周都差不多。并非如此。三月到十月海面最平静，能见度常常超过三十米。\n\n十一月到二月是雨季。多数日子仍能下水，但午后的雨会搅动水面，从美娜多过来的航程也会颠簸。如果只有这几个月有空，请订上午的行程，并多留一天备用。",
      category: "潜水",
    },
    {
      title: "在托莫洪吃得不后悔",
      excerpt: "这座市场出名的理由并不对。这里告诉你该点什么。",
      content:
        "托莫洪市场因其极端的肉类区被反复书写，游客往往做足心理准备而来。那其实只是一个大市场的一角，绕开并不难。\n\n真正值得花时间的是农产品：隔天运到美娜多便贵一倍的高地蔬菜、六个品种的辣椒，以及这一带交易了数百年的肉桂与丁香。用餐请到市场另一头的小馆子。",
      category: "美食",
    },
    {
      title: "从新加坡与首尔前往美娜多",
      excerpt: "航线、中转，以及实际所需时间。",
      content:
        "沙姆拉图兰吉机场承接来自新加坡的国际航班，并在特定季节有来自东亚多座城市的直飞包机。从新加坡飞行不到四小时。\n\n从首尔出发多经新加坡或雅加达中转。雅加达中转请预留三小时 —— 国内与国际航站楼分开，高峰时段摆渡车很慢。",
      category: "旅行贴士",
    },
  ],
  fr: [], de: [], it: [], es: [], nl: [],
} as Record<Locale, BlogSeed[]>;

const BLOG_META = [
  { slug: "when-to-dive-bunaken", image: BLOG_IMG.diving, date: "2026-07-14", catSlug: "diving" },
  { slug: "eating-in-tomohon", image: BLOG_IMG.market, date: "2026-06-02", catSlug: "food" },
  { slug: "getting-to-manado", image: BLOG_IMG.season, date: "2026-04-21", catSlug: "travel-tips" },
];

export function getPosts(locale: Locale): BlogPost[] {
  const seeds = BLOG[locale] ?? [];
  if (seeds.length === 0) return [];

  return seeds.map((s, i) => ({
    slug: BLOG_META[i].slug,
    title: s.title,
    excerpt: s.excerpt,
    content: s.content,
    featured_image: BLOG_META[i].image,
    author: "Welcome Manado",
    published_at: BLOG_META[i].date,
    category: { slug: BLOG_META[i].catSlug, name: s.category },
  }));
}

export function getPost(locale: Locale, slug: string): BlogPost | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}

// ─── Galeri ──────────────────────────────────────────────────────────────

export type GalleryItem = { id: number; title: string; image_path: string };

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=70",
];

const GALLERY_TITLES: Record<Locale, string[]> = {
  en: ["Bunaken wall", "Tomohon crater rim", "Likupang shoreline", "Reef at first light", "Lake Linow", "Manado bay at dusk"],
  ko: ["부나켄 수중 절벽", "토모혼 분화구 능선", "리쿠팡 해안", "동틀 녘의 산호초", "리노우 호수", "해질 무렵 마나도 만"],
  zh: ["布纳肯峭壁", "托莫洪火山口", "利库邦海岸", "晨光中的珊瑚礁", "利瑙湖", "黄昏的美娜多湾"],
  fr: [], de: [], it: [], es: [], nl: [],
} as Record<Locale, string[]>;

export function getGallery(locale: Locale): GalleryItem[] {
  return (GALLERY_TITLES[locale] ?? []).map((title, i) => ({
    id: i + 1,
    title,
    image_path: GALLERY_IMAGES[i],
  }));
}

// ─── Profil perusahaan ───────────────────────────────────────────────────

export type Story = {
  title_lead: string;
  title_accent: string;
  paragraph_one: string;
  paragraph_two: string;
  experience_value: string;
  experience_label: string;
  travelers_value: string;
  travelers_label: string;
};

export type TeamMember = { name: string; position: string | null; image_url: string };

const STORY: Record<Locale, Story | null> = {
  en: {
    title_lead: "About",
    title_accent: "us",
    paragraph_one:
      "Welcome Manado began as a handful of guides taking visitors out to Bunaken because the boats leaving the public jetty were unreliable and nobody explained the reef. That has not changed much — we still think a trip is only as good as the person running it.",
    paragraph_two:
      "Today we run tours across North Sulawesi: diving off Bunaken and Lembeh, the volcanoes and markets of the Minahasa highlands, and the quieter islands off Likupang. This site exists because international visitors kept asking for the same thing in their own language.",
    experience_value: "12+",
    experience_label: "Years guiding",
    travelers_value: "9,000+",
    travelers_label: "Travellers hosted",
  },
  ko: {
    title_lead: "우리를",
    title_accent: "소개합니다",
    paragraph_one:
      "Welcome Manado는 몇 명의 가이드가 방문객을 부나켄으로 데려가면서 시작됐습니다. 공용 선착장에서 출발하는 배는 미덥지 않았고, 산호초를 설명해주는 사람도 없었기 때문입니다. 그 생각은 지금도 같습니다 — 여행의 질은 결국 그것을 이끄는 사람에게 달려 있습니다.",
    paragraph_two:
      "지금은 북술라웨시 전역에서 투어를 운영합니다. 부나켄과 렘베의 다이빙, 미나하사 고원의 화산과 시장, 그리고 리쿠팡 앞바다의 한적한 섬들. 이 사이트는 해외에서 오신 분들이 자신의 언어로 같은 것을 계속 요청해왔기에 만들어졌습니다.",
    experience_value: "12년+",
    experience_label: "가이드 경력",
    travelers_value: "9,000명+",
    travelers_label: "함께한 여행자",
  },
  zh: {
    title_lead: "关于",
    title_accent: "我们",
    paragraph_one:
      "Welcome Manado 起初只是几位向导带着访客前往布纳肯 —— 因为从公共码头出发的船并不可靠，也没有人讲解那片珊瑚礁。这个想法至今未变：一趟旅程的好坏，取决于带队的人。",
    paragraph_two:
      "如今我们的行程遍及北苏拉威西：布纳肯与楞贝的潜水、米纳哈萨高地的火山与市场，以及利库邦外海更安静的岛屿。这个网站之所以存在，是因为海外访客不断用自己的语言提出同样的请求。",
    experience_value: "12年+",
    experience_label: "带团经验",
    travelers_value: "9,000+",
    travelers_label: "接待旅客",
  },
  fr: null, de: null, it: null, es: null, nl: null,
};

const TEAM_POSITIONS: Record<Locale, (string | null)[]> = {
  en: ["Founder", "Head guide", "Dive instructor"],
  ko: ["설립자", "수석 가이드", "다이빙 강사"],
  zh: ["创始人", "首席向导", "潜水教练"],
  fr: [], de: [], it: [], es: [], nl: [],
} as Record<Locale, (string | null)[]>;

const TEAM_NAMES = ["Marchelino Raco", "Yunita Theresya", "Andre Lumingkewas"];
const TEAM_IMAGES = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=70",
];

export function getStory(locale: Locale): Story | null {
  return STORY[locale] ?? null;
}

export function getTeam(locale: Locale): TeamMember[] {
  const positions = TEAM_POSITIONS[locale] ?? [];
  if (positions.length === 0) return [];

  return TEAM_NAMES.map((name, i) => ({
    name,
    position: positions[i] ?? null,
    image_url: TEAM_IMAGES[i],
  }));
}
