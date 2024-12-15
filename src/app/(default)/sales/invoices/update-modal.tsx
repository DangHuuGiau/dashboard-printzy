'use client';

import invoicesService from '@/api/invoices';
import ModalBasic from '@/components/modal-basic';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function UpdateInvoicesModal({
  invoice,
  open,
  onOpen,
  onModified,
}: {
  invoice: any;
  open: boolean;
  onOpen: (open: boolean) => void;
  onModified: () => void;
}) {
  console.log(invoice);
  const [status, setStatus] = useState(invoice?.status || '');
  const [transactionId, setTransactionId] = useState(
    invoice?.transactionId || ''
  );
  const [loading, setLoading] = useState(false);

  const onUpdate = async () => {
    try {
      setLoading(true);
      await invoicesService.update(invoice?.id, { status, transactionId });
      onModified();
      toast.success('Invoice updated successfully!');
      onOpen(false);
    } catch (error) {
      toast.error('Failed to update invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStatus(invoice?.status || 'Pending');
    setTransactionId(invoice?.transactionId || 'null');
  }, [invoice]);

  return (
    <div>
      <ModalBasic isOpen={open} setIsOpen={onOpen} title="Update Invoices">
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="transactionId"
              >
                Invoice Transaction ID <span className="text-red-500">*</span>
              </label>
              <input
                id="transactionId"
                className="w-full px-2 py-1 form-input"
                type="text"
                required
                disabled={invoice?.transactionId ? true : false}
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="amount"
              >
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                id="amount"
                className="w-full px-2 py-1 form-input"
                type="text"
                required
                disabled
                value={invoice?.order.total}
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="customer"
              >
                Customer <span className="text-red-500">*</span>
              </label>
              <input
                id="customer"
                className="w-full px-2 py-1 form-input"
                type="text"
                required
                disabled
                value={`${invoice?.client?.user?.firstName} ${invoice?.client?.user?.lastName}`}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="type">
                Type <span className="text-red-500">*</span>
              </label>
              <input
                id="type"
                className="w-full px-2 py-1 form-input"
                type="text"
                required
                disabled
                value={invoice?.order.payment.paymentMethod}
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                className="w-full px-2 py-1 form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Refunded">Refunded</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
              onClick={() => onOpen(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="text-gray-100 bg-gray-900 btn-sm hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              onClick={onUpdate}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </ModalBasic>
    </div>
  );
}
