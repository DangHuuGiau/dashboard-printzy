'use client';

import AddOptionsModal from '@/components/products/new-product/modal-add-options';
import CKEditorComponent from '@/components/ckeditor-input';
import MockupUpload from '@/components/products/new-product/mockup-upload';
import OptionsTable from '@/components/products/new-product/options-table';
import VariantsTable from '@/components/products/new-product/variants-table';
import { useEffect, useState } from 'react';
import useCategories from '@/hooks/useCategories';
import useCollections from '@/hooks/useCollections';
import uploadsService from '@/api/uploads';
import productsService from '@/api/products';
import photosService from '@/api/photos';
import VariantsEditModal from '@/components/products/new-product/variant-edit-modal';
import variantsService from '@/api/variants';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/contexts/modal/ConfirmContext';
import ConfirmModal from '@/components/ui/confirm-modal';
import useProduct from '@/hooks/useProduct';

export default function SingleProduct({ params }: { params: { sku: string } }) {
  const router = useRouter();
  const { confirm } = useConfirm();

  const product = useProduct(params?.sku);

  const categories = useCategories();
  const collections = useCollections();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [collectionId, setCollectionId] = useState<number | null>(null);

  const [images, setImages] = useState<File[] | any[]>([]);

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);

  const initVariants = async (productId: string) => {
    const { data } = await variantsService.getList(productId);
    setVariants(data);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDiscountPrice(product.discountPrice);
      setDescription(product.description);
      setCollectionId(product.collection.id);
      setCategoryIds(
        product.categoryProducts.map((item: any) => item.category.id)
      );
      setSelectedOptions(
        product.productOptions.map(({ option, productOptionValues }: any) => ({
          id: option.id,
          name: option.name,
          optionValues: productOptionValues.map(({ optionValue }: any) => ({
            value: optionValue.value,
            optionValueId: optionValue,
          })),
        }))
      );
      initVariants(product.id);
    }
  }, [product]);

  const generateVariants = (options: any) => {
    const variants: any[] = [];

    const combine = (index: number, currentVariant: any) => {
      if (index === options.length) {
        const variant = {
          price: 0,
          baseCost: 0,
          isAvailable: true,
          sku: currentVariant
            .map((optionValue: any) => optionValue.value)
            .join('-'),
          uploadId: 0,
          optionValues: currentVariant.map((optionValue: any) => ({
            optionId: optionValue.optionId,
            valueId: optionValue.optionValueId.id,
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

  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setSlug(generatedSlug);
  }, [name]);

  useEffect(() => {
    if (isNaN(price)) setPrice(0);
    if (isNaN(discountPrice)) setDiscountPrice(0);
  }, [price, discountPrice]);

  const handleFormSubmit = async () => {
    try {
      const imageUploadResults = await Promise.all(
        images.map((image) => uploadsService.uploadFile(image))
      );

      const productData = {
        name,
        slug,
        price,
        discountPrice,
        description,
        isAvailable: true,
        stock: 0,
        categoryIds,
        collectionId: collectionId ?? 0,
        uploadId: imageUploadResults?.[0]?.id,
        isDeleted: false,
        options: selectedOptions.map((option) => ({
          optionId: option.id,
          values: option.optionValues.map(
            (value: any) => value.optionValueId.id
          ),
        })),
      };

      // Create product
      const productResponse = await productsService.create(productData);
      const productId = productResponse?.data?.id;

      // Upload product photos

      await Promise.all(
        imageUploadResults.slice(1).map((upload) =>
          photosService.create({
            productId,
            uploadId: upload.id,
          })
        )
      );

      const variantImageUploadResults = await Promise.all(
        variants.map((variant) => uploadsService.uploadFile(variant?.image))
      );

      // Prepare variants data
      const variantsData = variants.map((variant, index) => ({
        price: variant.price,
        baseCost: variant.baseCost,
        sku: variant.sku.toUpperCase(),
        isAvailable: variant.isAvailable,
        uploadId: variantImageUploadResults[index].uploadId,
        optionValues: variant.optionValues,
      }));

      // Create variants
      await Promise.all(
        variantsData.map((variant) =>
          variantsService.create(productId, variant)
        )
      );
      router.push('/store-product/products');
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setCategoryIds((prevIds) =>
      prevIds.includes(categoryId)
        ? prevIds.filter((id) => id !== categoryId)
        : [...prevIds, categoryId]
    );
  };

  const handleImageUpload = (images: File[] | null) => {
    if (images) {
      setImages((prevImages) => [...prevImages, ...Array.from(images)]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    confirm({
      title: `Are you sure?`,
      message: `You've made some changes. Are you sure you want to discard them?`,
      action: 'Discard Change',
      onConfirm: () => router.push('/store-product/products'),
    });
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="px-5 py-4 mb-8">
        <div className="flex flex-wrap justify-end space-x-2">
          <button
            className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="text-gray-100 bg-gray-900 btn-sm hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            onClick={handleFormSubmit}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col mx-auto max-w-7xl lg:flex-row lg:space-x-8 xl:space-x-16 ">
        <div className="w-2/3">
          <div className="p-5 space-y-8 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                Mockup Images
              </h2>
              <MockupUpload
                initImageLink={
                  product
                    ? [
                        product.upload.path,
                        ...product.photos.map(
                          (photo: any) => photo.upload.path
                        ),
                      ]
                    : []
                }
                onImageUpload={handleImageUpload}
                onDeleteImage={handleDeleteImage}
              />
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      className="w-full shadow-none form-input dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                      type="text"
                      value={slug}
                      disabled
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
                    <CKEditorComponent
                      value={description}
                      onChange={(value) => setDescription(value)}
                    />
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
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
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
                      value={discountPrice}
                      onChange={(e) =>
                        setDiscountPrice(parseFloat(e.target.value))
                      }
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

            {/* Product Options */}
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
                <div className="flex items-center justify-between w-full mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Variant - {variants?.length}
                  </h2>

                  <VariantsEditModal
                    variants={variants}
                    setVariants={setVariants}
                  />
                </div>
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
        <div className="w-1/3">
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
                            onChange={() => setCollectionId(collection.id)}
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
      <ConfirmModal />
    </div>
  );
}
