import React, { FC } from "react";

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginateFront: Function;
  paginateBack: Function;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
}) => {
  const currentFrom = currentPage * postsPerPage - postsPerPage + 1;
  const currentTo =
    currentPage * postsPerPage > totalPosts
      ? totalPosts
      : currentPage * postsPerPage;

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentFrom}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentTo}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPosts}
        </span>{" "}
        Entries.
      </span>
      <span className="text-sm text-gray-400 ">
        Page # {currentTo < 10 ? 1 : Math.ceil(currentTo / 10)}
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => {
            paginateBack();
          }}
          className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-400 bg-gray-800 rounded-l border-0 border-l border-gray-700 hover:bg-gray-900 disabled:cursor-not-allowed"
          disabled={currentFrom === 1}
        >
          <svg
            aria-hidden="true"
            className="mr-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          Prev
        </button>
        <button
          onClick={() => {
            paginateFront();
          }}
          disabled={currentTo === totalPosts}
          className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-400 bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 disabled:cursor-not-allowed"
        >
          Next
          <svg
            aria-hidden="true"
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
