import { CustomersProperties } from "./customers-properties";
import dayjs from "dayjs";

interface CustomersTableItemProps {
  customer: any;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
}

export default function OrdersTableItem({
  customer,
  onCheckboxChange,
  isSelected,
}: CustomersTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(customer.id, e.target.checked);
  };

  const { descriptionOpen, setDescriptionOpen, statusColor } =
    CustomersProperties();

  return (
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
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {customer.user.firstName} {customer.user.lastName}
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {customer.user.email}
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div>{dayjs(customer.createdAt).format("DD-MM-YYYY HH:mm")}</div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="font-medium text-left text-green-600">
            {customer?.totalPaymentSum}$
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="text-center">{customer?.totalCartItems}</div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="text-left">
            {
              customer?.addresses?.find(
                (address: any) => address?.isDefault === true
              )?.addressDetail
            }
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div
            className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
              "active"
            )}`}
          >
            Active
          </div>
        </td>
        <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="space-x-1">
            <button className="text-gray-400 rounded-full hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
              <span className="sr-only">Edit</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
              </svg>
            </button>
            <button className="text-red-500 rounded-full hover:text-red-600">
              <span className="sr-only">Delete</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
              </svg>
            </button>
          </div>
        </td>
        <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="flex items-center">
            <button
              className={`text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 ${
                descriptionOpen && "rotate-180"
              }`}
              aria-expanded={descriptionOpen}
              onClick={() => setDescriptionOpen(!descriptionOpen)}
              aria-controls={`description-${customer.id}`}
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
        id={`description-${customer.id}`}
        role="region"
        className={`${!descriptionOpen && "hidden"}`}
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
            <div className="flex flex-col italic">
              <span>Gender: {customer.user.gender}</span>
              <span>Sub Addresses:</span>
              {customer.addresses.map((address: any) => (
                <span>
                  - {address.addressDetail} {address.phone}
                </span>
              ))}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
