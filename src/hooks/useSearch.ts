import useSWR from 'swr';
import api from '../api/$api';
import aspida from '@aspida/fetch';

const client = api(aspida(fetch));

// Google Search API の設定
const GOOGLE_API_KEY = 'AIzaSyATURZv5awvkKg9Mo3_JxpdXLV39_oJlXQ';
const GOOGLE_CX = '24713308a62924bea';

// 検索エンジンタイプの定義
export type SearchEngineType = 'google' | 'brave';

// Google検索結果の型定義
export interface GoogleSearchResult {
  items?: Array<{
    title: string;
    link: string;
    snippet: string;
  }>;
}

// Brave検索結果の型定義
export interface BraveSearchResult {
  web?: {
    results?: Array<{
      title: string;
      url: string;
      description: string;
    }>;
  };
}

// 検索結果の型定義
export interface SearchResult {
  engine: SearchEngineType;
  data: GoogleSearchResult | BraveSearchResult;
}

// SWRを使用した検索フック
const useSearch = (query: string | null, searchEngine: SearchEngineType = 'google') => {
  console.log('useSearchが実行されました。query:', query, 'searchEngine:', searchEngine);
  const { data, error, isLoading, isValidating, mutate } = useSWR<SearchResult | null>(
    query ? [query, searchEngine] : null,
    async ([query, engine]: [string, SearchEngineType]) => {
      if (!query) return null;
      console.log(`APIが呼び出されます。keyword: ${query}, engine: ${engine}`);
      
      // 検索エンジンに応じたAPI呼び出し
      if (engine === 'google') {
        // Google検索APIの呼び出し
        const res = await client.customsearch.v1.$get({
          query: {
            key: GOOGLE_API_KEY,
            cx: GOOGLE_CX,
            lr: 'lang_ja',
            q: query,
            num: 5
          }
        });
        return { 
          engine: 'google' as const, 
          data: res as GoogleSearchResult 
        };
      } else {
        // Brave検索API - Next.jsのAPIルートを使用
        console.log('Brave検索を実行します - APIルート経由');
        const apiUrl = `/api/brave-search?q=${encodeURIComponent(query)}&count=5&search_lang=jp`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Brave API Error:', errorText);
          throw new Error(`Brave API Error: ${response.status} ${response.statusText}`);
        }
        
        const braveData = await response.json();
        
        return { 
          engine: 'brave' as const, 
          data: braveData as BraveSearchResult 
        };
      }
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, 
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};

export default useSearch;