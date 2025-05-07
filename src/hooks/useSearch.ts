import useSWR from 'swr';
import api from '../api/$api';
import aspida from '@aspida/fetch';

const client = api(aspida(fetch));

// Google Search API の設定
const GOOGLE_API_KEY = 'AIzaSyATURZv5awvkKg9Mo3_JxpdXLV39_oJlXQ';
const GOOGLE_CX = '24713308a62924bea';

// SWRを使用した検索フック
const useSearch = (query: string | null) => {
  console.log('useSearchが実行されました。query:', query);
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    query,
    async () => {
      if (!query) return null;
      console.log('APIが呼び出されます。keyword:', query);
      const res = await client.customsearch.v1.$get({
        query: {
          key: GOOGLE_API_KEY,
          cx: GOOGLE_CX,
          lr: 'lang_ja',
          q: query,
          num: 5
        }
      });
      return res;
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