import React from 'react';
import OptionActionMenu from './option-action';

interface Props {
  options: any[];
  setSelectedOptions: (option: any[]) => void;
}

const OptionsTable = (props: Props) => {
  const { options, setSelectedOptions } = props;

  const handleEdit = () => {};

  const handleDelete = (optionToDelete: any) => {
    const updatedOptions = options.filter(
      (option) => option !== optionToDelete
    );
    setSelectedOptions(updatedOptions);
  };
  return (
    <div className="mt-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600">
      <table className="w-full table-auto dark:text-gray-300">
        <thead className="text-xs font-semibold text-gray-500 uppercase border-t border-b border-gray-100 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-700/60"></thead>
        <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
          {options.map((option) => (
            <tr>
              <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <div className="text-left">{option.name}</div>
              </td>
              <td className="gap-2 px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <div className="flex items-center">
                  {option.optionValues
                    .map((optionValue: any) => optionValue.value)
                    .join(', ')}
                </div>
              </td>
              <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                <OptionActionMenu
                  align="right"
                  onDelete={() => handleDelete(option)}
                  onEdit={handleEdit}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptionsTable;
