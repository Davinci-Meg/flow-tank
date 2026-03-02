[日本語](README.ja.md) | English

# Flow Tank

A Pomodoro timer web app where water fills the screen as you focus. Visualize your concentration as a rising water tank to stay in the flow.

## Features

- **Pomodoro Timer** — Full-screen water tank with wave animation; water level syncs with session progress
- **Work Labels** — Required label input to start each session
- **To-Do List** — Tasks with priority levels and due dates
- **Calendar** — Heatmap-style view with daily session details
- **Statistics** — Weekly bar charts, monthly line graphs, label-based donut charts
- **Multi-language** — 6 languages: Japanese, English, Chinese, Korean, Spanish, German
- **Authentication** — Firebase Auth (Email/Password + Google OAuth)
- **Responsive** — Desktop and mobile support with hamburger menu navigation

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State Management | Zustand + localStorage |
| Charts | Recharts |
| Date Utilities | date-fns |
| Authentication | Firebase Auth |
| Icons | Lucide React |

## Getting Started

```bash
git clone https://github.com/Davinci-Meg/flow-tank.git
cd flow-tank
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy

Recommended: [Vercel](https://vercel.com)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Davinci-Meg/flow-tank)

## License

[MIT](LICENSE)

---

If you like this project, consider supporting it:

<a href="https://buymeacoffee.com/megumu" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40"></a>
