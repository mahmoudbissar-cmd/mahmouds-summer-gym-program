# V-Taper Program — PWA

A 5-day hypertrophy training program built as an installable Progressive Web App.
Mobile-first, works offline, dark mode, and installs to your iPhone home screen via
**Add to Home Screen**. No build step, no dependencies — plain HTML, CSS, and vanilla JS.

---

## Project structure

The app lives at the repository root so it deploys straight to GitHub Pages.

```
.
├── index.html          # App shell (SEO + social meta, anti-flash theme init)
├── styles.css          # All styling (mobile-first, dark mode, safe-area aware)
├── script.js           # Renders the program, theme, nav, install hint, SW
├── data.js             # Your program content — edit this to change workouts
├── manifest.json       # PWA manifest (name, icons, colors)
├── service-worker.js   # Offline caching + update flow
├── offline.html        # Shown when a navigation fails with no cache yet
├── 404.html            # Friendly not-found page for GitHub Pages
├── robots.txt          # Search-engine directives
├── .nojekyll           # Serve files as-is on GitHub Pages (no Jekyll)
├── .gitignore
├── README.md           # This file
├── icons/
│   ├── favicon.svg
│   ├── favicon-64.png
│   ├── apple-touch-icon.png      (180×180)
│   ├── icon-192.png              (192×192)
│   ├── icon-512.png              (512×512)
│   ├── icon-maskable-192.png
│   └── icon-maskable-512.png
└── assets/             # (empty — for future images)
```

**To edit your workouts:** open `data.js` and change the exercises, sets, or notes.
Nothing else needs to change. After editing, bump `CACHE_VERSION` in
`service-worker.js` (e.g. `vtaper-v2` → `vtaper-v3`) so the update reaches installed
phones. With the built-in update flow, an open app now refreshes itself automatically
once the new worker activates.

---

## Test it locally

A service worker needs to be served over `http://` — opening `index.html` directly
with `file://` will load the page but the offline/install features won't work.
Run any static server from the project root:

**Python (already on most Macs/Linux):**
```bash
python3 -m http.server 8000
```
Then open <http://localhost:8000> in your browser.

**Node (if you prefer):**
```bash
npx serve .
```

To test on your **iPhone** on the same Wi-Fi: find your computer's local IP
(e.g. `192.168.1.20`) and visit `http://192.168.1.20:8000` in Safari.
(Full offline + install behaviour is most reliable once it's on GitHub Pages over
HTTPS — see below.)

---

## Publish on GitHub Pages

### 1. Create the repository
- Go to <https://github.com/new>, name it (e.g. `vtaper-program`), keep it Public,
  and create it.

### 2. Upload the files
Easiest (no command line):
- Open the new repo → **Add file → Upload files**.
- Drag in **everything at the project root** (the files themselves plus the `icons/`
  and `assets/` folders), not an outer wrapper folder.
- Commit.

Or with Git:
```bash
git init
git add .
git commit -m "V-Taper PWA"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/vtaper-program.git
git push -u origin main
```

### 3. Turn on Pages
- Repo → **Settings → Pages**.
- Under **Build and deployment → Source**, choose **Deploy from a branch**.
- Branch: **main**, folder: **/ (root)**. Save.
- Wait ~1 minute. Your app is live at:
  `https://YOUR-USERNAME.github.io/vtaper-program/`

Because every path in this project is **relative** (`./`, `icons/…`), it works
correctly inside that repo sub-path with no changes.

### 4. Install on your iPhone
- Open the Pages URL in **Safari**.
- Tap the **Share** button → **Add to Home Screen** → **Add**.
- Launch it from the new icon — it runs full-screen and works offline.

Android: open in Chrome → **⋮ menu → Install app**.

---

## Notes
- **Updating after install:** change files, bump `CACHE_VERSION`, re-upload. The open
  app reloads itself once the new service worker activates.
- **Fonts:** loaded from Google Fonts and cached after first online visit, so the app
  still looks right offline once it's been opened once with a connection.
- **No tracking, no accounts, no data leaves the device.** Theme choice is stored
  locally in your browser only.
- **Optional SEO:** once you know your final URL you can add a `<link rel="canonical">`
  and a `sitemap.xml`; both need the absolute address, so they're left out by default.
