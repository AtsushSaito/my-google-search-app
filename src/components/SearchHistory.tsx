import React from 'react';
import { SearchHistoryItem } from '../hooks/useSearchHistory';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSearchFromHistory: (query: string, engine: 'google' | 'brave') => void;
  onRemoveHistoryItem: (index: number) => void;
  onClearHistory: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSearchFromHistory,
  onRemoveHistoryItem,
  onClearHistory
}) => {
  if (history.length === 0) {
    return <div className="text-center text-gray-500 my-4">検索履歴はありません</div>;
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="search-history-container">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">検索履歴</h3>
        <button
          onClick={onClearHistory}
          className="text-sm text-red-600 hover:text-red-800"
        >
          履歴を削除
        </button>
      </div>
      
      <ul className="divide-y divide-gray-200">
        {history.map((item, index) => (
          <li key={`${item.query}-${item.timestamp}`} className="py-3 flex justify-between items-center">
            <div 
              className="flex-1 cursor-pointer hover:text-blue-600"
              onClick={() => onSearchFromHistory(item.query, item.engine)}
            >
              <div className="flex items-center">
                <span className="mr-2 text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                  {item.engine === 'google' ? 'Google' : 'Brave'}
                </span>
                <span className="font-medium">{item.query}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{formatDate(item.timestamp)}</p>
            </div>
            <button
              onClick={() => onRemoveHistoryItem(index)}
              className="text-gray-400 hover:text-red-600 ml-2"
              aria-label="削除"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory; 