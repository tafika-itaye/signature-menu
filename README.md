# Signature Restaurant & Bar, table menu

Static QR menu for Signature Restaurant & Bar in Zomba, Malawi. A QR code on each
table opens the front page, which offers three ways in: Restaurant, Bar, More.
Every screen carries a WhatsApp button that opens a chat with the floor staff.

Built with Astro, output is plain HTML and CSS with no client JavaScript.
The whole site is roughly 2 MB, almost all of it images.

## Run it

Needs Node 22.12 or newer, which is what Astro 7 requires.

```bash
node -v            # must be v22.12.0 or higher
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
npm run preview    # serves dist/
```

## Theme

Dark by default, switching to a light palette when the guest's phone is set to
light mode. Outdoor seating in Zomba daylight is the reason. Every colour is a
token at the top of `src/styles/global.css`, defined twice: once on `:root` for
dark, once inside `@media (prefers-color-scheme: light)`.

Two tokens are deliberately not theme aware. `--on-photo` and `--on-photo-soft`
are for text sitting on a photograph, which stays white in both themes. Use
those, not `--ink`, for anything over an image, or the label vanishes in light
mode.

Measured contrast, dark: body 13.8, muted 8.5, price 5.6. Light: body 16.4,
muted 5.4, price 4.7. All above the WCAG AA threshold of 4.5.

## Brand assets

Built from the logo in `public/logo.png`.

- `logo.webp` full lockup, front page
- `mark.webp` the feather alone, top bar on the section pages
- `icon-512.png`, `apple-touch-icon.png`, `favicon.png` app and tab icons
- `og.jpg` the 1200x630 card WhatsApp and Facebook show when the link is shared

To regenerate the icons after a logo change, trim the black margin first, then
scale. To regenerate `og.jpg`, edit the card and screenshot it at 1200x630.

## Edit the menu

Everything a non-developer needs is in two JSON files.

- `src/data/site.json` carries the venue name, town, opening hours and the staff
  WhatsApp number. Change `whatsapp` to route orders to a different handset.
- `src/data/menu.json` carries the categories, dishes, notes and prices, plus the
  three service write-ups under `services`.

A dish looks like this:

```json
{ "name": "Fish and chips", "note": "Beer battered chambo, tartare, lemon", "price": 16000, "image": "fish-chips" }
```

`price` is a plain number in kwacha, formatted at build time. `image` is a file
name in `public/img/` without the extension. Each dish needs two files:
`<name>.webp` at 800x600 and `<name>-sm.webp` at 240x240.

Adding a category means adding one object to the `restaurant` or `bar` array. The
category deck, the anchor links and the item counts all follow from the data.

### Marking an item sold out

```json
{ "name": "Butterfly chambo", "price": 19000, "image": "butterfly-chambo", "available": false }
```

The photo greys, the name mutes and the price is replaced with "Not today". The
item also drops out of the structured data so Google does not advertise it.
Change it back to `true` when the kitchen restocks.

### Dietary markers

```json
"diet": ["vegetarian", "spicy", "nuts"]
```

Rendered as a small line under the description. Only those three values are
recognised, in `src/components/Course.astro`.

**The markers currently in the file are inferred from the dish descriptions I
wrote, not from the kitchen.** Groundnut sauce implies nuts, chilli mayo implies
spicy, and so on. Allergens are a safety matter, so have the kitchen confirm every
line before this goes on a table. Anything unconfirmed should have the marker
removed rather than guessed.

## Offline

`public/sw.js` caches the four pages and the images after the first visit, so the
menu still opens when the signal drops mid-meal. Pages are fetched network first
so price edits land immediately. Images are cache first, keyed on filename.

That last point matters: if you replace `burger.webp` with a new photo under the
same name, guests who have been before keep seeing the old one. Either give the
new photo a new name, or bump `VERSION` at the top of `sw.js`, which clears every
cached file.

## Photography

**Every image in `public/img/` is a placeholder.** They came from Wikimedia
Commons and Openverse under Creative Commons licences and stand in for the real
thing so the layout could be judged. Replace them with the venue's own
photography before the site goes public. Shoot square or 4:3, natural light,
plate on a dark surface, and the existing crops will hold.

To resize a new batch:

```bash
convert photo.jpg -auto-orient -resize 800x600^ -gravity center -extent 800x600 -strip -quality 78 public/img/dish.webp
convert photo.jpg -auto-orient -resize 240x240^ -gravity center -extent 240x240 -strip -quality 74 public/img/dish-sm.webp
```

## Deploy to GitHub Pages

The build needs to know where the site will live. Set two environment variables,
then build.

```bash
SITE=https://<user>.github.io BASE=/<repo-name> npm run build
```

For a custom domain, use `SITE=https://menu.example.com` and `BASE=/`.

`.github/workflows/deploy.yml` does this on every push to `main`. It reads the
repository name automatically, so the only step left is turning on Pages in the
repository settings and setting the source to GitHub Actions.

The workflow runs `npm install`, not `npm ci`. Astro 7 builds with rolldown,
whose native binding is platform specific, and a `package-lock.json` generated on
Windows does not carry the Linux binary the runner needs. `npm install`
re-resolves and fetches the right one. If you ever switch back to `npm ci`, the
build fails on the runner with "Cannot find native binding".

The same rule applies locally. If you see that error after pulling someone else's
lockfile, delete `node_modules` and `package-lock.json` and run `npm install`
again.

## Table QR code

```bash
npm run qr https://<user>.github.io/<repo-name>/
```

Writes `qr/signature-menu.svg` and `qr/signature-menu.png`. Print the SVG for
table cards, it stays sharp at any size. Test the printed code under the lighting
the tables actually have before running off a hundred copies.

## Taken from the Facebook page

Confirmed from facebook.com/SignatureMalawi and reflected in the site:

- Zomba, Malawi. Category: Restaurant.
- "Your go-to spot in Zomba for a mix of local flavors, fast food, Indian dishes
  and drinks. Don't forget, we also provide catering services." This is why the
  menu leads with Fast food and carries an Indian kitchen section.
- Tagline "Food that tells a story", from the cover graphic.
- "Signature burger and chips" is the item they promote. It sits first on the
  menu.
- Specialties listed on the page: dine-in, takeaway, outdoor seating,
  reservations. These run across the bottom of the front page.
- Paint and sip nights appear throughout their photos, so they are written up
  under More.

## Still to confirm

- Prices are estimates for the Zomba market, September 2026. Every one needs
  checking against the till.
- Dish names and descriptions were written to fit the format. The Facebook posts
  are image graphics with no readable text, so no actual dish list was recovered.
- Opening hours in `site.json` are assumed.
- The paint and sip write-up is inferred from photographs, not from their own
  words. Check the detail before publishing.
- The Signature logo, the black roundel with the red mark, is not in this repo.
  Add it at `public/logo.svg` and it can replace the wordmark on the front page.
