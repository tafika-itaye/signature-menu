export function GET({ site }) {
  const base = import.meta.env.BASE_URL;
  const origin = site ? site.origin : "";

  return new Response(
    ["User-agent: *", "Allow: /", "", `Sitemap: ${origin}${base}sitemap.xml`, ""].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
}
