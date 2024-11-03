'use client';

import AddOptionsModal from '@/components/products/new-product/modal-add-options';
const CKEditorComponent = dynamic(() => import('@/components/ckeditor-input'), {
  ssr: false,
});
import MockupUpload from '@/components/products/new-product/mockup-upload';
import OptionsTable from '@/components/products/new-product/options-table';
import VariantsTable from '@/components/products/new-product/variants-table';
import { useEffect, useState } from 'react';
import useCategories from '@/hooks/useCategories';
import useCollections from '@/hooks/useCollections';
import VariantsEditModal from '@/components/products/new-product/variant-edit-modal';
import variantsService from '@/api/variants';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/contexts/modal/ConfirmContext';
import ConfirmModal from '@/components/ui/confirm-modal';
import useProduct from '@/hooks/useProduct';
import dynamic from 'next/dynamic';
import uploadsService from '@/api/uploads';
import photosService from '@/api/photos';
import productsService from '@/api/products';
import { toast } from 'react-toastify';

export default function SingleProduct({ params }: { params: { sku: string } }) {
  const router = useRouter();
  const { confirm } = useConfirm();

  const product = useProduct(params?.sku);

  const categories = useCategories();
  const collections = useCollections();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [collectionId, setCollectionId] = useState<number | null>(null);

  const [images, setImages] = useState<File[] | any[]>([]);

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);

  const initVariants = async (productId: string) => {
    const { data } = await variantsService.getList(productId);
    const variants = data.map((variant: any) =>
      variant?.upload
        ? { ...variant, image: variant?.upload }
        : { ...variant, image: null }
    );
    setVariants(variants);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(Number(product.price));
      setDiscountPercent(Number(product.discountPercent));
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
      setImages(
        product
          ? [
              product.upload,
              ...product.photos.map((photo: any) => photo.upload),
            ]
          : []
      );
      initVariants(product.id);
    }
  }, [product]);

  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setSlug(generatedSlug);
  }, [name]);

  useEffect(() => {
    setPrice((prevPrice) => (isNaN(prevPrice) ? 0 : prevPrice));
    setDiscountPercent((prevDiscount) =>
      isNaN(prevDiscount) ? 0 : prevDiscount
    );
  }, [price, discountPercent]);

  const handleFormSubmit = async () => {
    try {
      const imageUploadResults = await Promise.all(
        images.map((image) =>
          image instanceof File ? uploadsService.uploadFile(image) : image
        )
      );

      const productData = {
        name,
        slug,
        price,
        discountPercent,
        description,
        isAvailable: true,
        categoryIds,
        collectionId: collectionId ?? 0,
        uploadId: imageUploadResults?.[0]?.id,
        isDeleted: false,
      };

      // Create product
      const productResponse = await productsService.update(
        product.id,
        productData
      );

      // Upload product photos

      const photosUpload = imageUploadResults.slice(1).map((upload) => ({
        productId: product.id,
        uploadId: upload.id,
      }));

      await photosService.createMany(photosUpload);

      const variantImageUploadResults = await Promise.all(
        variants.map((variant) => {
          if (!variant.image) {
            return { id: null };
          }
          return variant.image instanceof File
            ? uploadsService.uploadFile(variant.image)
            : variant.image;
        })
      );

      const variantsData = variants.map((variant, index) => ({
        id: variant.id,
        price: Number(variant.price),
        baseCost: Number(variant.baseCost),
        sku: variant.sku.toUpperCase(),
        isAvailable: variant.isAvailable,
        isInStock: variant.isInStock,
        uploadId: variantImageUploadResults[index].uploadId,
      }));

      await Promise.all(
        variantsData.map((variant) =>
          variantsService.update(product.id, variant.id, variant)
        )
      );
      toast.success(`Update product (SKU-${product.sku}) successfully`);
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
                images={images}
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
                        type="number"
                        step="0.01"
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
                    Discount Percent
                  </label>
                  <div className="relative">
                    <input
                      id="prefix"
                      className="w-full pl-12 form-input"
                      type="number" // Change type to number for better validation
                      value={discountPercent}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        // Ensure the value is between 0 and 100
                        if (value >= 0 && value <= 100) {
                          setDiscountPercent(value);
                        } else if (e.target.value === '') {
                          // Allow clearing the input
                          setDiscountPercent(0);
                        }
                      }}
                      min={0} // Minimum value
                      max={100} // Maximum value
                    />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <span className="px-3 text-sm font-medium text-gray-400 dark:text-gray-500">
                        %
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
                    isEdit={true}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                  />
                  <div className="pointer-events-none">
                    <OptionsTable
                      options={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                    />
                  </div>
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
