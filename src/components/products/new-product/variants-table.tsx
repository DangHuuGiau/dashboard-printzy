import React from 'react';
import ImageUpload from '@/components/ui/uploadImage';
import Banner02 from '@/components/banner-02';

interface Props {
  variants: any[];
  setVariants: (variants: any[]) => void;
}

const VariantsTable = (props: Props) => {
  const { variants, setVariants } = props;

  const findOptionValue = (options: any, optionId: any) => {
    const option = options?.find((opt: any) => opt.optionId === optionId);
    return option ? option.valueId : null;
  };

  const groupedData = variants.reduce((acc, item) => {
    const size = findOptionValue(item.optionValues, 3);
    const color = findOptionValue(item.optionValues, 1);
    const key = `Size ${size}, Color ${color}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  const handleGroupImageUpload = (groupKey: string, image: File | null) => {
    setVariants(
      variants.map((variant) =>
        groupedData[groupKey].includes(variant)
          ? { ...variant, image }
          : variant
      )
    );
  };

  const handleCustomizeModelUpdate = (
    groupKey: string,
    customizeModel: string
  ) => {
    setVariants(
      variants.map((variant) =>
        groupedData[groupKey].includes(variant)
          ? { ...variant, customizeModel }
          : variant
      )
    );
  };

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    groupKey: string
  ) => {
    const updatedCustomizeModel = e.target.value;
    handleCustomizeModelUpdate(groupKey, updatedCustomizeModel);
  };

  const handleGroupImageDelete = (groupKey: string) => {
    setVariants(
      variants.map((variant) =>
        groupedData[groupKey].includes(variant)
          ? { ...variant, image: null }
          : variant
      )
    );
  };

  return (
    <>
      {variants.length > 100 && (
        <Banner02 type="warning" open={true} setOpen={() => {}}>
          The limit of variants is 100 variants. You must have edit less than
          100 variants
        </Banner02>
      )}
      <div className="max-h-screen mt-5 overflow-auto bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600">
        <table className="w-full table-auto dark:text-gray-300">
          {/* Table header */}
          <thead className="text-xs font-semibold text-gray-500 uppercase border-t border-b border-gray-100 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-700/60">
            <tr>
              <th className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <span className="sr-only">Image</span>
              </th>
              <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <div className="font-semibold text-left">SKU</div>
              </th>
              <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <div className="font-semibold text-left">Price</div>
              </th>
              <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <div className="font-semibold text-left">Status</div>
              </th>
              <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <span className="font-semibold text-left">Visibility</span>
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
            {Object.entries(groupedData).map(
              ([groupKey, groupItems]: any, index) => (
                <tr key={index} className="hover:bg-teal-100">
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                    <ImageUpload
                      image={groupItems[0]?.image}
                      variantIndex={index}
                      onImageUpload={(index, image) =>
                        handleGroupImageUpload(groupKey, image)
                      }
                      onDeleteImage={() => handleGroupImageDelete(groupKey)}
                    />
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                    <div className="text-left">
                      {groupItems.map((item: any) => (
                        <div className="mt-2 text-left">{item.sku}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                    <div className="text-left">
                      {groupItems.map((item: any) => (
                        <div className="mt-2">{item.price}$</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                    <div className="text-left">
                      {groupItems.map((item: any) => (
                        <div className="mt-2">
                          {item?.isInStock ? 'In stock' : 'Out of stock'}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      {groupItems.map((item: any) => (
                        <div className="mt-2">
                          {item?.isAvailable ? (
                            <svg
                              viewBox="0 0 17 13"
                              data-hook="visible"
                              fill="currentColor"
                              width="1em"
                              height="1em"
                            >
                              <path
                                d="M8.5 8.572c-1.097 0-1.99-.93-1.99-2.072 0-1.143.893-2.073 1.99-2.073s1.99.93 1.99 2.073c0 1.142-.893 2.072-1.99 2.072zm0-5.18c-1.646 0-2.985 1.393-2.985 3.108 0 1.714 1.339 3.108 2.985 3.108s2.985-1.394 2.985-3.108c0-1.715-1.339-3.109-2.985-3.109zm0 8.572c-4.568 0-6.933-4.455-7.411-5.465C1.565 5.49 3.92 1.036 8.5 1.036c4.568 0 6.933 4.454 7.411 5.464-.476 1.012-2.831 5.464-7.411 5.464zm8.418-5.666C16.813 6.041 14.293 0 8.5 0 2.707 0 .187 6.041.082 6.298L0 6.5l.082.201c.105.257 2.625 6.3 8.418 6.3 5.793 0 8.313-6.043 8.418-6.3l.082-.2-.082-.203z"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 17 15"
                              data-hook="invisible"
                              fill="currentColor"
                              width="1em"
                              height="1em"
                            >
                              <path
                                d="M13.031 11.031l-2.044-2.044a3.187 3.187 0 00.498-1.714c0-1.714-1.339-3.109-2.985-3.109-.651 0-1.25.225-1.741.595L4.864 2.864A6.791 6.791 0 018.5 1.809c4.569 0 6.934 4.454 7.411 5.464-.28.597-1.221 2.387-2.88 3.758zM7.495 5.495A1.903 1.903 0 018.5 5.2c1.098 0 1.99.93 1.99 2.073 0 .354-.093.682-.244.973L7.495 5.495zm2.321 3.321a1.933 1.933 0 01-1.316.529c-1.097 0-1.99-.929-1.99-2.072 0-.497.176-.948.457-1.306l2.849 2.849zM8.5 12.737c-4.568 0-6.933-4.454-7.41-5.465.297-.632 1.329-2.609 3.18-4.002l1.981 1.981a3.157 3.157 0 00-.736 2.022c0 1.714 1.339 3.109 2.985 3.109.788 0 1.501-.326 2.035-.847l1.926 1.926c-1.066.739-2.377 1.276-3.961 1.276zM17 7.273l-.082-.202C16.814 6.814 14.294.773 8.5.773c-1.756 0-3.208.559-4.386 1.341L2 0l-.5.5 2.035 2.035C1.229 4.34.15 6.905.082 7.071L0 7.273l.082.202c.105.257 2.625 6.298 8.418 6.298 1.921 0 3.475-.669 4.707-1.566L15.5 14.5l.5-.5-2.231-2.231c2.099-1.784 3.085-4.136 3.149-4.294L17 7.273z"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VariantsTable;
