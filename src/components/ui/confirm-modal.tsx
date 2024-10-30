import { useConfirm } from '@/contexts/modal/ConfirmContext';
import React from 'react';
import ModalBlank from '../modal-blank';

const ConfirmModal: React.FC = () => {
  const { isOpen, close, confirmOptions } = useConfirm();
  if (!confirmOptions) return null;

  return (
    <ModalBlank isOpen={isOpen} setIsOpen={close}>
      <div className="flex w-full p-5 space-x-4">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0 dark:bg-gray-700">
          <svg
            className="text-red-500 fill-current shrink-0"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
          </svg>
        </div>
        {/* Content */}
        <div>
          {/* Modal header */}
          <div className="mb-2">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {confirmOptions.title}
            </div>
          </div>
          {/* Modal content */}
          <div className="mb-10 text-sm">
            <div className="space-y-2">
              <p>{confirmOptions.message}</p>
            </div>
          </div>
          {/* Modal footer */}
          <div className="flex flex-wrap justify-end w-full space-x-2">
            <button
              className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="text-white bg-red-500 btn-sm hover:bg-red-600"
              onClick={() => {
                confirmOptions.onConfirm();
                close();
              }}
            >
              {confirmOptions?.action ? confirmOptions.action : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </ModalBlank>
  );
};

export default ConfirmModal;
