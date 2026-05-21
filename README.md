# Dinuka Wickramarathna — Portfolio

A modern, full-stack portfolio built with **Next.js 16** (App Router), featuring multi-page routing, OAuth authentication, Firebase-backed comments, Discord analytics, and a dynamic five-theme UI.

**Live site:** [dinukawickramarathana.me](https://www.dinukawickramarathana.me)  
**Current version:** `v1.1.0` (shown in the footer, sourced from `package.json`)

---

## Table of contents

- [What's new in v1.1](#whats-new-in-v11-phase-2)
- [Features](#features)
- [Routes](#routes)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [OAuth setup](#oauth-setup)
- [Discord & analytics](#discord--analytics)
- [Deployment](#deployment)
- [Versioning](#versioning)
- [Customization](#customization)
- [Contact](#contact)

---

## What's new in v1.1 (Phase 2)

### App Router & navigation

- **Per-page URLs** instead of a single-page tab switcher — each section has its own route, metadata, and lazy-loaded UI.
- **Shared shell** via `(site)` layout: navbar, theme provider, and footer wrap all main pages.
- **Central route config** in `src/lib/routes.ts` for nav labels and paths.

### Welcome / entry flow

- **Lightweight welcome screen** (`WelcomeScreen`) with typing animation (no heavy Three.js preloader).
- **New browser tab:** welcome once → then `/about`.
- **Refresh:** stays on the **same page** (session remembered in `sessionStorage`).
- **`/`** entry: welcome → About; deep links use `AppEntryGate` on first visit in a tab.

### Performance

- Replaced heavy backgrounds on several pages with **CSS-only `AmbientBackground`** (Projects, Experience, Achievements, References, 404).
- **Deterministic animations** (`seeded-random`) to fix React hydration mismatches.
- **Lighter footer** (removed WebGL Threads / lightning spam).
- **Framer Motion** tuned to avoid animating Tailwind `oklab` colors and invalid `boxShadow` values.

### Security

- **`middleware.ts`** — security headers (CSP, `X-Frame-Options`, etc.).
- **Contact API** — rate limiting, input sanitization, HTML escaping in emails.
- **Google Form webhook** — optional `GOOGLE_FORM_WEBHOOK_SECRET` header.
- **Discord webhook** — prefer server-only `DISCORD_WEBHOOK_URL` (client analytics go through `/api/analytics/session`).
- **NextAuth** — `NEXTAUTH_SECRET`, optional `ALLOWED_ADMIN_EMAILS` allowlist, safe `redirect` callback.

### Auth & contact UX

- **Sign in / sign out** on Contact stays on **`/contact`** (`callbackUrl` from current path).
- **Facebook Login** (when `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` are set).
- **Responsive social login buttons** (`SocialAuthButtons` component).

### Discord notifications

- **No more per-page visit spam** — one **session summary** when the user leaves, goes idle (~15 min), or hides the tab (~45s).
- Summary includes: duration, page journey, device/browser, signed-in user if applicable.

---

## Features

### Portfolio sections

| Section | Route | Description |
|--------|-------|-------------|
| About | `/about` | Profile, CV preview, stats, gallery |
| Skills | `/skills` | Skills by category, letter-glitch background |
| Projects | `/projects` | Project showcase with filters |
| Education | `/education` | Academic history |
| Experience | `/experience` | Work history (multi-role support) |
| Certificates | `/certificates` | Certifications grid |
| Achievements | `/achievements` | Awards and highlights |
| Blog | `/blog` | Articles |
| Contact | `/contact` | Hire Me, WhatsApp, comments, feedback, contact modal |
| References | `/references` | Professional references |
| Publications | `/publications` | Research / publications |
| Privacy | `/privacy` | Privacy policy |

Navbar shows the main sections; References and Publications are available by URL.

### Themes

Five themes: **Dark**, **Light**, **Water**, **Sunset**, **Forest** — persisted via `ThemeContext`, applied to body and navbar (`theme-navbar-*` classes).

### Contact & hiring

- **Hire Me** — external Google Form
- **Contact Me** — modal form → `/api/contact` (Resend email + Discord)
- **WhatsApp** — configurable via `NEXT_PUBLIC_WHATSAPP_NUMBER`
- **Comments** — Firebase Firestore (no login required)
- **Feedback** — requires OAuth (Google, GitHub, LinkedIn, Facebook)

### 3D & visual effects (optional / per-page)

Legacy background components remain under `components/backgrounds/` (Three.js, Spline, Hyperspeed, etc.). Heavier effects are still used on some pages (e.g. About globe, Skills glitch); Phase 2 moved several pages to lighter CSS backgrounds.

---

## Routes

```
/                    → Welcome screen → redirects to /about (new tab session)
/about
/skills
/projects
/education
/experience
/certificates
/achievements
/blog
/contact
/references
/publications
/privacy
/api/auth/[...nextauth]
/api/contact
/api/analytics/session
/api/google-form
/api/cv-webhook
```

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack dev) |
| UI | React 19, TypeScript 5, Tailwind CSS 4 |
| Animation | Framer Motion (primary); GSAP / Three.js on select sections |
| Auth | NextAuth.js v4 (JWT sessions) |
| Database | Firebase Firestore (comments, feedback) |
| Email | Resend |
| Notifications | Discord webhooks |

---

## Project structure

```
my-portifolio/
├── public/
│   └── CV/                    # cv.pdf, cv.png
├── src/
│   ├── app/
│   │   ├── (site)/            # Main portfolio layout + pages
│   │   │   ├── layout.tsx     # Navbar + main shell
│   │   │   ├── about/page.tsx
│   │   │   ├── skills/page.tsx
│   │   │   ├── projects/page.tsx
│   │   │   ├── education/page.tsx
│   │   │   ├── experience/page.tsx
│   │   │   ├── certificates/page.tsx
│   │   │   ├── achievements/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── references/page.tsx
│   │   │   └── publications/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── contact/route.ts
│   │   │   ├── analytics/session/route.ts
│   │   │   ├── google-form/route.ts
│   │   │   └── cv-webhook/route.ts
│   │   ├── components/
│   │   │   ├── backgrounds/     # 3D / WebGL / decorative (legacy + selective use)
│   │   │   ├── common/        # AuthProvider, ThemeSwitcher, VisitTracker,
│   │   │   │                  # WelcomeScreen, AppEntryGate, AmbientBackground
│   │   │   ├── content/       # Section data (*.ts)
│   │   │   ├── icons/
│   │   │   ├── layouts/       # Navbar, Footer
│   │   │   └── pages/         # Section UI (about, contact, …)
│   │   ├── contexts/
│   │   │   ├── ThemeContext.tsx
│   │   │   └── PortfolioNavContext.tsx
│   │   ├── hooks/
│   │   ├── styles/
│   │   ├── globals.css
│   │   ├── layout.tsx         # Root: providers, AppEntryGate, VisitTracker
│   │   ├── page.tsx           # "/" welcome entry
│   │   ├── not-found.tsx
│   │   └── privacy/page.tsx
│   ├── lib/
│   │   ├── routes.ts          # Nav + path helpers
│   │   ├── welcome.ts         # Welcome session keys
│   │   ├── auth-url.ts        # OAuth callback URLs
│   │   ├── security.ts        # Rate limit, escapeHtml, sanitize
│   │   ├── session-analytics.ts
│   │   ├── discord.ts
│   │   ├── firebase.ts
│   │   ├── version.ts
│   │   ├── seeded-random.ts
│   │   └── utils.ts
│   └── middleware.ts          # Security headers
├── next.config.ts
├── package.json
└── .env                       # Local secrets (never commit)
```

### Key files (Phase 2)

| File | Role |
|------|------|
| `src/lib/routes.ts` | Single source of truth for nav paths |
| `src/app/components/common/WelcomeScreen.tsx` | Entry preloader |
| `src/app/components/common/AppEntryGate.tsx` | First-visit welcome on deep links |
| `src/app/components/common/VisitTracker.tsx` | Session analytics → Discord |
| `src/app/components/common/AmbientBackground.tsx` | Lightweight page backgrounds |
| `src/app/components/pages/data/contact/components/SocialAuthButtons.tsx` | OAuth login grid |
| `src/middleware.ts` | HTTP security headers |

---

## Getting started

### Prerequisites

- **Node.js** 20.9+ (18+ minimum)
- **npm** or yarn

### Install & run

```bash
git clone https://github.com/Dinukaawsh/my-portifolio.git
cd my-portifolio
npm install
```

Create `.env` in the project root (see [Environment variables](#environment-variables)), then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the welcome screen, then About.

### Production build

```bash
npm run build
npm start
```

---

## Environment variables

Copy into `.env` (or `.env.local`). **Never commit real secrets.**

### Required (core)

```bash
# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=                        # openssl rand -base64 32

# OAuth — Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# OAuth — GitHub
GITHUB_ID=
GITHUB_SECRET=

# OAuth — LinkedIn
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# Firebase (comments / feedback)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Optional (recommended)

```bash
# OAuth — Facebook (App ID + App Secret from Meta Developer Console)
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# Restrict who can sign in (comma-separated emails). Leave unset = anyone.
ALLOWED_ADMIN_EMAILS=dinukaaw.sh@gmail.com

# Discord (prefer server-only; fallback: NEXT_PUBLIC_DISCORD_WEBHOOK_URL)
DISCORD_WEBHOOK_URL=

# Contact form email (Resend)
RESEND_API_KEY=
RESEND_FROM_EMAIL=contact@yourdomain.com
CONTACT_EMAIL=your-email@example.com

# Hire Me & WhatsApp
NEXT_PUBLIC_GOOGLE_FORM_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=

# CV button on About (set "false" to hide)
NEXT_PUBLIC_ENABLE_CV_BUTTON=true

# Google Apps Script → /api/google-form (optional shared secret)
GOOGLE_FORM_WEBHOOK_SECRET=

# Public site URL helpers (built from package.json at build)
# NEXT_PUBLIC_APP_VERSION is set in next.config.ts automatically
```

### Variable reference

| Variable | Purpose |
|----------|---------|
| `ALLOWED_ADMIN_EMAILS` | Only these emails may complete OAuth sign-in |
| `GOOGLE_FORM_WEBHOOK_SECRET` | Must be sent as `x-webhook-secret` when calling `/api/google-form` |
| `FACEBOOK_CLIENT_ID` | Meta App **ID** |
| `FACEBOOK_CLIENT_SECRET` | Meta App **Secret** |
| `DISCORD_WEBHOOK_URL` | Server-side Discord webhook (session summaries, contact, etc.) |

---

## OAuth setup

Use these **exact** callback URLs (local + production):

| Provider | Redirect URI |
|----------|----------------|
| Google | `{ORIGIN}/api/auth/callback/google` |
| GitHub | `{ORIGIN}/api/auth/callback/github` |
| LinkedIn | `{ORIGIN}/api/auth/callback/linkedin` |
| Facebook | `{ORIGIN}/api/auth/callback/facebook` |

Examples:

- Local: `http://localhost:3000/api/auth/callback/facebook`
- Production: `https://www.dinukawickramarathana.me/api/auth/callback/facebook`

**Facebook (Meta):** Add product **Facebook Login** → Web → paste redirect URIs (not the homepage URL). App ID → `FACEBOOK_CLIENT_ID`, App Secret → `FACEBOOK_CLIENT_SECRET`.

If you see *“This app needs at least one supported permission”*: in the Meta app go to **Use cases** → **Facebook Login** → **Customize** and add **`email`** and **`public_profile`**. Under **App roles**, add your Facebook account as **Administrator** or **Tester** while the app is in **Development** mode (or switch the app **Live** for public login).

**Production:** Set `NEXTAUTH_URL=https://www.dinukawickramarathana.me` on your host.

Sign-in and sign-out from **Contact** return to `/contact` automatically.

---

## Discord & analytics

### Session summary (default)

- Tracks pages visited in the browser tab session.
- Sends **one** Discord embed when the session ends (leave / idle / tab hidden).
- Includes journey, duration, device info, and logged-in user if present.
- Implemented in `VisitTracker` → `POST /api/analytics/session`.

### Immediate notifications (unchanged)

- Contact form submissions
- New comments / feedback (client → Discord where configured)
- Google Form webhook (via Apps Script)

### Google Form → Discord

1. Google Form → ⋮ → **Script editor**
2. `onFormSubmit` trigger → `POST` to `https://your-domain.com/api/google-form`
3. If using `GOOGLE_FORM_WEBHOOK_SECRET`, add header: `x-webhook-secret: <your secret>`

---

## Deployment

### Vercel (recommended)

1. Connect the GitHub repo.
2. Add all environment variables (production `NEXTAUTH_URL`, OAuth callbacks, etc.).
3. Deploy on push.

### Production checklist

- [ ] `NEXTAUTH_URL` = production URL  
- [ ] OAuth redirect URIs updated for production domain  
- [ ] Facebook redirect: `/api/auth/callback/facebook` (not `/` alone)  
- [ ] `npm run build` succeeds  
- [ ] Footer shows expected version (`v1.1.0`)  
- [ ] Test Contact → sign in → stays on `/contact`  
- [ ] Test Discord session summary (browse several pages, close tab)

---

## Versioning

[Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

- Source: `package.json` → `"version"`
- Display: footer via `src/lib/version.ts` → `NEXT_PUBLIC_APP_VERSION` at build time

```bash
npm version patch   # 1.1.0 → 1.1.1
npm version minor   # 1.1.0 → 1.2.0
npm version major   # 1.1.0 → 2.0.0
npm run build
```

---

## Customization

### Add a new section

1. Add content in `src/app/components/content/your-section.ts`
2. Create UI in `src/app/components/pages/your-section/`
3. Add route in `src/lib/routes.ts` (`NAV_SECTIONS` / `ALL_SECTIONS`)
4. Create `src/app/(site)/your-section/page.tsx` importing the component + `metadata`
5. Navbar picks up new entries from `routes.ts` automatically

### Add a theme

See `src/app/contexts/THEME_SYSTEM_README.md` and `globals.css` (`theme-navbar-*`, body gradients).

### Toggle CV button

`NEXT_PUBLIC_ENABLE_CV_BUTTON=false` hides the CV preview on About.

---

## Contact

**Dinuka Wickramarathna** — Full Stack Developer

- Email: dinukaaw.sh@gmail.com  
- Website: [dinukawickramarathana.me](https://www.dinukawickramarathana.me)  
- [LinkedIn](https://www.linkedin.com/in/dinuka-wickramarathna-88468b214/) · [GitHub](https://github.com/Dinukaawsh) · [X](https://x.com/DinukaAshan14) · [WhatsApp](https://wa.me/94767326845)

---

## License

MIT — see [LICENSE](LICENSE) if present.

---


⭐ **Star this repository if you found it helpful!**