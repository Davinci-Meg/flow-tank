日本語 | [English](README.md)

<div align="center">

# Flow Tank

**集中するほど、水がたまるポモドーロタイマー。**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

画面全体が水槽になります。ポモドーロセッションが進むにつれ、水が下から満ちていき、穏やかな波が揺れる — 「集中している感覚」を**目に見える形**にするアプリです。

## 主な機能

- **全画面ウォータータンク** — 画面全体が水槽に。作業中は波がアニメーションし、満水時には泡が浮かぶ。
- **ポモドーロタイマー** — 作業・休憩・長休憩の時間をカスタマイズ可能。セッション自動サイクル。
- **作業ラベル** — セッション開始前にラベルを入力。記録はラベル付きで保存され、後から振り返れる。
- **ToDoリスト** — 優先度（高・中・低）と期限付きのタスク管理。
- **カレンダー** — ヒートマップ風の月表示。日付タップでその日のセッション詳細を確認。
- **統計ダッシュボード** — 週間棒グラフ、月間推移、ラベル別ドーナツチャート。
- **6言語対応** — 日本語 · English · 中文 · 한국어 · Español · Deutsch
- **Firebase認証** — メール/パスワードまたはGoogleでログイン。ゲスト利用可（ローカル保存）。
- **レスポンシブ** — デスクトップ・モバイル対応。ハンバーガーメニューで快適に操作。

## 技術スタック

| | 技術 |
|---|---|
| フレームワーク | **Next.js 16** (App Router) |
| 言語 | **TypeScript** |
| スタイリング | **Tailwind CSS v4** |
| 状態管理 | **Zustand** + localStorage永続化 |
| グラフ | **Recharts** |
| 日付操作 | **date-fns** |
| 認証 | **Firebase Auth** |
| アイコン | **Lucide React** |

## セットアップ

```bash
git clone https://github.com/Davinci-Meg/flow-tank.git
cd flow-tank
npm install
```

### 環境変数

サンプルファイルをコピーして、Firebaseの認証情報を記入:

```bash
cp .env.local.example .env.local
```

> 認証なしでも利用できます（タイマーはオフラインで動作し、データはローカルに保存されます）。

### 起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## デプロイ

Vercelでワンクリックデプロイ:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Davinci-Meg/flow-tank)

## ライセンス

[MIT](LICENSE)

---

<div align="center">

気に入っていただけたら、コーヒー1杯分のサポートをいただけると嬉しいです :)

<a href="https://buymeacoffee.com/megumu" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="48"></a>

</div>
