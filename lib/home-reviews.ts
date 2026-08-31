/**
 * Ulasan asli dari listing TripAdvisor Welcome Manado (d34101092) & profil
 * Google Bisnis. Diport verbatim dari client_wm/src/views/home/Home.vue —
 * teks tidak diubah; hanya `location` & singkatan bulan yang dinormalkan ke
 * bahasa Inggris. Ditampilkan apa adanya di semua locale (ulasan tidak
 * diterjemahkan) — sama seperti situs induk.
 *
 * API /api/intl/* belum punya endpoint ulasan. Bila nanti ada, ganti file ini
 * dengan fetch build-time di lib/api.ts.
 */
export type Review = {
  source: "tripadvisor" | "google";
  name: string;
  location?: string;
  time: string;
  stars: number;
  title?: string;
  text: string;
  color: string;
};

export const HOME_REVIEWS: Review[] = [
  {
    source: "tripadvisor",
    name: "Stefan A",
    time: "Aug 2026",
    stars: 5,
    color: "#6D4C9F",
    title: "Great 6-day trip North Sulawesi",
    text: "This summer, as part of our tour of Indonesia, our family of five booked a 6-day Tangkoko Adventure Tour through Welcome Manado. On the day of departure, we were picked up by Fikri (guide) and Darren (driver). We had a fantastic VIP bus at our disposal. The tour consisted of four days on the mainland and two days at a resort on Bunaken. We saw and did so much during the tour. North Sulawesi has such beautiful scenery. The wildlife was the highlight of the trip. Our guide (Monik) at the Tangkoko Nature Reserve was very enthusiastic and managed to spot almost every animal—except for the tarantula. The hotels were lovely, although the rooms at the Grand Master were significantly worse; they smelled bad and had a lot of mold. The days spent relaxing on Bunaken were fantastic. We saw plenty of coral, fish, and turtles. Fikri took excellent care of us throughout the trip and handled everything perfectly, even though the schedule was too tight at times. Darren navigated the large VIP bus effortlessly through the narrow, busy streets. Thank you, Welcome Manado, for an unforgettable trip! Best regards, The Ahne family",
  },
  {
    source: "tripadvisor",
    name: "Maxim P",
    location: "Germany",
    time: "May 2026",
    stars: 5,
    color: "#C1442E",
    title: "Great agency to explore Northern Sulawesi",
    text: "I booked a customized 4 night package as a solo traveller with a private guide and driver. Arrived in Manado in the early morning with the Transnusa flight from Denpasar. We explored the mountains around Tomohon and the market, did the Mahawu crater hike and visited the Waruga Sawangan cemetary on the way to Tangkoko Nature Reserve. Spent 2 nights in Tangkoko in a very comfortable little lodge. 2 evenings were perfect to explore the nocturnal wildlife like tarsiers, bear cuscus, owls and spiders. In the morning hours we spend several hours in the jungle exploring monkeys and endemic birds. The other 2 nights were spent on Bunaken Island with a boat trip to the beautiful vulcanic island Manado Tua and a snorkeling tour to the spectacular drop-off reefs surrounding the island. Welcome Manado was of great assistence in creating the perfect program for my Sulawesi visit and on the spot my guide Fikri was very helpful and pleasant and provided a lot of interesting background information about his home island - assisted by additional local guides on the various sights. For me it was the perfect way to spend 5 days exploring beautiful Sulawesi with professional planning and no hassle :) I will come back to explore more areas of the island and choose Welcome Manado again!",
  },
  {
    source: "tripadvisor",
    name: "AneelOnTheRoad",
    location: "Austin, Texas",
    time: "Jun 2026",
    stars: 5,
    color: "#1E5FA8",
    title: "Great views and wildlife! Friendly and adaptable guide",
    text: "We did a tour to the Tangkoko Nature Reserve and Tunan Waterfall and liked it so much we did another tour the next day to see Tarsiers in the mangroves from Rap-Rap beach (the description says \"canoes\", but we used kayaks). The guide was very friendly and we saw beautiful sights and rare wildlife. We mentioned that we were interested in birds, and the guide and driver kept their eyes peeled and pointed out many that we would have missed.\n\nI also appreciate that the guide (Herton) was very adaptable. When thunderstorms hit at the waterfall, we were prepared with umbrellas, and when one lookout was closed, we got another spectacular view from a lovely cafe. While we were passing through Manado, we had an unusual request: to find some local cloth. They took us to a boutique with amazing Minahasa weaving.",
  },
  {
    source: "tripadvisor",
    name: "Dream19529040944",
    location: "Rome, Italy",
    time: "Aug 2026",
    stars: 5,
    color: "#00857A",
    title: "Bellissimo viaggio, ottima agenzia.",
    text: "Sono un'agenzia locale professionale li abbiamo contattati ad inizio anno ed hanno soddisfatto ogni richiesta, anche le più articolate. Abbiamo fatto delle modifiche durante il viaggio e ci hanno accontentati. Che dire accoglienti, precisi e organizzati. Abbiamo avuto una guida professionale (Fikri) che ci ha seguito su tutto e che consiglio (ottimo inglese per altro). Ultimo, ma non ultimo, eccellente rapporto qualità prezzo, si saltano gli intermediari europei. Noi abbiamo fatto 13 giorni Sulawesi nord.",
  },
  {
    source: "tripadvisor",
    name: "NAF22",
    location: "Lisbon, Portugal",
    time: "Dec 2025",
    stars: 5,
    color: "#E91E63",
    title: "Amazing tour and experience from Manado",
    text: "What an amazing experience with Welcome Manado! The 3night 4 day tour around North of Sulawesi was just the perfect escape which completed our Bunaken holiday.\nThe planning of the tour and communication were just perfect. All was customized to our requests and promptly adjusted and communicated in fast pace. Thank you Eby and team.\nOur tour guide and driver made sure the live experience would be perfect, safe and personalized. Dony (tour guide) did an amazing job, always taking care of every little detail, explaining the tour and places, while having everything ready and on time. He was present, always antecipating our needs and also leaving room for the group to enjoy our own moments.\nThank you so much Dony!\nAbout the tour, let me share the good moments and places. We were picked up at Manado airport, went around Manado, stoped in a local coffee shop (local experience), went to few worship houses, then we went to Christ blessing… we drove to Tunan waterfall in a park (20' walking) which we loved and is an easy one. We stayed in Tangkoko park (lovely hotel Tangkoko Santuary) and did a morning tour with a local ranger… we saw a big black monkey community, birds, tarsius, bear cuscus… was a lovely nature tour.\nWe had a snorkeling tour to Gangga and Lihaga with lunch at the beach. Top corals and diversity of fish.\nIt was funny also to have karaoke in our van (and when the micros did not work perfectly They made sure to substitute immediately, just giving an example of the extra mile the team was going).\nI highly recommend the tour company and Dony if you are planning a tour from Manado or North Sulawesi. The overall experience couldn't be better.",
  },
  {
    source: "google",
    name: "Joanna Chu",
    time: "a year ago",
    stars: 5,
    color: "#607D8B",
    text: "A big thank you to Ima & Opo, our guide & driver from Welcome Manado Wisata whom had shown great hospitality during our Tarsiers Tour. They did the extra miles to recommend us great food places and brought us to Jesus's Blessing Statue even though its not in the itinerary. The lunch at Manres Hills were good, and price is cheap for the ambience & scenic view. We highly recommend Welcome Manado Wisata for any tours in Manado 😊",
  },
  {
    source: "google",
    name: "Lili Suryanti",
    time: "2 months ago",
    stars: 5,
    color: "#4CAF50",
    text: "This is my first time been in Manado. I came w/ my guests from China. It was nice first impression for us. We love the hotel where we stayed at Fourpoints, also the water activities such as snorkling. The services that given by our local guide Fikri also great, we bought the package from Welcome Manado. Very responseful n helpful. Sure will be back again for our next trip.",
  },
];

/**
 * Rating agregat Google. API intl belum punya endpoint — nilai disalin dari
 * yang live di client_wm per 2026-08-31. PERBARUI MANUAL bila berubah.
 */
export const GOOGLE_RATING = { value: "4.9", count: 39 };
