/** Structured data. Server component — dirender jadi <script> statis di HTML. */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  // `<` di-escape supaya nilai yang tak sengaja memuat `</script>` tidak keluar
  // dari elemen. Konten hari ini semuanya first-party, tapi ini hardening standar
  // untuk komponen yang jalan di setiap halaman.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
