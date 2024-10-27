import React from "react";
import ActionMenu from "../action";
import ImageUpload from "@/components/ui/uploadImage";

interface Props {
  variants: any[];
  setVariants: (variants: any[]) => void;
}
const VariantsTable = (props: Props) => {
  const { variants, setVariants } = props;

  const handleImageUpload = (variantIndex: number, imageUrl: string | null) => {
    setVariants(
      variants.map((variant, index) =>
        index === variantIndex ? { ...variant, imageUrl } : variant
      )
    );
  };

  const handleImageDelete = (variantIndex: number) => {
    setVariants(
      variants.map((variant, index) =>
        index === variantIndex ? { ...variant, imageUrl: null } : variant
      )
    );
  };

  return (
    <div className="mt-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600">
      <table className="w-full table-auto dark:text-gray-300">
        {/* Table header */}
        <thead className="text-xs font-semibold text-gray-500 uppercase border-t border-b border-gray-100 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-700/60">
          <tr>
            <th className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
              <span className="sr-only">Image</span>
            </th>
            <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
              <div className="font-semibold text-left">Variant</div>
            </th>
            <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
              <div className="font-semibold text-left">SKU</div>
            </th>
            <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
              <div className="font-semibold text-left">Price</div>
            </th>
            <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
              <span className="sr-only">Menu</span>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
          {variants?.map((variant, index) => (
            <tr>
              <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <ImageUpload
                  variantIndex={index}
                  onImageUpload={handleImageUpload}
                  onDeleteImage={handleImageDelete}
                />
              </td>
              <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <div className="text-left">{variant.sku}</div>
              </td>
              <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <div className="text-left">{variant.sku}</div>
              </td>
              <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <div className="text-left">{variant.price}</div>
              </td>
              <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <ActionMenu align="right" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariantsTable;
