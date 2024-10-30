interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalItems: number;
    itemsPerPage: number;
  }
  
  export const Pagination = ({ page, setPage, totalItems, itemsPerPage }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    return (
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="mx-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          Previous
        </button>
        <span className="mx-4 py-2 dark:text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="mx-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          Next
        </button>
      </div>
    );
  };
  