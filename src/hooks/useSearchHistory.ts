import { useState, useEffect } from 'react';

// 検索履歴の型定義
export interface SearchHistoryItem {
  query: string;
  engine: 'google' | 'brave';
  timestamp: number;
}

const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // コンポーネントがマウントされたときに、ローカルストレージから検索履歴を読み込む
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('検索履歴の読み込みに失敗しました', e);
        localStorage.removeItem('searchHistory');
      }
    }
  }, []);

  // 検索履歴を保存する関数
  const addToHistory = (query: string, engine: 'google' | 'brave') => {
    // 重複を避けるため、同じクエリと検索エンジンの組み合わせがあればそれを削除
    const filteredHistory = history.filter(
      item => !(item.query === query && item.engine === engine)
    );
    
    // 新しい検索履歴アイテムを作成
    const newItem: SearchHistoryItem = {
      query,
      engine,
      timestamp: Date.now()
    };
    
    // 最新の検索を先頭に追加（最新順）
    const newHistory = [newItem, ...filteredHistory].slice(0, 20); // 最大20件まで保存
    
    // 状態とローカルストレージを更新
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // 履歴を削除する関数
  const removeFromHistory = (index: number) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // 履歴をすべて削除する関数
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
};

export default useSearchHistory; 