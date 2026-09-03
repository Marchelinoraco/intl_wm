import type { Locale } from "../locales";

/**
 * Isi halaman /tours/shore-excursions/ — satu-satunya halaman dengan prosa
 * panjang yang tidak datang dari API. Dipisah dari lib/dictionary.ts supaya
 * kamus UI tetap ramping.
 *
 * Sasaran pencarian: "Bitung shore excursion", "shore excursion Manado",
 * "Bitung cruise port tour", + padanannya di bahasa Eropa & Asia.
 *
 * `Record<Locale, …>` — bahasa yang hilang menggagalkan `tsc`.
 */
export type ShoreExcursionCopy = {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  title: string;
  intro: [string, string];
  whyTitle: string;
  why: { title: string; text: string }[];
  pickTitle: string;
  pickLede: string;
  infoTitle: string;
  info: { title: string; text: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  chatSubject: string;
  /** Banner di /tours/ yang menautkan ke halaman ini. */
  landingTeaser: string;
  landingCta: string;
};

/**
 * Paket day-tour yang cocok untuk satu kali sandar kapal pesiar di Bitung
 * (tanpa menginap, jarak masuk akal dari pelabuhan). Urutan = urutan tampil.
 * Slug yang tidak ada di sebuah bahasa cukup dilewati.
 */
export const SHORE_EXCURSION_SLUGS = [
  "waruga-heritage-batu-angus-coastal-escape",
  "tangkoko-nature-reserve-tour-tunan-waterfall",
  "manado-city-tour-luch-with-manados-special-dishes",
  "minahasa-highland-tour",
  "bunaken-island-sightseeing-tour",
  "island-hopping-paradise-bunaken-siladen-nain-escape",
] as const;

export const SHORE_EXCURSIONS: Record<Locale, ShoreExcursionCopy> = {
  en: {
    metaTitle: "Shore Excursions from Bitung Cruise Port | Welcome Manado Tours",
    metaDescription:
      "Private, small-group shore excursions from Bitung port — Tangkoko wildlife, the Minahasa highlands, Manado city and Bunaken. Local guides, timed to your ship, back on board with time to spare.",
    badge: "Bitung Cruise Port",
    title: "Shore Excursions from Bitung",
    intro: [
      "Your ship docks at Bitung, on the eastern shore of North Sulawesi. It is a working container port with little to see on foot — but Manado, the Minahasa highlands and the Tangkoko rainforest are all within an hour's drive, and a well-planned day ashore reaches any one of them.",
      "We are a local operator based in Manado. Our shore excursions run in private cars or small groups, not fifty-seat coaches; your guide grew up here; and every itinerary is built backwards from your all-aboard time, with a guarantee that you are back at the gangway with time to spare.",
    ],
    whyTitle: "Why book direct",
    why: [
      { title: "Private or small group", text: "A car for your family or a group of eight — never a packed coach. You set the pace and choose where to linger." },
      { title: "Guides from here", text: "Minahasan guides who know the back roads, the best warung for lunch, and where the tarsiers sleep." },
      { title: "Timed to your ship", text: "We track your arrival and all-aboard times and plan the day around them, not around a fixed group schedule." },
      { title: "Better value", text: "Booking direct with the operator costs less than the same route sold through the cruise line or a reseller." },
    ],
    pickTitle: "Recommended for a day ashore",
    pickLede: "Day tours that fit a typical port call. Tell us your ship and hours and we will tailor the route.",
    infoTitle: "Before you book",
    info: [
      { title: "Meeting point", text: "Your guide meets you at the Bitung port exit with a Welcome Manado sign, right after the shuttle drop-off." },
      { title: "How long you have", text: "Most calls at Bitung run 8 to 10 hours — enough for Tangkoko, a highlands loop, or Manado city with Bunaken: one major site done properly, plus lunch." },
      { title: "Getting around", text: "Bitung to Tangkoko is about 45 minutes; to Manado about an hour; to Tomohon and the highlands about 90 minutes. Roads are paved and in good condition." },
      { title: "What to bring", text: "Light clothing, walking shoes, sun protection, insect repellent for Tangkoko, and some rupiah for entrance fees and drinks. We arrange everything else." },
    ],
    faqTitle: "Questions",
    faq: [
      { q: "Will I be back before the ship leaves?", a: "Yes. Every itinerary is built from your all-aboard time with a buffer added. If the captain moves the departure, we adjust on the day." },
      { q: "Is this cheaper than the cruise line's excursion?", a: "For the same route, booking direct with us is normally less, and you travel in a small group or private car rather than a large coach." },
      { q: "What if the port call is cancelled?", a: "If the call is cancelled by the cruise line or missed due to weather, you pay nothing. Send your booking reference and we confirm timing a few days before arrival." },
      { q: "Can we see Tangkoko and Manado in one day?", a: "Tangkoko alone is a full day. If you want wildlife and the city, we suggest Tangkoko plus the Waruga stone tombs and the Batu Angus lava field on the way back — all close to Bitung." },
      { q: "How large a group can you take?", a: "Anything from a couple to a group of twenty. Private cars for small parties, minibuses for larger groups; the same guide stays with you all day." },
      { q: "How does payment work?", a: "A small deposit confirms the booking; the balance is paid in cash to your guide at the end of the tour, or by transfer beforehand if you prefer." },
    ],
    ctaTitle: "Tell us your ship and dates",
    ctaText: "Send your cruise line, ship name and port date. We reply with a route, a price and a pickup plan — usually within a few hours.",
    chatSubject: "Shore excursion from Bitung cruise port",
    landingTeaser: "Arriving by cruise ship at Bitung?",
    landingCta: "Shore excursions",
  },

  ko: {
    metaTitle: "비퉁 크루즈 항구 기항지 투어 | 웰컴 마나도 투어",
    metaDescription:
      "비퉁 항에서 출발하는 프라이빗·소그룹 기항지 투어 — 탕코코 야생동물, 미나하사 고원, 마나도 시티, 부나켄. 현지 가이드, 배 시간에 맞춘 일정, 여유 있게 승선 복귀.",
    badge: "비퉁 크루즈 항구",
    title: "비퉁 출발 기항지 투어",
    intro: [
      "크루즈선은 북술라웨시 동쪽 해안의 비퉁에 정박합니다. 컨테이너 항구라 걸어서 볼 것은 많지 않지만, 마나도와 미나하사 고원, 탕코코 열대우림은 모두 차로 한 시간 안에 있으며, 잘 짜인 하루면 그중 한 곳을 충분히 둘러볼 수 있습니다.",
      "저희는 마나도에 본사를 둔 현지 여행사입니다. 기항지 투어는 50인승 대형 버스가 아니라 프라이빗 차량이나 소그룹으로 진행되고, 가이드는 이곳에서 자란 현지인이며, 모든 일정은 승선 마감 시각을 기준으로 거꾸로 계산해 짜기 때문에 여유 있게 배로 돌아옵니다.",
    ],
    whyTitle: "직접 예약하는 이유",
    why: [
      { title: "프라이빗 또는 소그룹", text: "가족 단위 차량이나 8인 소그룹 — 만원 버스는 없습니다. 속도는 손님이 정하고, 머물고 싶은 곳에서 더 머뭅니다." },
      { title: "현지 출신 가이드", text: "샛길과 현지 맛집, 안경원숭이가 잠자는 자리까지 아는 미나하사 가이드." },
      { title: "배 시간에 맞춘 일정", text: "입항·승선 마감 시각을 확인해 그에 맞춰 하루를 계획합니다. 정해진 단체 일정이 아닙니다." },
      { title: "합리적인 가격", text: "여행사에 직접 예약하면 같은 코스를 크루즈사나 중개업체를 통해 사는 것보다 저렴합니다." },
    ],
    pickTitle: "기항일 추천 코스",
    pickLede: "일반적인 기항 시간에 맞는 당일 투어입니다. 선박명과 정박 시간을 알려주시면 동선을 맞춰 드립니다.",
    infoTitle: "예약 전 확인",
    info: [
      { title: "미팅 장소", text: "셔틀 하차 지점 바로 앞, 비퉁 항 출구에서 웰컴 마나도 팻말을 든 가이드가 맞이합니다." },
      { title: "체류 시간", text: "비퉁 기항은 보통 8~10시간입니다. 탕코코, 고원 순환, 또는 마나도 시티+부나켄 중 한 곳을 점심까지 포함해 제대로 볼 수 있는 시간입니다." },
      { title: "이동 시간", text: "비퉁에서 탕코코까지 약 45분, 마나도까지 약 1시간, 토모혼·고원까지 약 90분. 도로는 포장되어 있고 상태가 좋습니다." },
      { title: "준비물", text: "가벼운 옷, 운동화, 자외선 차단, 탕코코용 모기 기피제, 입장료·음료용 현금 약간. 나머지는 저희가 준비합니다." },
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      { q: "배가 떠나기 전에 돌아올 수 있나요?", a: "네. 모든 일정은 승선 마감 시각을 기준으로 여유 시간을 더해 짭니다. 선장이 출항을 앞당기면 당일 조정합니다." },
      { q: "크루즈사 투어보다 저렴한가요?", a: "같은 코스라면 직접 예약이 대체로 더 저렴하고, 대형 버스가 아닌 소그룹·프라이빗 차량으로 이동합니다." },
      { q: "기항이 취소되면요?", a: "크루즈사 사정이나 기상으로 기항이 취소·불발되면 비용은 없습니다. 예약 번호를 보내주시면 도착 며칠 전에 시간을 확정합니다." },
      { q: "하루에 탕코코와 마나도를 다 볼 수 있나요?", a: "탕코코만으로 하루가 찹니다. 야생동물과 도시를 함께 원하시면, 돌아오는 길에 비퉁 근처의 와루가 석관과 바투 앙우스 용암지대를 더한 탕코코 코스를 권합니다." },
      { q: "몇 명까지 가능한가요?", a: "2명부터 20명까지 가능합니다. 소규모는 프라이빗 차량, 큰 그룹은 미니버스로 진행하며 같은 가이드가 하루 종일 동행합니다." },
      { q: "결제는 어떻게 하나요?", a: "소액 예약금으로 확정하고, 잔금은 투어가 끝날 때 가이드에게 현금으로 내시거나 원하시면 사전 송금하시면 됩니다." },
    ],
    ctaTitle: "선박명과 날짜를 알려주세요",
    ctaText: "크루즈사, 선박명, 기항 날짜를 보내주시면 동선과 가격, 픽업 계획을 보통 몇 시간 안에 회신드립니다.",
    chatSubject: "비퉁 크루즈 항구 기항지 투어",
    landingTeaser: "비퉁에 크루즈로 오시나요?",
    landingCta: "기항지 투어 보기",
  },

  zh: {
    metaTitle: "美娜多比通邮轮港岸上观光 | Welcome Manado Tours",
    metaDescription:
      "从比通港出发的私人小团岸上观光 —— 塔科科野生动物、米纳哈萨高原、美娜多市区与布纳肯。本地向导，按邮轮时间安排，从容返船。",
    badge: "比通邮轮港",
    title: "比通出发的岸上观光",
    intro: [
      "邮轮停靠在北苏拉威西东岸的比通。这是一座货运港口，步行范围内没什么可看 —— 但美娜多、米纳哈萨高原和塔科科雨林都在一小时车程之内，安排得当的一天足以深入其中任意一处。",
      "我们是总部设在美娜多的本地旅行社。岸上观光用私家车或小团出行，而非五十座大巴；向导在本地长大；每条行程都从您的返船截止时间倒推安排，确保您从容回到舷梯旁。",
    ],
    whyTitle: "为什么直接预订",
    why: [
      { title: "私人或小团", text: "一辆车供一家人或八人小团 —— 绝不挤大巴。节奏由您决定，想在哪里多留就多留。" },
      { title: "本地向导", text: "熟悉小路、最好的路边食摊，还知道眼镜猴在哪里栖息的米纳哈萨向导。" },
      { title: "按邮轮时间", text: "我们核对您的抵港与返船截止时间，围绕它来规划这一天，而不是套用固定的团队日程。" },
      { title: "更划算", text: "直接向旅行社预订，比通过邮轮公司或代理购买同样的线路更便宜。" },
    ],
    pickTitle: "适合当天靠港的推荐线路",
    pickLede: "符合一般靠港时长的一日游。告诉我们船名和停靠时间，我们为您调整行程。",
    infoTitle: "预订前须知",
    info: [
      { title: "集合地点", text: "向导会在比通港出口、接驳车下客点旁举着 Welcome Manado 的牌子迎接您。" },
      { title: "在岸时间", text: "比通靠港通常为 8 至 10 小时 —— 足够完成塔科科、高原环线，或美娜多市区加布纳肯:把一处主要景点走深走透，再加一顿午餐。" },
      { title: "路程", text: "比通到塔科科约 45 分钟，到美娜多约 1 小时,到托莫洪和高原约 90 分钟。道路已铺装,路况良好。" },
      { title: "携带物品", text: "轻便衣物、步行鞋、防晒、去塔科科用的驱蚊液,以及一些现金支付门票和饮料。其余由我们安排。" },
    ],
    faqTitle: "常见问题",
    faq: [
      { q: "我能在开船前回到船上吗?", a: "可以。每条行程都以您的返船截止时间为准并预留缓冲。若船长提前开船,我们当天调整。" },
      { q: "比邮轮公司的岸上团便宜吗?", a: "同样的线路,直接向我们预订通常更便宜,而且是小团或私家车出行,而非大型旅游巴士。" },
      { q: "如果靠港取消怎么办?", a: "若邮轮公司取消靠港或因天气未能停靠,您无需付费。把预订编号发给我们,我们会在抵达前几天确认时间。" },
      { q: "一天能同时看塔科科和美娜多吗?", a: "光是塔科科就要一整天。若想兼顾野生动物和城市,建议在返程途中于塔科科线路加入比通附近的瓦鲁加石棺和巴图安古斯熔岩地。" },
      { q: "最多可以接待多少人?", a: "从两人到二十人都可以。小团用私家车,大团用中巴,同一位向导全天陪同。" },
      { q: "如何付款?", a: "小额订金确认预订;尾款在行程结束时以现金付给向导,或您愿意的话提前转账。" },
    ],
    ctaTitle: "告诉我们船名和日期",
    ctaText: "发来您的邮轮公司、船名和靠港日期,我们通常几小时内回复线路、报价和接人安排。",
    chatSubject: "比通邮轮港岸上观光",
    landingTeaser: "乘邮轮抵达比通?",
    landingCta: "查看岸上观光",
  },

  fr: {
    metaTitle: "Excursions depuis le port de croisière de Bitung | Welcome Manado Tours",
    metaDescription:
      "Excursions privées en petit groupe depuis le port de Bitung : la faune de Tangkoko, les hauts plateaux Minahasa, la ville de Manado et Bunaken. Guides locaux, horaires calés sur votre navire, retour à bord sans stress.",
    badge: "Port de croisière de Bitung",
    title: "Excursions depuis Bitung",
    intro: [
      "Votre navire accoste à Bitung, sur la côte est du Nord-Sulawesi. C'est un port de conteneurs où il y a peu à voir à pied — mais Manado, les hauts plateaux Minahasa et la forêt de Tangkoko sont tous à moins d'une heure de route, et une journée bien organisée permet d'en découvrir un à fond.",
      "Nous sommes un opérateur local basé à Manado. Nos excursions se font en voiture privée ou en petit groupe, pas en autocar de cinquante places ; votre guide a grandi ici ; et chaque itinéraire est construit à rebours de votre heure de rembarquement, avec la garantie d'être de retour à la passerelle bien avant.",
    ],
    whyTitle: "Pourquoi réserver en direct",
    why: [
      { title: "Privé ou petit groupe", text: "Une voiture pour votre famille ou un groupe de huit — jamais un car bondé. Vous fixez le rythme et choisissez où vous attarder." },
      { title: "Des guides d'ici", text: "Des guides minahasa qui connaissent les petites routes, le meilleur warung pour déjeuner et où dorment les tarsiers." },
      { title: "Calé sur votre navire", text: "Nous suivons vos heures d'arrivée et de rembarquement et organisons la journée autour, pas selon un horaire de groupe figé." },
      { title: "Meilleur rapport qualité-prix", text: "Réserver en direct auprès de l'opérateur coûte moins cher que le même parcours vendu par la compagnie ou un revendeur." },
    ],
    pickTitle: "Recommandé pour une journée à terre",
    pickLede: "Des excursions à la journée adaptées à une escale classique. Dites-nous votre navire et vos horaires, nous ajustons l'itinéraire.",
    infoTitle: "Avant de réserver",
    info: [
      { title: "Point de rendez-vous", text: "Votre guide vous attend à la sortie du port de Bitung avec une pancarte Welcome Manado, juste après la dépose des navettes." },
      { title: "Le temps dont vous disposez", text: "La plupart des escales à Bitung durent 8 à 10 heures — de quoi faire Tangkoko, une boucle dans les hauts plateaux, ou Manado et Bunaken : un site majeur fait correctement, plus le déjeuner." },
      { title: "Les distances", text: "Bitung–Tangkoko : environ 45 minutes ; Bitung–Manado : environ une heure ; Bitung–Tomohon et les hauts plateaux : environ 90 minutes. Routes goudronnées et en bon état." },
      { title: "À emporter", text: "Vêtements légers, chaussures de marche, protection solaire, anti-moustiques pour Tangkoko et quelques roupies pour les entrées et les boissons. Nous nous occupons du reste." },
    ],
    faqTitle: "Questions",
    faq: [
      { q: "Serai-je de retour avant le départ du navire ?", a: "Oui. Chaque itinéraire part de votre heure de rembarquement, avec une marge ajoutée. Si le commandant avance le départ, nous adaptons le jour même." },
      { q: "Est-ce moins cher que l'excursion de la compagnie ?", a: "Pour le même parcours, réserver en direct chez nous revient généralement moins cher, et vous voyagez en petit groupe ou en voiture privée plutôt qu'en grand autocar." },
      { q: "Et si l'escale est annulée ?", a: "Si l'escale est annulée par la compagnie ou manquée à cause de la météo, vous ne payez rien. Envoyez votre référence de réservation ; nous confirmons les horaires quelques jours avant l'arrivée." },
      { q: "Peut-on voir Tangkoko et Manado le même jour ?", a: "Tangkoko occupe déjà une journée entière. Pour la faune et la ville, nous conseillons Tangkoko avec les tombes de pierre de Waruga et le champ de lave de Batu Angus au retour — tout près de Bitung." },
      { q: "Quelle taille de groupe acceptez-vous ?", a: "De deux personnes à un groupe de vingt. Voitures privées pour les petits groupes, minibus pour les plus grands ; le même guide reste avec vous toute la journée." },
      { q: "Comment se passe le paiement ?", a: "Un petit acompte confirme la réservation ; le solde se règle en espèces au guide à la fin de l'excursion, ou par virement au préalable si vous préférez." },
    ],
    ctaTitle: "Dites-nous votre navire et vos dates",
    ctaText: "Envoyez votre compagnie, le nom du navire et la date d'escale. Nous répondons avec un itinéraire, un prix et un plan de prise en charge — généralement en quelques heures.",
    chatSubject: "Excursion depuis le port de croisière de Bitung",
    landingTeaser: "Vous arrivez en croisière à Bitung ?",
    landingCta: "Voir les excursions",
  },

  de: {
    metaTitle: "Landausflüge ab dem Kreuzfahrthafen Bitung | Welcome Manado Tours",
    metaDescription:
      "Private Landausflüge in kleiner Gruppe ab dem Hafen Bitung: Tierwelt in Tangkoko, das Minahasa-Hochland, die Stadt Manado und Bunaken. Einheimische Guides, auf Ihr Schiff abgestimmt, rechtzeitig zurück an Bord.",
    badge: "Kreuzfahrthafen Bitung",
    title: "Landausflüge ab Bitung",
    intro: [
      "Ihr Schiff legt in Bitung an der Ostküste von Nord-Sulawesi an. Es ist ein Containerhafen, in dem es zu Fuß wenig zu sehen gibt — doch Manado, das Minahasa-Hochland und der Regenwald von Tangkoko liegen alle innerhalb einer Autostunde, und ein gut geplanter Tag an Land erreicht einen davon in Ruhe.",
      "Wir sind ein einheimischer Veranstalter mit Sitz in Manado. Unsere Landausflüge fahren im Privatwagen oder in kleiner Gruppe, nicht im Fünfzig-Sitzer-Bus; Ihr Guide ist hier aufgewachsen; und jede Route wird von Ihrer Bordzeit rückwärts geplant, mit der Zusage, rechtzeitig und mit Puffer wieder an der Gangway zu sein.",
    ],
    whyTitle: "Warum direkt buchen",
    why: [
      { title: "Privat oder kleine Gruppe", text: "Ein Wagen für Ihre Familie oder eine Gruppe von acht — nie ein voller Bus. Sie bestimmen das Tempo und wo Sie länger bleiben." },
      { title: "Guides von hier", text: "Minahasa-Guides, die die Nebenstraßen kennen, das beste Warung zum Mittagessen und wo die Koboldmakis schlafen." },
      { title: "Auf Ihr Schiff abgestimmt", text: "Wir verfolgen Ankunfts- und Bordzeit und planen den Tag danach, nicht nach einem festen Gruppenfahrplan." },
      { title: "Besseres Preis-Leistungs-Verhältnis", text: "Direkt beim Veranstalter zu buchen kostet weniger als dieselbe Route über die Reederei oder einen Wiederverkäufer." },
    ],
    pickTitle: "Empfohlen für einen Tag an Land",
    pickLede: "Tagestouren, die zu einem üblichen Hafenaufenthalt passen. Nennen Sie uns Ihr Schiff und Ihre Zeiten, wir passen die Route an.",
    infoTitle: "Vor der Buchung",
    info: [
      { title: "Treffpunkt", text: "Ihr Guide erwartet Sie am Ausgang des Hafens Bitung mit einem Welcome-Manado-Schild, direkt nach dem Shuttle-Absetzpunkt." },
      { title: "Wie viel Zeit Sie haben", text: "Die meisten Anläufe in Bitung dauern 8 bis 10 Stunden — genug für Tangkoko, eine Hochland-Runde oder Manado mit Bunaken: ein Höhepunkt in Ruhe, dazu ein Mittagessen." },
      { title: "Die Wege", text: "Bitung–Tangkoko etwa 45 Minuten; Bitung–Manado etwa eine Stunde; Bitung–Tomohon und das Hochland etwa 90 Minuten. Die Straßen sind asphaltiert und in gutem Zustand." },
      { title: "Was mitnehmen", text: "Leichte Kleidung, feste Schuhe, Sonnenschutz, Mückenspray für Tangkoko und etwas Rupiah für Eintritte und Getränke. Um alles Übrige kümmern wir uns." },
    ],
    faqTitle: "Fragen",
    faq: [
      { q: "Bin ich zurück, bevor das Schiff ablegt?", a: "Ja. Jede Route wird von Ihrer Bordzeit aus mit Puffer geplant. Zieht der Kapitän die Abfahrt vor, passen wir am selben Tag an." },
      { q: "Ist das günstiger als der Ausflug der Reederei?", a: "Für dieselbe Route ist die Direktbuchung bei uns in der Regel günstiger, und Sie fahren in kleiner Gruppe oder im Privatwagen statt im großen Bus." },
      { q: "Was, wenn der Hafenanlauf ausfällt?", a: "Fällt der Anlauf durch die Reederei aus oder entfällt er wetterbedingt, zahlen Sie nichts. Senden Sie Ihre Buchungsnummer; wir bestätigen die Zeiten wenige Tage vor Ankunft." },
      { q: "Schaffen wir Tangkoko und Manado an einem Tag?", a: "Tangkoko allein ist ein ganzer Tag. Für Tierwelt und Stadt empfehlen wir Tangkoko mit den Waruga-Steingräbern und dem Lavafeld Batu Angus auf dem Rückweg — alles nahe Bitung." },
      { q: "Wie groß darf die Gruppe sein?", a: "Von zwei Personen bis zu einer Gruppe von zwanzig. Privatwagen für kleine Gruppen, Minibusse für größere; derselbe Guide bleibt den ganzen Tag bei Ihnen." },
      { q: "Wie läuft die Bezahlung?", a: "Eine kleine Anzahlung bestätigt die Buchung; den Rest zahlen Sie am Ende der Tour bar an den Guide oder vorab per Überweisung, wenn Ihnen das lieber ist." },
    ],
    ctaTitle: "Nennen Sie uns Schiff und Datum",
    ctaText: "Schicken Sie Reederei, Schiffsnamen und Anlaufdatum. Wir antworten mit Route, Preis und Abholplan — meist innerhalb weniger Stunden.",
    chatSubject: "Landausflug ab dem Kreuzfahrthafen Bitung",
    landingTeaser: "Sie kommen mit dem Kreuzfahrtschiff in Bitung an?",
    landingCta: "Landausflüge ansehen",
  },

  it: {
    metaTitle: "Escursioni dal porto crociere di Bitung | Welcome Manado Tours",
    metaDescription:
      "Escursioni private in piccolo gruppo dal porto di Bitung: la fauna di Tangkoko, gli altopiani Minahasa, la città di Manado e Bunaken. Guide locali, orari sul vostro ritmo di navigazione, rientro a bordo con margine.",
    badge: "Porto crociere di Bitung",
    title: "Escursioni da Bitung",
    intro: [
      "La nave attracca a Bitung, sulla costa orientale del Nord Sulawesi. È un porto container con poco da vedere a piedi — ma Manado, gli altopiani Minahasa e la foresta di Tangkoko sono tutti entro un'ora di auto, e una giornata ben organizzata ne raggiunge uno con calma.",
      "Siamo un operatore locale con sede a Manado. Le nostre escursioni si svolgono in auto privata o in piccolo gruppo, non in pullman da cinquanta posti; la vostra guida è cresciuta qui; e ogni itinerario è costruito a ritroso dall'orario di rientro a bordo, con la garanzia di essere alla passerella con largo anticipo.",
    ],
    whyTitle: "Perché prenotare diretto",
    why: [
      { title: "Privato o piccolo gruppo", text: "Un'auto per la vostra famiglia o un gruppo di otto — mai un pullman pieno. Il ritmo lo decidete voi, e scegliete dove fermarvi di più." },
      { title: "Guide del posto", text: "Guide minahasa che conoscono le strade secondarie, il warung migliore per pranzo e dove dormono i tarsi." },
      { title: "Sui tempi della nave", text: "Controlliamo gli orari di arrivo e di rientro e organizziamo la giornata su quelli, non su un programma di gruppo fisso." },
      { title: "Miglior rapporto qualità-prezzo", text: "Prenotare diretto con l'operatore costa meno dello stesso percorso venduto dalla compagnia o da un rivenditore." },
    ],
    pickTitle: "Consigliate per una giornata a terra",
    pickLede: "Tour in giornata adatti a uno scalo tipico. Diteci nave e orari e adattiamo il percorso.",
    infoTitle: "Prima di prenotare",
    info: [
      { title: "Punto d'incontro", text: "La guida vi aspetta all'uscita del porto di Bitung con un cartello Welcome Manado, subito dopo la discesa dalla navetta." },
      { title: "Quanto tempo avete", text: "La maggior parte degli scali a Bitung dura 8-10 ore — abbastanza per Tangkoko, un giro sugli altopiani, o Manado con Bunaken: un sito importante fatto bene, più il pranzo." },
      { title: "Le distanze", text: "Bitung–Tangkoko circa 45 minuti; Bitung–Manado circa un'ora; Bitung–Tomohon e altopiani circa 90 minuti. Strade asfaltate e in buone condizioni." },
      { title: "Cosa portare", text: "Abbigliamento leggero, scarpe da camminata, protezione solare, repellente per Tangkoko e qualche rupia per ingressi e bevande. Al resto pensiamo noi." },
    ],
    faqTitle: "Domande",
    faq: [
      { q: "Tornerò prima che la nave parta?", a: "Sì. Ogni itinerario parte dal vostro orario di rientro a bordo con un margine aggiunto. Se il comandante anticipa la partenza, adeguiamo in giornata." },
      { q: "Costa meno dell'escursione della compagnia?", a: "Per lo stesso percorso, prenotare diretto con noi costa di norma meno, e viaggiate in piccolo gruppo o auto privata anziché in un grande pullman." },
      { q: "E se lo scalo viene annullato?", a: "Se lo scalo è annullato dalla compagnia o saltato per meteo, non pagate nulla. Inviate il riferimento di prenotazione; confermiamo gli orari pochi giorni prima dell'arrivo." },
      { q: "Si possono vedere Tangkoko e Manado in un giorno?", a: "Tangkoko da solo è una giornata intera. Per fauna e città consigliamo Tangkoko con le tombe di pietra di Waruga e il campo lavico di Batu Angus al ritorno — tutto vicino a Bitung." },
      { q: "Quanto può essere grande il gruppo?", a: "Da due persone fino a venti. Auto private per i gruppi piccoli, minibus per quelli più grandi; la stessa guida resta con voi tutto il giorno." },
      { q: "Come funziona il pagamento?", a: "Un piccolo acconto conferma la prenotazione; il saldo si paga in contanti alla guida alla fine del tour, o in anticipo con bonifico se preferite." },
    ],
    ctaTitle: "Diteci nave e date",
    ctaText: "Inviate compagnia, nome della nave e data dello scalo. Rispondiamo con itinerario, prezzo e piano di prelievo — di solito in poche ore.",
    chatSubject: "Escursione dal porto crociere di Bitung",
    landingTeaser: "Arrivate in crociera a Bitung?",
    landingCta: "Vedi le escursioni",
  },

  es: {
    metaTitle: "Excursiones desde el puerto de cruceros de Bitung | Welcome Manado Tours",
    metaDescription:
      "Excursiones privadas en grupo reducido desde el puerto de Bitung: la fauna de Tangkoko, las tierras altas de Minahasa, la ciudad de Manado y Bunaken. Guías locales, horarios ajustados a su barco, regreso a bordo con margen.",
    badge: "Puerto de cruceros de Bitung",
    title: "Excursiones desde Bitung",
    intro: [
      "Su barco atraca en Bitung, en la costa este de Célebes del Norte. Es un puerto de contenedores con poco que ver a pie, pero Manado, las tierras altas de Minahasa y la selva de Tangkoko están todas a menos de una hora en coche, y un día bien planificado alcanza cualquiera de ellas con calma.",
      "Somos un operador local con sede en Manado. Nuestras excursiones se hacen en coche privado o en grupo reducido, no en autocares de cincuenta plazas; su guía se crió aquí; y cada itinerario se construye hacia atrás desde su hora de embarque, con la garantía de estar en la pasarela con tiempo de sobra.",
    ],
    whyTitle: "Por qué reservar directo",
    why: [
      { title: "Privado o grupo reducido", text: "Un coche para su familia o un grupo de ocho, nunca un autocar lleno. Usted marca el ritmo y elige dónde detenerse más." },
      { title: "Guías de aquí", text: "Guías minahasa que conocen los caminos secundarios, el mejor warung para comer y dónde duermen los tarseros." },
      { title: "Ajustado a su barco", text: "Seguimos sus horas de llegada y de embarque y planificamos el día en torno a ellas, no a un horario de grupo fijo." },
      { title: "Mejor relación calidad-precio", text: "Reservar directo con el operador cuesta menos que la misma ruta vendida por la naviera o un revendedor." },
    ],
    pickTitle: "Recomendado para un día en tierra",
    pickLede: "Excursiones de un día que encajan en una escala habitual. Díganos su barco y sus horas y adaptamos la ruta.",
    infoTitle: "Antes de reservar",
    info: [
      { title: "Punto de encuentro", text: "Su guía le espera a la salida del puerto de Bitung con un cartel de Welcome Manado, justo tras la bajada de la lanzadera." },
      { title: "Cuánto tiempo tiene", text: "La mayoría de escalas en Bitung duran de 8 a 10 horas: suficiente para Tangkoko, un circuito por las tierras altas, o Manado con Bunaken: un sitio importante bien hecho, más la comida." },
      { title: "Las distancias", text: "Bitung–Tangkoko unos 45 minutos; Bitung–Manado alrededor de una hora; Bitung–Tomohon y las tierras altas unos 90 minutos. Carreteras asfaltadas y en buen estado." },
      { title: "Qué llevar", text: "Ropa ligera, calzado para caminar, protección solar, repelente para Tangkoko y algo de rupias para entradas y bebidas. Del resto nos encargamos nosotros." },
    ],
    faqTitle: "Preguntas",
    faq: [
      { q: "¿Volveré antes de que zarpe el barco?", a: "Sí. Cada itinerario parte de su hora de embarque con un margen añadido. Si el capitán adelanta la salida, lo ajustamos el mismo día." },
      { q: "¿Es más barato que la excursión de la naviera?", a: "Para la misma ruta, reservar directo con nosotros suele salir más barato, y viaja en grupo reducido o coche privado en lugar de un autocar grande." },
      { q: "¿Y si se cancela la escala?", a: "Si la naviera cancela la escala o se pierde por el tiempo, no paga nada. Envíe su referencia de reserva; confirmamos los horarios unos días antes de la llegada." },
      { q: "¿Se pueden ver Tangkoko y Manado en un día?", a: "Tangkoko por sí solo es un día entero. Para fauna y ciudad recomendamos Tangkoko con las tumbas de piedra de Waruga y el campo de lava de Batu Angus a la vuelta, todo cerca de Bitung." },
      { q: "¿De qué tamaño puede ser el grupo?", a: "Desde dos personas hasta un grupo de veinte. Coches privados para grupos pequeños, minibuses para los más grandes; el mismo guía le acompaña todo el día." },
      { q: "¿Cómo funciona el pago?", a: "Un pequeño depósito confirma la reserva; el resto se paga en efectivo al guía al final de la excursión, o por transferencia antes si lo prefiere." },
    ],
    ctaTitle: "Díganos su barco y sus fechas",
    ctaText: "Envíe su naviera, el nombre del barco y la fecha de escala. Respondemos con una ruta, un precio y un plan de recogida, normalmente en unas horas.",
    chatSubject: "Excursión desde el puerto de cruceros de Bitung",
    landingTeaser: "¿Llega en crucero a Bitung?",
    landingCta: "Ver excursiones",
  },

  nl: {
    metaTitle: "Excursies vanaf cruisehaven Bitung | Welcome Manado Tours",
    metaDescription:
      "Privé-excursies in kleine groep vanaf de haven van Bitung: de dieren van Tangkoko, het Minahasa-hoogland, de stad Manado en Bunaken. Lokale gidsen, afgestemd op uw schip, ruim op tijd terug aan boord.",
    badge: "Cruisehaven Bitung",
    title: "Excursies vanaf Bitung",
    intro: [
      "Uw schip legt aan in Bitung, aan de oostkust van Noord-Sulawesi. Het is een containerhaven met te voet weinig te zien — maar Manado, het Minahasa-hoogland en het regenwoud van Tangkoko liggen allemaal binnen een uur rijden, en een goed geplande dag aan wal bereikt er rustig één van.",
      "Wij zijn een lokale touroperator uit Manado. Onze excursies gaan met een privéauto of in kleine groep, niet met een bus van vijftig plaatsen; uw gids is hier opgegroeid; en elke route wordt teruggerekend vanaf uw inschepingstijd, met de garantie dat u ruim op tijd weer bij de loopplank staat.",
    ],
    whyTitle: "Waarom rechtstreeks boeken",
    why: [
      { title: "Privé of kleine groep", text: "Een auto voor uw gezin of een groep van acht — nooit een volle bus. U bepaalt het tempo en kiest waar u langer blijft." },
      { title: "Gidsen van hier", text: "Minahasa-gidsen die de binnenwegen kennen, de beste warung voor de lunch, en waar de spookdiertjes slapen." },
      { title: "Afgestemd op uw schip", text: "Wij volgen uw aankomst- en inschepingstijd en plannen de dag daaromheen, niet volgens een vast groepsschema." },
      { title: "Betere prijs-kwaliteit", text: "Rechtstreeks bij de operator boeken kost minder dan dezelfde route via de rederij of een wederverkoper." },
    ],
    pickTitle: "Aanbevolen voor een dag aan wal",
    pickLede: "Dagtochten die passen bij een gewone havenstop. Geef uw schip en tijden door, dan passen wij de route aan.",
    infoTitle: "Voordat u boekt",
    info: [
      { title: "Ontmoetingspunt", text: "Uw gids wacht u op bij de uitgang van de haven van Bitung met een bord van Welcome Manado, direct na de shuttle-afzetplek." },
      { title: "Hoeveel tijd u heeft", text: "De meeste stops in Bitung duren 8 tot 10 uur — genoeg voor Tangkoko, een rondje door het hoogland, of Manado met Bunaken: één hoogtepunt goed gedaan, plus de lunch." },
      { title: "De afstanden", text: "Bitung–Tangkoko ongeveer 45 minuten; Bitung–Manado ongeveer een uur; Bitung–Tomohon en het hoogland ongeveer 90 minuten. De wegen zijn geasfalteerd en in goede staat." },
      { title: "Wat mee te nemen", text: "Lichte kleding, wandelschoenen, zonbescherming, muggenspray voor Tangkoko en wat roepia voor entree en drankjes. De rest regelen wij." },
    ],
    faqTitle: "Vragen",
    faq: [
      { q: "Ben ik terug voordat het schip vertrekt?", a: "Ja. Elke route wordt vanaf uw inschepingstijd gepland met een marge erbij. Vervroegt de kapitein het vertrek, dan passen wij het dezelfde dag aan." },
      { q: "Is dit goedkoper dan de excursie van de rederij?", a: "Voor dezelfde route is rechtstreeks bij ons boeken doorgaans goedkoper, en u reist in kleine groep of privéauto in plaats van een grote bus." },
      { q: "Wat als de havenstop wordt geschrapt?", a: "Wordt de stop door de rederij geschrapt of door het weer gemist, dan betaalt u niets. Stuur uw boekingsreferentie; wij bevestigen de tijden een paar dagen voor aankomst." },
      { q: "Kunnen we Tangkoko en Manado op één dag zien?", a: "Tangkoko alleen is al een hele dag. Wilt u dieren én de stad, dan raden we Tangkoko aan met de Waruga-steengraven en het lavaveld Batu Angus op de terugweg — allemaal dicht bij Bitung." },
      { q: "Hoe groot mag de groep zijn?", a: "Van twee personen tot een groep van twintig. Privéauto's voor kleine groepen, minibussen voor grotere; dezelfde gids blijft de hele dag bij u." },
      { q: "Hoe werkt de betaling?", a: "Een kleine aanbetaling bevestigt de boeking; het restant betaalt u contant aan de gids aan het eind van de tour, of vooraf per overboeking als u dat liever heeft." },
    ],
    ctaTitle: "Geef uw schip en data door",
    ctaText: "Stuur uw rederij, scheepsnaam en havendatum. Wij antwoorden met een route, een prijs en een ophaalplan — meestal binnen enkele uren.",
    chatSubject: "Excursie vanaf cruisehaven Bitung",
    landingTeaser: "Komt u met het cruiseschip aan in Bitung?",
    landingCta: "Bekijk excursies",
  },
};
