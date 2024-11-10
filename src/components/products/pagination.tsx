interface Props {
  filterParams: any;
  setFilterParams: (filterParams: any) => void;
  data: { skip: number; limit: number; total: number };
}

export default function ProductsPagination({
  filterParams,
  setFilterParams,
  data,
}: Props) {
  const { skip = 0, limit = 1, total = 0 } = data;
  const currentPage = filterParams.skip || 1;
  const totalPages = Math.ceil(total / limit);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setFilterParams({ ...filterParams, skip: currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setFilterParams({ ...filterParams, skip: currentPage + 1 });
    }
  };

  const startItem = skip + 1;
  const endItem = Math.min(skip + limit, total);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`btn ${
                currentPage === 1
                  ? 'text-gray-300 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700/60 dark:text-gray-600'
                  : 'text-gray-800 bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700/60 dark:text-gray-300'
              }`}
            >
              &lt;- Previous
            </button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`btn ${
                currentPage === totalPages
                  ? 'text-gray-300 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700/60 dark:text-gray-600'
                  : 'text-gray-800 bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700/60 dark:text-gray-300'
              }`}
            >
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-center text-gray-500 sm:text-left">
        Showing{' '}
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {startItem}
        </span>{' '}
        to{' '}
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {endItem}
        </span>{' '}
        of{' '}
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {total}
        </span>{' '}
        results
      </div>
    </div>
  );
}
