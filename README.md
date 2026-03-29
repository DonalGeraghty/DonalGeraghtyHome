# Minerva (`minerva`)

**Codename: Minerva** — Roman goddess of wisdom, strategic craft, and the arts. This repository is Donal Geraghty’s **React / Vite frontend**. Auth is handled by **Janus** (the **janus-gate** Flask API on Google Cloud Run).

## Features

### App

- **Project showcase**: Portfolio-style sections (Python, R Shiny, Java, web)
- **Responsive layout**: Works across common screen sizes
- **Themes**: Light / dark with smooth transitions
- **Visual interest**: Three.js-based effects where used in the UI

### Authentication

- **Sign in / register**: Gated routes via splash / login flow
- **JWT**: Tokens from the Janus API (`src/config/api.js`)

## Live URLs

- **Frontend**: Set your deployed Minerva URL (e.g. Cloud Run or GitHub Pages) here when published.
- **Auth API (Janus)**: [https://janus-gate-965419436472.europe-west1.run.app/](https://janus-gate-965419436472.europe-west1.run.app/)

## Tech stack

| Area | Choice |
|------|--------|
| UI | React 18, Vite 5 |
| Routing | React Router 7 |
| 3D / motion | Three.js |
| Tests | Vitest, Testing Library, jsdom |
| Docs / dev UI | Storybook 8 |
| Backend | Janus (Flask on Cloud Run), Firestore for users |

**Dependencies**: use **`package.json`** / `package-lock.json`. This repo does not use Python for the app runtime (see `requirements.txt` for a short note only).

## Project structure

```
src/
├── components/       # UI sections, theme toggle, portfolio blocks
├── context/          # ThemeProvider, AuthProvider (Janus API calls)
├── config/           # api.js — API base URL and endpoints
├── pages/            # Home, LoginSplash
├── styles/           # shared.css
├── App.jsx           # Router shell, navbar, route guards
└── main.jsx          # Entry
```

## Getting started

### Prerequisites

- **Node.js** 18 or newer (recommended for Vite 5)
- **npm** (ships with Node)

### Install and run

```bash
git clone <your-repo-url>
cd minerva
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run test` | Vitest |
| `npm run test:ui` | Vitest UI |
| `npm run test:coverage` | Coverage |
| `npm run storybook` | Storybook dev server (port 6006) |
| `npm run build-storybook` | Static Storybook build |

## Configuration

### API base URL

Centralized in `src/config/api.js`:

```javascript
export const API_BASE_URL = 'https://janus-gate-965419436472.europe-west1.run.app'

export const API_ENDPOINTS = {
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_ME: '/api/auth/me',
}
```

After redeploying Janus, update `API_BASE_URL` if the Cloud Run hostname changes.

### Environment variables (optional)

Vite exposes only variables prefixed with `VITE_`. Example `.env`:

```env
VITE_API_BASE_URL=https://your-janus-host.example
VITE_APP_TITLE=DonalGeraghty
```

Wire any `VITE_*` usage in code if you add them (the sample above is illustrative).

## Janus API (backend)

Repository: **janus-gate**. Typical endpoints:

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/auth/register` | Body: `{ "email", "password" }` (password min 8 chars) |
| `POST` | `/api/auth/login` | Same shape; returns JWT |
| `GET` | `/api/auth/me` | Header: `Authorization: Bearer <token>` |
| `GET` | `/health` | Health check |

## Storybook

```bash
npm run storybook
```

Stories live next to components (e.g. `ThemeToggle.stories.jsx`, `AboutSection.stories.jsx`, `Navbar.stories.jsx`).

## Testing

```bash
npm run test
```

Vitest is configured in `vite.config.js` (including `setupFiles` when present).

## Deployment

- **Static / CDN**: `npm run build` and deploy the `dist/` output.
- **Google Cloud Run**: Workflow `.github/workflows/deploy-gcp.yml` builds and deploys service **`minerva`** (project and registry names are defined in that workflow—confirm URLs in the GCP console after deploy).

The **Janus** API deploys from the **janus-gate** repo (its own Dockerfile and GitHub Actions).

## GitHub repository name

If you rename the repo to **`minerva`**, update the remote:

```bash
git remote set-url origin https://github.com/<you>/minerva.git
```

## Contributing

1. Fork the repository  
2. Create a branch (`git checkout -b feature/your-change`)  
3. Commit and push  
4. Open a pull request  

## Acknowledgments

React, Vite, Vitest, Storybook, Three.js, and the Janus / Cloud Run stack used for auth.
