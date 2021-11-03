import { useEffect, useState } from 'react';
import Links from './Links';
import { useResultContext } from '../contexts/ResultContextProvider';
import { useDebounce } from 'use-debounce';

export default function Search() {
  const [text, setText] = useState('Learn Programming');
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Cari disini"
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
      />
      {!text && (
        <button
          type="button"
          onClick={() => setText('')}
          className="absolute top-1.5 right-4 text-xl text-gray-500">
          X
        </button>
      )}
      <Links />
    </div>
  );
}
