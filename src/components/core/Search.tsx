import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchTypes {
  searchParams: string;
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchTypes> = ({ searchParams, onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(searchParams);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-1/3">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

      <input
        ref={inputRef}
        type="text"
        placeholder="Search For Tasks"
        value={query}
        onChange={handleInputChange}
        className="w-full pl-10 pr-20 p-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring focus:ring-purple-200"
      />

      {/* Keybinding Hint */}
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-semibold border p-1 border-gray-300 rounded-sm">
        ⌘+K
      </span>
    </div>
  );
};

export default Search;

