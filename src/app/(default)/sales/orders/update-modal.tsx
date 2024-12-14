'use client';

import ModalBasic from '@/components/modal-basic';

function calculateTotal(purchases: any[]): number {
  return purchases?.reduce((total, purchase) => {
    const price = parseFloat(purchase?.variant?.price);
    return total + purchase.quantity * price;
  }, 0);
}
export default function UpdateOrdersModal({
  order,
  open,
  onOpen,
}: {
  order: any;
  open: boolean;
  onOpen: (open: boolean) => void;
}) {
  return (
    <div>
      <ModalBasic isOpen={open} setIsOpen={onOpen} title="Update Invoices">
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="name">
                Order Number <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                className="w-full px-2 py-1 form-input"
                type="text"
                required
                disabled
                value={`#${order?.orderNumber}`}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="name">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                className="w-full px-2 py-1 form-input"
                type="text"
                required
                disabled
                value={calculateTotal(order?.purchases) || order?.total}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="name">
                Customer <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                className="w-full px-2 py-1 form-input"
                type="text"
                required
                disabled
                value={`${order?.client?.user?.firstName} ${order?.client?.user?.lastName}`}
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="status"
              >
                Status
              </label>
              <select id="status" className="w-full px-2 py-1 form-select">
                <option value="processing">Processing</option>
                <option value="delivery">Delivery</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
              onClick={() => {
                onOpen(false);
              }}
            >
              Cancel
            </button>
            <button className="text-gray-100 bg-gray-900 btn-sm hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
              Update
            </button>
          </div>
        </div>
      </ModalBasic>
    </div>
  );
}
