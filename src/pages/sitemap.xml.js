export function GET({ site }) {
  const base = import.meta.env.BASE_URL;
  const origin = site ? site.origin : "";
  const pages = ["", "restaurant/", "bar/", "more/"];
  const today = new Date().toISOString().slice(0, 10);

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map(
      (p) =>
        `  <url><loc>${origin}${base}${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`
    ),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
