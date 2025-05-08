This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Google Custom Search API の設定

このアプリはGoogle Custom Search APIを使用して検索結果を取得しています。デフォルトのAPI設定を変更することで、異なるGoogle Custom Search APIを使用することができます。

### API設定の変更方法

`src/hooks/useSearch.ts`ファイル内の以下の値を変更してください：

```typescript
// Google Search API の設定
const GOOGLE_API_KEY = 'YOUR_API_KEY'; // あなたのGoogle APIキー
const GOOGLE_CX = 'YOUR_CX_VALUE';     // あなたのCustom Search Engineの識別子
```

1. `GOOGLE_API_KEY`: [Google Cloud Platform](https://console.cloud.google.com/)で取得したAPIキー
2. `GOOGLE_CX`: [Programmable Search Engine](https://programmablesearchengine.google.com/about/)で作成した検索エンジンのCX値

これらの値を変更することで、独自のGoogle Custom Search APIを使用できるようになります。

## Brave Search API の設定

このアプリはBrave Search APIもサポートしています。UIから簡単に検索エンジンを切り替えることができます。

### Brave API設定の変更方法

`src/hooks/useSearch.ts`ファイル内の以下の値を変更してください：

```typescript
// Brave Search API の設定
const BRAVE_API_KEY = 'YOUR_BRAVE_API_KEY'; // あなたのBrave Search APIキー
```

`BRAVE_API_KEY`: [Brave Search API](https://brave.com/search/api/)から取得したAPIキー

## 検索エンジンの切り替え

アプリ上部のトグルボタンでGoogle検索とBrave検索を簡単に切り替えることができます。検索エンジンを切り替えると、同じキーワードで選択したエンジンを使って再検索が実行されます。
