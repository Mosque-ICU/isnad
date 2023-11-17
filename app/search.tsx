'use client';

import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition, useState } from 'react';

export default function Search({ disabled }: { disabled?: boolean }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(term: string) {
    setIsPending(true);
    router.push(`/search?q=${term}`);
  }

  React.useEffect(() => {
    if (searchTerm && isPending && searchParams?.get('q') === searchTerm) {
      setIsPending(false);
    }
  }, [searchParams]);

  return (
    <div className="relative max-w-md  w-[30vw] min-w-[200px]">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="rounded-md shadow-sm">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3  "
          aria-hidden="true"
        >
          <MagnifyingGlassIcon
            className="mr-3 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          disabled={disabled}
          value={searchTerm}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isPending) {
              handleSearch(searchTerm);
            }
          }}
          className="h-10 block w-full rounded-md border border-gray-200 px-9 py-2 text-base font-medium text-gray-900 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
          placeholder="Search hadith ..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && !isPending && (
          <ArrowRightCircleIcon
            title="Search"
            className="ml-1 h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700 absolute right-[3px] top-[9px] bottom-0 flex items-center justify-center"
            onClick={() => handleSearch(searchTerm)}
          />
        )}
      </div>

      {isPending && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
