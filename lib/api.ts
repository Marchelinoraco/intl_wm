import type { Locale } from "./locales";

/**
 * Lapisan data situs manado.tours. SEMUA fungsi di sini dipanggil HANYA saat
 * build (server component, generateStaticParams, generateMetadata). Pengunjung
 * situs statis tidak pernah memanggil API — halaman sudah jadi HTML.
 *
 * Bentuk tipe dicocokkan dengan Resource PHP di api_wm + respons production
 * sungguhan (lihat plan §"Bentuk respons API"), bukan tebakan.
 */

export const API = "https://api.welcomemanado.my.id/api/intl";

/**
 * Cache per-URL sepanjang satu proses build. Respons /api/intl/* tidak berubah
 * selama build berlangsung, dan halaman detail meminta URL yang sama berkali-kali
 * (generateMetadata + badan halaman + cek hreflang lintas-bahasa). Tanpa ini,
 * satu build menembak API production ribuan kali.
 */
const cache = new Map<string, Promise<unknown>>();

/** Gagal jaringan / status tak terduga → build berhenti. Tidak ada fallback. */
export function apiGet<T>(path: string): Promise<T> {
  const url = `${API}${path}`;
  let hit = cache.get(url);
  if (!hit) {
    hit = doFetch(url, false);
    cache.set(url, hit);
  }
  return hit as Promise<T>;
}

/** Seperti apiGet tapi 404 → null (dipakai detail lintas-bahasa untuk hreflang). */
export function apiGetOrNull<T>(path: string): Promise<T | null> {
  const url = `${API}${path}`;
  const key = `orNull:${url}`;
  let hit = cache.get(key);
  if (!hit) {
    hit = doFetch(url, true);
    cache.set(key, hit);
  }
  return hit as Promise<T | null>;
}

async function doFetch(url: string, tolerate404: boolean): Promise<unknown> {
  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (e) {
    throw new Error(`intl API tidak dapat dihubungi: ${url}\n  ${(e as Error).message}`);
  }
  if (tolerate404 && res.status === 404) return null;
  if (!res.ok) throw new Error(`intl API ${res.status} ${res.statusText}: ${url}`);
  return res.json();
}

type ListEnvelope<T> = { success: boolean; data: T[]; meta: { page: number; per_page: number; total: number; last_page: number } };
type ItemEnvelope<T> = { success: boolean; data: T };

// ─── Tipe ────────────────────────────────────────────────────────────────

export type Category = { slug: string; name: string };

export type TourList = {
  slug: string;
  title: string;
  description: string; // HTML
  location: string;
  duration_days: number;
  duration_nights: number;
  duration_hours: number | null;
  is_featured: boolean;
  featured_badge: string | null;
  cover_image: string | null;
  category: Category | null;
};

export type Itinerary = {
  day_number: number;
  title: string | null;
  description: string | null; // HTML
  hotel_info: string | null;
  meals_info: string | null;
};

export type TourDetail = TourList & {
  inclusions: string | null; // HTML
  exclusions: string | null; // HTML
  itinerary_pdf_path: string | null;
  images: string[];
  itineraries: Itinerary[];
};

// ─── Endpoint ────────────────────────────────────────────────────────────

export async function getLocales(): Promise<Locale[]> {
  const res = await apiGet<{ success: boolean; data: string[] }>("/locales");
  return res.data as Locale[];
}

export async function getTours(locale: Locale): Promise<TourList[]> {
  const res = await apiGet<ListEnvelope<TourList>>(`/tours?locale=${locale}&per_page=100`);
  return res.data;
}

export async function getTour(locale: Locale, slug: string): Promise<TourDetail | null> {
  const res = await apiGetOrNull<ItemEnvelope<TourDetail>>(`/tours/${slug}?locale=${locale}`);
  return res ? res.data : null;
}
