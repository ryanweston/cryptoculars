import { ISearchResult } from '../types';

const SearchItem = ({ item }: { item: ISearchResult }) => {
  return (
    <div className="px-6 py-6 hover:ring-white hover:border-white hover:cursor-pointer flex flex-col justify-center border-2 border-gray-900 rounded-lg items-center bg-transparent">
      <img alt={item.name} src={item.large} width="75" height="75"></img>
      <div>
        <p className="text-white mt-4 font-semibold leading-tight mb-0">{item.name}</p>
      </div>
    </div>
  );
};

export default SearchItem;
