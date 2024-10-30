import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  initImageLink?: string[];
  onImageUpload: (images: File[] | null) => void;
  onDeleteImage: (index: number) => void;
}

const MockupUpload: React.FC<Props> = ({
  initImageLink,
  onImageUpload,
  onDeleteImage,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    if (initImageLink) {
      setSelectedImages(initImageLink);
    }
  }, [initImageLink]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length !== files.length) {
      alert('Please upload only image files.');
    }

    onImageUpload(imageFiles);

    const newImageUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImageUrls]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    onDeleteImage(index);
  };

  useEffect(() => {
    if (initImageLink) setSelectedImages(initImageLink);
  }, [initImageLink]);

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {selectedImages.map((image, index) => (
        <div
          key={index}
          className="relative flex items-center justify-center w-full overflow-hidden border-2 border-gray-300 rounded-lg h-52"
        >
          <button
            onClick={() => handleRemoveImage(index)}
            className="absolute z-10 flex items-center justify-center w-5 h-5 text-xs text-white bg-gray-800 rounded-full top-1 right-1 hover:bg-red-600"
            aria-label="Remove image"
          >
            &times;
          </button>
          <Image
            src={image}
            alt={`Uploaded preview ${index}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
      <div className="flex items-center justify-center w-28">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-28 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center px-4 pt-5 pb-6">
            <svg
              className="w-8 h-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default MockupUpload;
