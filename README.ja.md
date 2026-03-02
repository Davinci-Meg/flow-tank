日本語 | [English](README.md)

# Flow Tank

水がたまるポモドーロタイマー Web アプリ。作業セッション中に画面全体の水槽に水が溜まっていくビジュアルで「集中している感覚」を可視化し、継続的な集中を促します。

## 主な機能

- **ポモドーロタイマー** — 画面全体が水槽に。波アニメーション付きで、水位がセッションの進捗に連動
- **作業ラベル** — ラベル入力必須でセッション開始
- **ToDoリスト** — 優先度・期限付きのタスク管理
- **カレンダー** — ヒートマップ風の表示と日別セッション詳細
- **統計ダッシュボード** — 週間棒グラフ、月間折れ線グラフ、ラベル別ドーナツチャート
- **多言語対応** — 日本語、English、中文、한국어、Español、Deutsch の6言語
- **認証** — Firebase Auth（Email/Password + Google OAuth）
- **レスポンシブ** — デスクトップ・モバイル対応、ハンバーガーメニューナビゲーション

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 |
| 状態管理 | Zustand + localStorage |
| グラフ | Recharts |
| 日付操作 | date-fns |
| 認証 | Firebase Auth |
| アイコン | Lucide React |

## セットアップ

```bash
git clone https://github.com/Davinci-Meg/flow-tank.git
cd flow-tank
npm install
```

### 環境変数

`.env.local.example` を `.env.local` にコピーし、Firebase の認証情報を記入してください。

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

### 起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## デプロイ

推奨: [Vercel](https://vercel.com)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Davinci-Meg/flow-tank)

## ライセンス

[MIT](LICENSE)

---

このプロジェクトを気に入っていただけたら、ぜひサポートをお願いします：

<a href="https://buymeacoffee.com/megumu" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40"></a>
