import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Ensure you import the Image component if you're using Next.js

interface CategoryImageUploadProps {
  initImageLink?: string;
  onImageUpload: (image: File | null) => void;
  onDeleteImage: () => void;
}

const CategoryImageUpload: React.FC<CategoryImageUploadProps> = ({
  initImageLink,
  onImageUpload,
  onDeleteImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      onImageUpload(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    onDeleteImage();
  };

  useEffect(() => {
    setSelectedImage(initImageLink || null);
  }, [initImageLink]);

  return (
    <div>
      {selectedImage ? (
        <div className="relative flex items-center justify-center w-full overflow-hidden border-2 border-gray-300 rounded-lg h-52">
          <button
            onClick={handleDeleteImage}
            className="absolute z-10 flex items-center justify-center w-5 h-5 text-xs text-white bg-gray-800 rounded-full top-1 right-1 hover:bg-red-600"
            aria-label="Remove image"
          >
            &times;
          </button>
          <Image
            src={selectedImage}
            alt={`Uploaded preview`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-52">
          <label
            htmlFor={`dropzone-file`}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center px-4 pt-5 pb-6">
              <svg
                className="w-8 h-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
            </div>

            <input
              id={`dropzone-file`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default CategoryImageUpload;
