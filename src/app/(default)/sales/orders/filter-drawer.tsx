import useCategories from '@/hooks/useCategories';
import useCollections from '@/hooks/useCollections';
import { useState } from 'react';

const inventoryOption = [
  { id: 1, name: 'All', value: undefined },
  { id: 2, name: 'On sale', value: true },
  { id: 3, name: 'Out of sale', value: false },
];

interface Props {
  filterParams: any;
  setFilterParams: (filterParams: any) => void;
}

export default function FilterDrawer({ filterParams, setFilterParams }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { categories } = useCategories();
  const collections = useCollections();

  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [collectionId, setCollectionId] = useState<number | null>(null);

  const handleCategoryChange = (categoryId: number) => {
    setCategoryIds((prevIds) => {
      const newIds = prevIds.includes(categoryId)
        ? prevIds.filter((id) => id !== categoryId)
        : [...prevIds, categoryId];
      setFilterParams({
        ...filterParams,
        categoryId: newIds,
      });
      return newIds;
    });
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="btn px-2.5 bg-white dark:bg-gray-800 border-gray-200 hover:border-gray-300 dark:border-gray-700/60 dark:hover:border-gray-600 text-gray-400 dark:text-gray-500"
        onClick={toggleDrawer}
      >
        <span className="sr-only">Filter</span>
        <wbr />
        <svg
          className="fill-current"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM3 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM7 12a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Z" />
        </svg>
      </button>

      {/* Drawer component */}
      <div
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-white w-80 dark:bg-gray-800`}
      >
        <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
          Filter Options
        </h5>
        {/* Close button */}
        <button
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        {/* Filter content */}

        <div className="space-y-4">
          <div className="relative">
            <input
              id="form-search"
              className="w-full form-input pl-9"
              type="search"
              placeholder="Search Order number..."
              onChange={(e) =>
                setFilterParams({
                  ...filterParams,
                  orderNumber: e.target.value,
                })
              }
            />
            <button
              className="absolute inset-0 right-auto group"
              type="submit"
              aria-label="Search"
            >
              <svg
                className="ml-3 mr-2 text-gray-400 fill-current shrink-0 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <input
              id="form-search"
              className="w-full form-input pl-9"
              type="search"
              placeholder="Search Product SKU..."
              onChange={(e) =>
                setFilterParams({
                  ...filterParams,
                  sku: e.target.value,
                })
              }
            />
            <button
              className="absolute inset-0 right-auto group"
              type="submit"
              aria-label="Search"
            >
              <svg
                className="ml-3 mr-2 text-gray-400 fill-current shrink-0 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>

          <div className="">
            <ul className="mb-4 space-y-2 sm:flex sm:space-y-0 sm:space-x-2 lg:space-y-2 lg:space-x-0 lg:flex-col">
              <li>
                <button className="w-full h-full px-4 py-3 text-left transition bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="flex flex-wrap items-center justify-between mb-0.5">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      Categories
                    </span>
                  </div>
                  <div className="text-sm">
                    <div className="m-3">
                      {/* Start */}
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800"
                          checked={categoryIds.length === 0}
                          onChange={() => setCategoryIds([])}
                        />
                        <span className="ml-2 text-sm">All Categories</span>
                      </label>
                      {/* End */}
                    </div>
                    {categories?.map((category) => (
                      <div
                        className="text-sm"
                        key={`select-category-${category.name}`}
                      >
                        <div className="m-3">
                          {/* Start */}
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={categoryIds.includes(category.id)}
                              onChange={() => handleCategoryChange(category.id)}
                              className="form-checkbox"
                            />
                            <span className="ml-2 text-sm">
                              {category.name}
                            </span>
                          </label>
                          {/* End */}
                        </div>
                      </div>
                    ))}
                  </div>
                </button>
              </li>

              <li>
                <div className="w-full h-full px-4 py-3 text-left transition bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="flex flex-wrap items-center justify-between mb-0.5">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      Collections
                    </span>
                  </div>

                  <div className="text-sm">
                    <div className="m-3">
                      {/* Start */}
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="collection"
                          className="form-radio"
                          checked={collectionId === null}
                          onChange={() => {
                            setCollectionId(null);
                            setFilterParams({
                              ...filterParams,
                              collectionId: undefined,
                            });
                          }}
                        />
                        <span className="ml-2 text-sm">All Collections</span>
                      </label>
                      {/* End */}
                    </div>
                  </div>
                  {collections.map((collection) => (
                    <div
                      className="text-sm"
                      key={`select-collection-${collection.name}`}
                    >
                      <div className="m-3">
                        {/* Start */}
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="collection"
                            value={collection.name}
                            checked={collectionId === collection.id}
                            onChange={() => {
                              setCollectionId(collection.id);
                              setFilterParams({
                                ...filterParams,
                                collectionId: collection.id,
                              });
                            }}
                            className="form-radio"
                          />
                          <span className="ml-2 text-sm">
                            {collection.name}
                          </span>
                        </label>
                        {/* End */}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
