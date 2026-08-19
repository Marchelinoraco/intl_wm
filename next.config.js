/** @type {import('next').NextConfig} */
const nextConfig = {
  // VPS + nginx melayani file statis; tidak ada Node.js di belakangnya.
  output: "export",
  images: {
    // Optimasi gambar Next butuh server, yang tidak ada pada static export.
    unoptimized: true,
    // KERANGKA: nanti diganti host storage api_wm.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // nginx melayani `tours/index.html` untuk `/en/tours/`.
  trailingSlash: true,
};

module.exports = nextConfig;
