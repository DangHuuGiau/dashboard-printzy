"use client";

import AddOptionsModal from "@/components/products/new-product/modal-add-options";
import CKEditorComponent from "@/components/ckeditor-input";
import MockupUpload from "@/components/products/new-product/mockup-upload";
import OptionsTable from "@/components/products/new-product/options-table";
import VariantsTable from "@/components/products/new-product/variants-table";
import { useEffect, useState } from "react";
import useCategories from "@/hooks/useCategories";
import useCollections from "@/hooks/useCollections";

export default function NewCategory() {
  const categories = useCategories();
  const collections = useCollections();

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const generateVariants = (options: any) => {
    const variants: any[] = [];

    const combine = (index: number, currentVariant: any) => {
      if (index === options.length) {
        const variant = {
          price: 0,
          stock: 100,
          isAvailable: true,
          sku: currentVariant
            .map((optionValue: any) => optionValue.value)
            .join(" - "),
          uploadId: 0,
          optionValues: currentVariant.map((optionValue: any) => ({
            optionId: optionValue.optionId,
            valueId: optionValue.id,
          })),
        };
        variants.push(variant);
        return;
      }

      const option = options[index];
      for (const value of option.optionValues) {
        combine(index + 1, [
          ...currentVariant,
          { ...value, optionId: option.id },
        ]);
      }
    };

    combine(0, []);
    return variants;
  };

  useEffect(() => {
    if (selectedOptions?.length > 1) {
      const variants = generateVariants(selectedOptions);
      setVariants(variants);
    }
  }, [selectedOptions]);

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="px-5 py-4 mb-8">
        <div className="flex flex-wrap justify-end space-x-2">
          <button className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300">
            Cancel
          </button>
          <button className="text-gray-100 bg-gray-900 btn-sm hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col max-w-5xl mx-auto lg:flex-row lg:space-x-8 xl:space-x-16 ">
        <div>
          <div className="p-5 space-y-8 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
              Product in Category
            </h2>

            <div>
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-lg text-gray-800 dark:text-gray-100">
                  Start adding products to your category
                </h4>
                <p className="mb-6 text-sm text-gray-800 dark:text-gray-100">
                  Create a new category to display on your site.
                </p>
                <button className="text-gray-100 bg-gray-900 btn hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
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
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div>
            <div className="p-5 space-y-8 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Category Info
                </h2>
                <div className="mx-auto"></div>
              </div>

              <div>
                <div>
                  <label
                    className="block mb-1 text-sm font-medium"
                    htmlFor="default"
                  >
                    Category Image
                  </label>
                  <MockupUpload />
                </div>

                <div className="mt-4">
                  <label
                    className="block mb-1 text-sm font-medium"
                    htmlFor="default"
                  >
                    Category Name
                  </label>
                  <input
                    id="default"
                    className="w-full form-input"
                    type="text"
                  />
                </div>

                <div className="mt-4">
                  <div>
                    {/* Start */}
                    <div>
                      <label
                        className="block mb-1 text-sm font-medium"
                        htmlFor="prefix"
                      >
                        Description
                      </label>
                      <CKEditorComponent />
                    </div>
                    {/* End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
