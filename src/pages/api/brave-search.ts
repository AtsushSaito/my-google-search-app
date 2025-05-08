import { NextApiRequest, NextApiResponse } from 'next';

// Brave Search API の設定
const BRAVE_API_KEY = 'BSAOLOinphXxKMWEC2DnyN6mTY_n6Wz';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GETリクエストのみ許可
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // クエリパラメータを取得
    const { q, count } = req.query;

    // APIリクエストを構築 - "ja" ではなく "jp" を使用
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(q as string)}&count=${count || 5}&search_lang=jp`;
    
    console.log('Proxying request to Brave API:', url);

    // Brave APIへのリクエスト
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': BRAVE_API_KEY
      }
    });

    // レスポンスのステータスとデータを取得
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Brave API Error:', data);
      return res.status(response.status).json(data);
    }

    // 成功したレスポンスをクライアントに返す
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error in Brave search proxy:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
} 