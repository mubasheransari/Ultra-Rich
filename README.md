# Mezan Ultra Rich Website — Updated

## Included updates

- Navbar now uses the same `/public/backgrounds/leaf-pattern.jpg` texture as the site's red textured sections.
- Logo is positioned at the far-left of the navbar with responsive, consistent horizontal padding.
- Navbar remains textured on the homepage and on internal pages instead of switching to a different solid background.
- Responsive desktop and mobile navigation retained.
- Added a global language provider and language selector.
- Added English, Urdu, Arabic, French, Spanish, German, Italian, Portuguese, Turkish, Russian, Hindi, Bengali, Persian, Chinese, Indonesian, Malay, Dutch, Polish, Japanese, and Korean.
- Language selection is persisted in `localStorage`.
- Google Translate is used to translate the rendered website globally, so the selected language applies across pages/components rather than only changing the navbar label.
- RTL direction is automatically enabled for Arabic, Urdu, and Persian.
- The Google Translate UI is hidden; users interact only with the site's own language menu.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Notes

The original ZIP contained a broken/incomplete `node_modules` tree, so it is intentionally not included in this updated source ZIP. Run `npm install` in the project directory before building.

Language translation requires the browser to be able to load Google's Translate script from `translate.google.com`. English is the original source language.

## Latest updates
- Navbar height increased to 92px with larger navigation typography and logo sizing.
- Navbar continues to use the same `public/backgrounds/leaf-pattern.jpg` texture.
- Added `/contact-us` with a responsive contact form and contact details.
- Added Contact Us to desktop/mobile navigation and footer.
- English is always present in the custom language selector and switching back to English clears Google Translate state.
# updated_ultrarich_webiste_new
# Ultra-Rich
