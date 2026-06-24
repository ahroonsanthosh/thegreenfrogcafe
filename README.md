# The Green Frog Café — Website

A fast, elegant single-page website for The Green Frog Café, Western Road, Cork.

Built as static **HTML / CSS / JavaScript** — no build step, no dependencies.
Just open `index.html` or host the folder anywhere (GitHub Pages, Netlify, etc.).

## What's inside
- **Hero** with parallax + your real smoothie photography
- **About** — the café story, eco-friendly + Honduran-coffee credentials
- **Menu** — tabbed: Smoothies · Coffee · Iced & Frappés · Tea & Chocolate · Specials
  (real items and prices transcribed from the in-store boards)
- **Gallery** with click-to-zoom lightbox
- **Visit** — embedded Google Map, live "open today" highlight, hours, socials
- **Booking / contact form** with validation
- Fully **responsive**, smooth scroll-reveal animations, and a `prefers-reduced-motion`
  fallback so it's gentle on every device.

## Adding your photos
See [`assets/README.md`](assets/README.md) for the exact filenames to drop in.
The site uses graceful stock fallbacks until your images are added.

## Making the booking form live
The form currently validates and confirms client-side only (static site).
To deliver submissions, point it at a form service — e.g. add to the
`<form id="reserveForm">` in `index.html`:
```html
<form ... action="https://formspree.io/f/your-id" method="POST">
```
and remove the `e.preventDefault()` confirmation block in `script.js`.

## Branding
- Colours taken from the café: frog green `#5fae28`, deep forest `#16271d`,
  warm cream `#f7f5ed`.
- `assets/logo.svg` is a vector recreation of the frog mark — swap in the
  official asset any time.
