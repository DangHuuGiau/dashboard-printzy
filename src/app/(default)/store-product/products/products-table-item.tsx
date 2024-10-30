import ActionMenu from '@/components/products/action';
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

  const categoryNames =
    product?.categoryProducts?.map((item: any) => item.category.name) || [];

  const displayedCategories =
    categoryNames.length > 3
      ? categoryNames.slice(0, 3).join(', ') + '...'
      : categoryNames.join(', ');

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
        <div className="w-20 h-20 mr-2 shrink-0 sm:mr-3">
          <Image
            className="rounded-lg"
            src={product?.upload.path}
            width={400}
            height={400}
            alt={product.name}
          />
        </div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="flex items-center">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {product.name}
          </div>
        </div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="text-left">{product.sku}</div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="flex items-center">
          {displayedCategories}
          {categoryNames.length > 3 && (
            <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full w-fit ml-2">
              +{categoryNames.length - 3}
            </div>
          )}
        </div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="text-center">{product.collection.name}</div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="flex gap-2">
          <div className="font-medium text-left text-sky-600">
            {product.discountPrice}
          </div>
          <div className="font-medium text-left line-through text-gray">
            {product.price}
          </div>
        </div>
      </td>
      <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <div className="font-medium text-left text-green-600">
          {product.isAvailable ? 'True' : 'False'}
        </div>
      </td>
      <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
        <ActionMenu align="right" />
      </td>
    </tr>
  );
}
