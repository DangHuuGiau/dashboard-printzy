import Image from 'next/image';
import { OrdersProperties } from './orders-properties';
import dayjs from 'dayjs';
import Image01 from '/public/images/icon-01.svg';
import Image02 from '/public/images/icon-02.svg';
import { useState } from 'react';
import Link from 'next/link';

interface OrdersTableItemProps {
  order: any;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
  setUpdatingOrder: (order: any) => void;
  setOpenUpdateModal: (open: boolean) => void;
}

function calculateTotal(purchases: any[]): number {
  return purchases?.reduce((total, purchase) => {
    const price = parseFloat(purchase?.variant?.price);
    return total + purchase.quantity * price;
  }, 0);
}

export default function OrdersTableItem({
  order,
  onCheckboxChange,
  isSelected,
  setUpdatingOrder,
  setOpenUpdateModal,
}: OrdersTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(order.id, e.target.checked);
  };

  const { descriptionOpen, setDescriptionOpen, statusColor } =
    OrdersProperties();

  return (
    <>
      <tbody className="text-sm">
        {/* Row */}
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
            <div className="flex items-center text-gray-800">
              <div className="flex items-center justify-center w-10 h-10 mr-2 bg-gray-100 rounded-full shrink-0 dark:bg-gray-700 sm:mr-3">
                <Image
                  className="ml-1"
                  src={
                    order.status === 'processing' || 'cancelled' || 'refunded'
                      ? Image01
                      : Image02
                  }
                  width={20}
                  height={20}
                  alt={order.id}
                />
              </div>
              <div className="font-medium text-sky-600">
                #{order?.orderNumber}
              </div>
            </div>
          </td>
          <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
            <div>{dayjs(order.createdAt).format('DD-MM-YYYY HH:mm')}</div>
          </td>
          <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className="font-medium text-gray-800 dark:text-gray-100">
              {order?.client?.user?.firstName} {order?.client?.user?.lastName}
            </div>
          </td>
          <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className="font-medium text-left text-green-600">
              {calculateTotal(order.purchases) || order?.total}
            </div>
          </td>
          <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
            <div
              className={`inline-flex font-medium rounded-full text-center uppercase px-2.5 py-0.5 text-xs ${statusColor(
                order.status
              )}`}
            >
              {order.status === 'processing' ? 'Pre-order' : order.status}
            </div>
          </td>
          <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className="text-center">{order?.orderItems?.length || 0}</div>
          </td>
          <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className="text-left">{order?.address?.addressDetail}</div>
          </td>
          <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className="flex items-center">
              <div className="uppercase">
                {order?.payment?.paymentMethod || 'Not yet paid'}
              </div>
            </div>
          </td>

          <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className="flex justify-center">
              <button
                className="text-gray-400 rounded-full hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                onClick={() => {
                  setUpdatingOrder(order);
                  setOpenUpdateModal(true);
                }}
              >
                <span className="sr-only">Edit</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                </svg>
              </button>
            </div>
          </td>

          <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
            <div className="flex items-center">
              <button
                className={`text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 ${
                  descriptionOpen && 'rotate-180'
                }`}
                aria-expanded={descriptionOpen}
                onClick={() => setDescriptionOpen(!descriptionOpen)}
                aria-controls={`description-${order.id}`}
              >
                <span className="sr-only">Menu</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
        <tr
          id={`description-${order.id}`}
          role="region"
          className={`${!descriptionOpen && 'hidden'}`}
        >
          <td colSpan={10} className="px-2 py-3 first:pl-5 last:pr-5">
            <div className="flex items-center bg-gray-50 dark:bg-gray-950/[0.15] dark:text-gray-400 p-3 -mt-3">
              <svg
                className="mr-2 text-gray-400 fill-current shrink-0 dark:text-gray-500"
                width="16"
                height="16"
              >
                <path d="M1 16h3c.3 0 .5-.1.7-.3l11-11c.4-.4.4-1 0-1.4l-3-3c-.4-.4-1-.4-1.4 0l-11 11c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1zm1-3.6l10-10L13.6 4l-10 10H2v-1.6z" />
              </svg>
              {order?.orderItems?.map((orderItem: any, index: number) => (
                <div className="flex flex-col ml-5">
                  <span className="font-semibold">Line Item: {index + 1}</span>
                  <span>- Product Name: {orderItem.variant.product.name}</span>
                  <span>- Product SKU: {orderItem.variant.product.sku}</span>
                  <span>- Variant SKU: {orderItem.variant.sku}</span>
                  <span>- Quantity: {orderItem.quantity}</span>
                  <span>-Price: {orderItem.unitPrice}</span>
                  <span>
                    - Customize Mockup:{' '}
                    {orderItem?.customizeUpload?.path ? (
                      <Link
                        href={orderItem.customizeUpload.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {orderItem.customizeUpload.path}
                      </Link>
                    ) : (
                      'None'
                    )}
                  </span>
                  <span>
                    - Customize Print:{' '}
                    {orderItem?.customizePrint?.path ? (
                      <Link
                        href={orderItem.customizePrint.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {orderItem.customizePrint.path}
                      </Link>
                    ) : (
                      'None'
                    )}
                  </span>

                  <hr className="mt-1 h-0.5 border-t-0 bg-neutral-300 dark:bg-white/10 w-full" />
                </div>
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}
