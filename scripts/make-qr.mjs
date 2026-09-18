// Generates the table QR code as SVG and PNG.
// Usage: node scripts/make-qr.mjs https://user.github.io/signature-menu/
import QRCode from "qrcode";
import { writeFile, mkdir } from "node:fs/promises";

const url = process.argv[2];
if (!url) {
  console.error("Pass the live menu URL, for example:");
  console.error("  node scripts/make-qr.mjs https://user.github.io/signature-menu/");
  process.exit(1);
}

await mkdir("qr", { recursive: true });

const opts = {
  errorCorrectionLevel: "M",
  margin: 2,
  color: { dark: "#0b0b0cff", light: "#ffffffff" },
};

const svg = await QRCode.toString(url, { ...opts, type: "svg", width: 1024 });
await writeFile("qr/signature-menu.svg", svg);
await QRCode.toFile("qr/signature-menu.png", url, { ...opts, width: 1024 });

console.log("Wrote qr/signature-menu.svg and qr/signature-menu.png for", url);
