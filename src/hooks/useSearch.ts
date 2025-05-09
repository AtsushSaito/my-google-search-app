import useSWR from "swr";
import aspida from "@aspida/fetch";
import googleApi from "../api1/$api";
import braveApi from "../api2/$api";

// APIクライアントの初期化
const googleClient = googleApi(aspida(fetch));
const braveClient = braveApi(aspida(fetch));

// Google API設定
const GOOGLE_API_KEY = "AIzaSyATURZv5awvkKg9Mo3_JxpdXLV39_oJlXQ";
const GOOGLE_CX = "24713308a62924bea";

// 検索エンジンタイプの定義
export type SearchEngineType = "google" | "brave";

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
const useSearch = (
  query: string | null,
  searchEngine: SearchEngineType = "google"
) => {
  console.log(
    "useSearchが実行されました。query:",
    query,
    "searchEngine:",
    searchEngine
  );
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<SearchResult | null>(
      query ? [query, searchEngine] : null,
      async ([query, engine]: [string, SearchEngineType]) => {
        if (!query) return null;
        console.log(
          `APIが呼び出されます。keyword: ${query}, engine: ${engine}`
        );

        // 検索エンジンに応じたAPI呼び出し
        if (engine === "google") {
          // Google検索API - Next.jsのAPIルートを使用
          console.log("Google検索を実行します - Next.js APIルート経由");
          try {
            const res = await googleClient.google_search.$get({
              query: {
                q: query,
                num: 5,
                lr: "lang_ja",
              },
            });
            return {
              engine: "google" as const,
              data: res as GoogleSearchResult,
            };
          } catch (error) {
            console.error("Google API Error:", error);
            throw error;
          }
        } else {
          // Brave検索API - aspidaクライアントとNext.jsのAPIルートを使用
          console.log("Brave検索を実行します - aspidaクライアント経由");
          try {
            const braveData = await braveClient.brave_search.$get({
              query: {
                q: query,
                count: 5,
                search_lang: "jp",
              },
            });

            return {
              engine: "brave" as const,
              data: braveData as BraveSearchResult,
            };
          } catch (error) {
            console.error("Brave API Error:", error);
            throw error;
          }
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
