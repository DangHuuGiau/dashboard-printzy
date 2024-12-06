"use client";

import categoriesService from "@/api/categories";
import uploadsService from "@/api/uploads";
import CategoryImageUpload from "@/components/categories/category-upload-image";
import AddProductsModal from "@/components/categories/modal-add-product";
import ProductsInCategory from "@/components/categories/products-in-category";
import CKEditorComponent from "@/components/ckeditor-input";
import useCategory from "@/hooks/useCategory";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { toast } from "react-toastify";

const SingleCategory = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  const { category, loading } = useCategory(params?.slug);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name || "");
      setDescription(category.description || "");
      if (category.upload) {
        setCategoryImage(category.upload.path);
      }
      if (category.categoryProducts?.length > 0) {
        setSelectedProducts(
          category.categoryProducts.map(
            (categoryProduct: any) => categoryProduct?.product
          )
        );
      }
    }
  }, [category]);

  const handleImageUpload = (image: File | null) => {
    setCategoryImage(image);
  };

  const handleDeleteImage = () => {
    setCategoryImage(null);
  };

  const handleDeleteProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  const validateForm = () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required.");
      return false;
    }
    if (!categoryImage) {
      toast.error("Category image is required.");
      return false;
    }
    if (!description.trim()) {
      toast.error("Description is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    setSaving(true);
    if (categoryImage && category) {
      let newCategory: any = {
        name: categoryName,
        description,
        productIds:
          selectedProducts.length > 0
            ? selectedProducts.map((product) => product.id)
            : null,
      };
      if (categoryImage !== category.upload.path) {
        const uploadData = await uploadsService.uploadFile(categoryImage);
        newCategory.uploadId = uploadData?.id;
      }
      await categoriesService.update(category.id, newCategory);
      setSaving(false);
      router.push("/store-product/categories");
    }
  };

  const handleCancel = () => {
    router.push("/store-product/categories");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div className="px-5 py-4 mb-8">
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => handleCancel()}
                  className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-gray-100 bg-gray-900 btn-sm hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
            <div className="flex flex-col max-w-5xl mx-auto lg:flex-row lg:space-x-8 xl:space-x-16 ">
              <div className="w-2/3">
                <div className="p-5 space-y-8 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
                  <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Product in Category
                  </h2>

                  <div>
                    <div className="flex flex-col">
                      {selectedProducts?.length === 0 ? (
                        <div>
                          <h4 className="text-lg text-gray-800 dark:text-gray-100">
                            Start adding products to your category
                          </h4>
                          <p className="mb-6 text-sm text-gray-800 dark:text-gray-100">
                            Create a new category to display on your site.
                          </p>
                          <AddProductsModal
                            onAddProducts={setSelectedProducts}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <AddProductsModal
                            onAddProducts={setSelectedProducts}
                          />
                          <ProductsInCategory
                            products={selectedProducts}
                            onDeleteProduct={handleDeleteProduct}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-1/3">
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
                        <CategoryImageUpload
                          initImageLink={category?.upload?.path}
                          onImageUpload={handleImageUpload}
                          onDeleteImage={handleDeleteImage}
                        />
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
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          required
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
                            <CKEditorComponent
                              value={description}
                              onChange={(value) => setDescription(value)}
                            />
                          </div>
                          {/* End */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SingleCategory;
