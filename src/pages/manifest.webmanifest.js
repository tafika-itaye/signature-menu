import site from "../data/site.json";

export function GET() {
  const base = import.meta.env.BASE_URL;

  return new Response(
    JSON.stringify({
      name: `${site.fullName}, ${site.town}`,
      short_name: site.name,
      description: site.blurb,
      start_url: base,
      scope: base,
      display: "standalone",
      background_color: "#000000",
      theme_color: "#232527",
      icons: [
        { src: `${base}icon-512.png`, sizes: "512x512", type: "image/png" },
        { src: `${base}icon-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
        { src: `${base}apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
      ],
    }),
    { headers: { "Content-Type": "application/manifest+json" } }
  );
}
