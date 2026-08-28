/** @type {import('next').NextConfig} */
const nextConfig = {
  // VPS + nginx melayani file statis; tidak ada Node.js di belakangnya.
  //
  // Hanya saat build produksi. Di `npm run dev`, `output: "export"` dipadu
  // segmen dinamis sebagai root layout membuat Next 14 salah melaporkan
  // `generateStaticParams()` tidak ada — padahal ada, dan build produksinya
  // menghasilkan halaman yang benar. Membiarkannya undefined saat dev membuat
  // server pengembangan me-resolve params saat request, seperti aplikasi Next
  // biasa. Keluaran produksi tidak terpengaruh.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: {
    // Optimasi gambar Next butuh server, yang tidak ada pada static export.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "api.welcomemanado.my.id" }],
  },
  // nginx melayani `tours/index.html` untuk `/en/tours/`.
  trailingSlash: true,
};

module.exports = nextConfig;
