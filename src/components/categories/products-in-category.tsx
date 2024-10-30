'use client';

import Image from 'next/image';

interface Props {
  products: any[];
  onDeleteProduct: (productId: number) => void;
}

export default function ProductsInCategory(props: Props) {
  const { products, onDeleteProduct } = props;
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product: any, index) => (
        <div className="bg-white shadow-sm dark:bg-gray-800 rounded-xl">
          <div className="flex flex-col h-fit">
            {/* Image */}
            <div className="relative">
              <Image
                className="w-full"
                src={product?.upload?.path}
                width={301}
                height={226}
                alt="Application 21"
              />
              {/* Like button */}
              <button
                className="absolute top-0 right-0 mt-1 mr-1"
                onClick={() => onDeleteProduct(product.id)}
              >
                <div className="w-5 h-5 text-gray-100 bg-gray-900 rounded-full bg-opacity-60">
                  &times;
                </div>
              </button>
              {/* Special Offer label */}
              <div className="absolute bottom-0 right-0 mb-4 mr-4">
                <div className="inline-flex items-center text-xs font-medium text-gray-100 dark:text-gray-300 bg-gray-900/60 dark:bg-gray-800/60 rounded-full text-center px-2 py-0.5">
                  <span>{index + 1}</span>
                </div>
              </div>
            </div>
            {/* Card Content */}
            <div className="flex flex-col p-2 grow">
              {/* Card body */}
              <div className="grow">
                <header className="mb-2">
                  <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {product?.name}
                  </h3>
                </header>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
