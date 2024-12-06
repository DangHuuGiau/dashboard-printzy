import { InvoicesProperties } from "./invoices-properties";
import dayjs from "dayjs";
import UpdateInvoicesModal from "./update-modal";
import { useState } from "react";

interface InvoicesTableItemProps {
  invoice: any;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
}

export default function InvoicesTableItem({
  invoice,
  onCheckboxChange,
  isSelected,
}: InvoicesTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(invoice.id, e.target.checked);
  };

  const { totalColor, statusColor } = InvoicesProperties();
  const [openUpdateModal, setUpdateModal] = useState(false);

  return (
    <>
      <tr>
        <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                className="form-checkbox"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isSelected}
              />
            </label>
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="font-medium text-sky-600">#{invoice.id}</div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className={`font-medium ${totalColor(invoice.status)}`}>
            {invoice.order.total}
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div
            className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
              "Paid"
            )}`}
          >
            {"Paid"}
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {invoice?.client?.user?.firstName} {invoice?.client?.user?.lastName}
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div>{dayjs(invoice.createdAt).format("DD-MM-YYYY HH:mm")}</div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="flex items-center">
            <div>{invoice.transactionId}</div>
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="flex items-center">
            <div>{invoice.order.payment.paymentMethod}</div>
          </div>
        </td>
        <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="space-x-1">
            <button
              className="text-gray-400 rounded-full hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => {
                setUpdateModal(!openUpdateModal), console.log(123);
              }}
            >
              <span className="sr-only">Edit</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
              </svg>
            </button>
            <button className="text-gray-400 rounded-full hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
              <span className="sr-only">Download</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M16 20c.3 0 .5-.1.7-.3l5.7-5.7-1.4-1.4-4 4V8h-2v8.6l-4-4L9.6 14l5.7 5.7c.2.2.4.3.7.3zM9 22h14v2H9z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      <UpdateInvoicesModal
        invoice={invoice}
        open={openUpdateModal}
        onOpen={() => setUpdateModal(!openUpdateModal)}
      />
    </>
  );
}
