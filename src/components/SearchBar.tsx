import { SearchIcon } from '@heroicons/react/solid';
import React, { Dispatch, SetStateAction } from 'react';

const SearchBar = ({
  search,
  setSearch,
  setState,
  searchList,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setState: Dispatch<SetStateAction<boolean>>;
  searchList: any;
}) => {
  const textInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const keyInputHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // state change first for quicker feedback loop
      setState(true);
      searchList(search);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="relative flex-row">
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => textInputHandler(e)}
          onKeyUp={(e) => keyInputHandler(e)}
          placeholder="Search for a coin"
          className="shadow-sm text-white focus:ring-white focus:border-white bg-transparent block border-2 w-full pl-4 pr-20 py-4 sm:text-sm border-gray-800 rounded-md"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <SearchIcon
            className="h-10 w-10 px-2 text-sm text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
