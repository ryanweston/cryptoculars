import './index.css';

import {
  ArrowNarrowDownIcon,
  ArrowNarrowLeftIcon,
  ArrowNarrowUpIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, UseQueryResult } from 'react-query';

import logo from './assets/logo.svg';
import { ListItem, PageControls, SearchBar, SearchItem, SortMenu } from './components';
import { ICurrency, ISearchResult } from './types';

const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
}

function useCurrencies(
  page: number,
  sort: string,
  ascending: boolean,
): UseQueryResult<ICurrency[], Error> {
  return useQuery(
    ['fetchCoins', page, sort, ascending],
    async () => {
      let order = ascending ? 'asc' : 'desc';
      return await (
        await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=${
            sort + order
          }&per_page=20&page=${page}&sparkline=false`,
        )
      ).json();
    },
    // This tells React-Query that this is Query is part of
    // a paginated component
    { keepPreviousData: true },
  );
}

function useSearchItem(search: string): UseQueryResult<ISearchResult[], Error> {
  return useQuery(['fetchSearchItems', search], async () => {
    return (
      await (
        await fetch(`https://api.coingecko.com/api/v3/search?query=${search}`)
      ).json()
    ).coins;
  });
}

function Page() {
  // Pagination & sort states
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('market_cap_desc_');
  const [ascending, setAscending] = useState(false);

  // Search states
  const [search, setSearch] = useState('');
  const [state, setState] = useState(false);

  // Queries
  const coinsList = useCurrencies(page, sort, ascending);
  const searchList = useSearchItem(search);

  const adjustFilter = (callback: any) => {
    callback();
    setPage(1);
  };

  const reset = () => {
    setState(false);
    setSearch('');
  };

  return (
    <div className="App flex flex-col justify-center items-center">
      <div className="w-full px-20 py-20 max-w-screen-lg relative">
        <div className="flex flex-col items-center">
          <img src={logo} className="text-white logo" alt="logo" />
          <h1 className="text-6xl font-bold text-white">Cryptoculars</h1>
          <p className="text-center">Keep your eye on the prize</p>
        </div>

        <div>
          <div className="flex flex-row mt-24 justify-between w-full">
            <div>
              <SearchBar
                search={search}
                searchList={searchList}
                setSearch={setSearch}
                setState={setState}
              />
            </div>

            <div className="flex items-center max-w-7xl">
              <button
                onClick={() => adjustFilter(() => setAscending(!ascending))}
                className="inline-flex justify-center text-sm font-medium px-4 text-white hover:text-white text-sm font-medium px-4 py-4 text-gray-400 hover:text-white"
              >
                {ascending ? (
                  <>
                    <ArrowNarrowDownIcon
                      className="h-5 w-5 mr-1 text-white"
                      aria-hidden="true"
                    />
                    Ascending
                  </>
                ) : (
                  <>
                    <ArrowNarrowUpIcon
                      className="h-5 w-5 mr-1 text-white"
                      aria-hidden="true"
                    />
                    Descending
                  </>
                )}
              </button>
              <SortMenu adjustFilter={adjustFilter} setSort={setSort} />
            </div>
          </div>

          <div className="mt-8">
            {state ? (
              <button
                onClick={() => {
                  reset();
                }}
                className="group text-white text-sm flex flex-row"
              >
                <ArrowNarrowLeftIcon
                  className="h-5 w-5 mr-1 text-white group-hover:mr-2"
                  aria-hidden="true"
                />
                Back to list
              </button>
            ) : (
              <></>
            )}
            <div className="grid grid-flow-row gap-4 grid-cols-4 grid-space-2 grid-gap-3 mt-4">
              {state ? (
                <>
                  {searchList.isLoading || searchList.isFetching ? (
                    <p className="text-white">Loading...</p>
                  ) : searchList.isError ? (
                    <div className="text-white">{searchList.error.message}</div>
                  ) : (
                    searchList.data &&
                    searchList.data.map((item, index) => {
                      return <SearchItem key={index} item={item} />;
                    })
                  )}
                </>
              ) : (
                <>
                  {coinsList.isLoading || coinsList.isFetching ? (
                    <p className="text-white">Loading...</p>
                  ) : coinsList.isError ? (
                    <div className="text-white">{coinsList.error.message}</div>
                  ) : (
                    coinsList.data &&
                    coinsList.data.map((item, index) => {
                      return <ListItem key={index} item={item} />;
                    })
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-row justify-center mt-10 w-full items-center">
            {state && searchList.data ? (
              <p className="text-gray-800">{searchList.data.length} results</p>
            ) : (
              <PageControls page={page} setPage={setPage} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
