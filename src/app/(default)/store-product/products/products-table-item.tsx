import Image from 'next/image';

interface ProductsTableItemProps {
  product: any;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
}

export default function ProductsTableItem({
  product,
  onCheckboxChange,
  isSelected,
}: ProductsTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(product.id, e.target.checked);
  };

  return (
    <tr>
      <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              className="form-checkbox"
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={isSelected}
            />
          </label>
        </div>
      </td>
      <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="relative flex items-center">
          <button>
            <svg
              className={`shrink-0 fill-current ${
                product.fav
                  ? 'text-yellow-500'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-2 shrink-0 sm:mr-3">
            <Image
              className="rounded-full"
              src={product.image}
              width={40}
              height={40}
              alt={product.name}
            />
          </div>
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {product.name}
          </div>
        </div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="text-left">{product.email}</div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="text-left">{product.location}</div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="text-center">{product.orders}</div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="font-medium text-left text-sky-600">
          {product.lastOrder}
        </div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="font-medium text-left text-green-600">
          {product.spent}
        </div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="text-center">{product.refunds}</div>
      </td>
      <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        {/* Menu button */}
        <button className="text-gray-400 rounded-full hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
          <span className="sr-only">Menu</span>
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
