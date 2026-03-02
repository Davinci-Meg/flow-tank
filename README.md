[日本語](README.ja.md) | English

<div align="center">

# Flow Tank

**A Pomodoro timer that fills your screen with water as you focus.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

Your entire screen becomes a water tank. As your Pomodoro session progresses, water rises from the bottom with gentle wave animations — turning "staying focused" into something you can **see and feel**.

## Features

- **Full-Screen Water Tank** — The whole page fills with water as your timer runs. Waves animate during work sessions, and bubbles appear when the tank is full.
- **Pomodoro Timer** — Customizable work/break/long-break durations with auto session cycling.
- **Work Labels** — Label each session before you start. Records are saved with your label for later review.
- **To-Do List** — Manage tasks with priority levels (High / Medium / Low) and due dates.
- **Calendar** — Heatmap-style monthly view. Tap any day to see session details.
- **Statistics Dashboard** — Weekly bar chart, monthly trend line, and label breakdown donut chart.
- **6 Languages** — 日本語 · English · 中文 · 한국어 · Español · Deutsch
- **Firebase Auth** — Sign in with Email/Password or Google. Guest mode available (data saved locally).
- **Responsive** — Works on desktop and mobile with a hamburger menu.

## Tech Stack

| | Technology |
|---|---|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** |
| State | **Zustand** + localStorage persistence |
| Charts | **Recharts** |
| Dates | **date-fns** |
| Auth | **Firebase Auth** |
| Icons | **Lucide React** |

## Getting Started

```bash
git clone https://github.com/Davinci-Meg/flow-tank.git
cd flow-tank
npm install
```

### Environment Variables

Copy the example file and add your Firebase credentials:

```bash
cp .env.local.example .env.local
```

> You can skip this step to use the app without authentication (timer works offline with local storage).

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

One-click deploy with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Davinci-Meg/flow-tank)

## License

[MIT](LICENSE)

---

<div align="center">

If you find this useful, consider buying me a coffee :)

<a href="https://buymeacoffee.com/megumu" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="48"></a>

</div>
