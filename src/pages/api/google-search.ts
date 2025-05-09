import { NextApiRequest, NextApiResponse } from 'next';

// Google Search API の設定
const GOOGLE_API_KEY = 'AIzaSyATURZv5awvkKg9Mo3_JxpdXLV39_oJlXQ';
const GOOGLE_CX = '24713308a62924bea';

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
    const { q, num, lr } = req.query;

    // APIリクエストを構築
    const url = `https://customsearch.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(q as string)}&num=${num || 5}&lr=${lr || 'lang_ja'}`;
    
    console.log('Proxying request to Google API');

    // Google APIへのリクエスト
    const response = await fetch(url);

    // レスポンスのステータスとデータを取得
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Google API Error:', data);
      return res.status(response.status).json(data);
    }

    // 成功したレスポンスをクライアントに返す
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error in Google search proxy:', error);
    
    // エラーオブジェクトの型チェック
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
      
    return res.status(500).json({ error: 'Internal server error', message: errorMessage });
  }
} 