import type { Dispatch, SetStateAction } from 'react';

const PageControls = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <button
        className="mr-2 text-sm bg-transparent border border-white rounded-lg text-white px-5 py-3 disabled:text-black disabled:bg-gray-600 disabled:border-0 hover:bg-white hover:text-black hover:border-white"
        onClick={() => setPage(page - 1)}
        disabled={page === 1 ? true : false}
      >
        Previous
      </button>
      <button
        className="ml-2 text-sm bg-white border border-white rounded-lg text-black px-5 py-3 disabled:text-black disabled:bg-gray-600 disabled:border-0 hover:bg-transparent hover:text-white hover:border-white"
        onClick={() => setPage(page + 1)}
      >
        Next page
      </button>
    </>
  );
};

export default PageControls;
