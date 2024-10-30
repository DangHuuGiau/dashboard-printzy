'use client';

import { useState } from 'react';
import ModalBasic from '@/components/modal-basic';
import useProducts from '@/hooks/useProducts';
import Image from 'next/image';

interface Props {
  onAddProducts: (product: any[]) => void;
}

export default function AddProductsModal(props: Props) {
  const { onAddProducts } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const products = useProducts({ name: searchTerm });

  const handleChoiceClick = (product: any) => {
    if (!selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveChoice = (removingProduct: any) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product !== removingProduct)
    );
  };

  const handleSave = () => {
    onAddProducts(selectedProducts);
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center -m-1.5">
        <div className="m-1.5">
          <button
            type="button"
            className="text-gray-100 bg-gray-900 btn hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <svg
              className="text-gray-400 fill-current shrink-0"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="ml-2">Add Products</span>
          </button>
          <ModalBasic
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            title="Add Products to this category"
          >
            <div className="flex flex-col gap-4 px-5 pt-4 pb-1">
              <div className="flex flex-col w-full">
                <div className="w-full">
                  <div className="flex my-2">
                    <div className="flex flex-wrap flex-auto w-full">
                      {selectedProducts.map((product, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center px-2 py-1 m-1 font-medium text-teal-700 bg-teal-100 border border-teal-300 rounded-full"
                        >
                          <div className="flex-initial max-w-full text-xs font-normal leading-none">
                            {product.name}{' '}
                            {/* Display product name instead of the object */}
                          </div>
                          <div className="flex flex-row-reverse flex-auto">
                            <div
                              onClick={() => handleRemoveChoice(product)}
                              className="w-4 h-4 ml-2 rounded-full cursor-pointer hover:text-teal-400"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                      <input
                        name="search-product"
                        placeholder="Type to search product..."
                        className="w-full form-input"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full overflow-y-auto bg-white rounded shadow h-28">
                    {products?.map((product: any) => (
                      <div
                        key={product.id}
                        className="w-full border-b border-gray-100 cursor-pointer hover:bg-teal-100"
                        onClick={() => handleChoiceClick(product)}
                      >
                        <div className="flex items-center w-full p-2 pl-2">
                          <div className="flex items-center w-full gap-4">
                            <div className="w-14 h-14">
                              <Image
                                className="rounded-full"
                                src={product.upload.path}
                                width={400}
                                height={400}
                                alt={product.name}
                              />
                            </div>
                            <div className="mx-2 leading-6">{product.name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="text-gray-100 bg-gray-900 btn-sm hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                  onClick={handleSave}
                >
                  Add
                </button>
              </div>
            </div>
          </ModalBasic>
        </div>
      </div>
    </div>
  );
}
