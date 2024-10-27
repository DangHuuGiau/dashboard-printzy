"use client";

import AddOptionsModal from "@/components/products/new-product/modal-add-options";
import CKEditorComponent from "@/components/ckeditor-input";
import MockupUpload from "@/components/products/new-product/mockup-upload";
import OptionsTable from "@/components/products/new-product/options-table";
import VariantsTable from "@/components/products/new-product/variants-table";
import { useEffect, useState } from "react";
import useCategories from "@/hooks/useCategories";
import useCollections from "@/hooks/useCollections";

export default function NewProduct() {
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
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                Mockup Images
              </h2>
              <MockupUpload />
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                Product Info
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <div>
                    <label
                      className="block mb-1 text-sm font-medium"
                      htmlFor="default"
                    >
                      Product Name
                    </label>
                    <input
                      id="default"
                      className="w-full form-input"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label
                      className="block mb-1 text-sm font-medium"
                      htmlFor="default"
                    >
                      Slug
                    </label>
                    <input
                      id="default"
                      className="w-full form-input"
                      type="text"
                    />
                  </div>
                </div>
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

            {/* Input Sizes */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                Pricing
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  {/* Start */}
                  <div>
                    <label
                      className="block mb-1 text-sm font-medium"
                      htmlFor="prefix"
                    >
                      Price
                    </label>
                    <div className="relative">
                      <input
                        id="prefix"
                        className="w-full pl-12 form-input"
                        type="text"
                      />
                      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                        <span className="px-3 text-sm font-medium text-gray-400 dark:text-gray-500">
                          USD
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* End */}
                </div>
                <div>
                  <label
                    className="block mb-1 text-sm font-medium"
                    htmlFor="prefix"
                  >
                    Discount Price
                  </label>
                  <div className="relative">
                    <input
                      id="prefix"
                      className="w-full pl-12 form-input"
                      type="text"
                    />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <span className="px-3 text-sm font-medium text-gray-400 dark:text-gray-500">
                        USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input States */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                Product Options
              </h2>
              <div className="">
                <div className="m-1.5">
                  {/* Start */}
                  <AddOptionsModal
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                  />
                  <OptionsTable options={selectedOptions} />
                  {/* End */}
                </div>
              </div>
            </div>
            {variants?.length > 0 && (
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Manage Variants
                </h2>
                <div className="">
                  <div className="m-1.5">
                    {/* Start */}

                    <VariantsTable
                      variants={variants}
                      setVariants={setVariants}
                    />

                    {/* End */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white dark:bg-gray-800 p-5 shadow-sm rounded-xl lg:w-[18rem] xl:w-[20rem]">
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
                          disabled
                          checked
                        />
                        <span className="ml-2 text-sm">All Products</span>
                      </label>
                      {/* End */}
                    </div>

                    {categories.map((category) => (
                      <div
                        className="text-sm"
                        key={`select-category-${category.name}`}
                      >
                        <div className="m-3">
                          {/* Start */}
                          <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
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
                  {collections.map((collection) => (
                    <div
                      className="text-sm"
                      key={`select-collection-${collection.name}`}
                    >
                      <div className="m-3">
                        {/* Start */}
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
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
