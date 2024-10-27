"use client";

import { useEffect, useState } from "react";
import ModalBasic from "@/components/modal-basic";
import useOptions from "@/hooks/useOptions";

interface Props {
  selectedOptions: any[];
  setSelectedOptions: (option: any[]) => void;
}

export default function AddOptionsModal(props: Props) {
  const { selectedOptions, setSelectedOptions } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const options = useOptions();
  const [selectedOptionId, setSelectedOptionId] = useState<any>();
  const [selectedChoices, setSelectedChoices] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const choices =
    options?.find((option: any) => option.id === selectedOptionId)
      ?.optionValues || [];

  useEffect(() => {
    setSelectedOptionId(options?.[0]?.id);
  }, [options]);

  const handleChoiceClick = (value: string) => {
    if (!selectedChoices.includes(value)) {
      setSelectedChoices([...selectedChoices, value]);
    }
  };

  const handleRemoveChoice = (value: string) => {
    setSelectedChoices(selectedChoices.filter((choice) => choice !== value));
  };

  const filteredChoices = choices.filter((choice: any) =>
    choice.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    const selectedOption = options.find(
      (option: any) => option.id === selectedOptionId
    );

    if (selectedOption) {
      const newOption = {
        id: selectedOption.id,
        name: selectedOption.name,
        optionValues: selectedChoices.map((choice) => ({
          value: choice, // This should match the structure you want
          optionId: selectedOption.id,
        })),
      };

      // Add the new option to the selectedOptions array
      setSelectedOptions([...selectedOptions, newOption]);
      setModalOpen(false); // Close the modal after saving
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center -m-1.5">
        {/* Basic Modal */}
        <div className="m-1.5">
          {/* Start */}
          <button
            className="text-gray-100 bg-gray-900 btn hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <svg
              className="text-gray-400 fill-current shrink-0"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="ml-2">Add Options</span>
          </button>
          <ModalBasic
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            title="Add product option"
          >
            {/* Modal content */}
            <div className="flex flex-col gap-4 px-5 pt-4 pb-1">
              {/* Select Option */}
              <div className="text-sm">
                <div>
                  <label
                    className="block mb-1 text-sm font-medium"
                    htmlFor="option"
                  >
                    Select an option name
                  </label>
                  <select
                    id="option"
                    className="w-full form-select"
                    value={selectedOptionId}
                    onChange={(e) => {
                      setSelectedOptionId(Number(e.target.value));
                      setSelectedChoices([]);
                    }}
                  >
                    {options?.map((option: any) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Multi-select Choices */}
              <div className="flex flex-col w-full">
                <label
                  className="block mb-1 text-sm font-medium"
                  htmlFor="option"
                >
                  Type in choices for this option
                </label>
                <div className="w-full">
                  <div className="flex my-2">
                    <div className="flex flex-wrap flex-auto w-full">
                      {selectedChoices.map((choice, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center px-2 py-1 m-1 font-medium text-teal-700 bg-teal-100 border border-teal-300 rounded-full"
                        >
                          <div className="flex-initial max-w-full text-xs font-normal leading-none">
                            {choice}
                          </div>
                          <div className="flex flex-row-reverse flex-auto">
                            <div
                              onClick={() => handleRemoveChoice(choice)}
                              className="w-4 h-4 ml-2 rounded-full cursor-pointer hover:text-teal-400"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                      <input
                        placeholder="Type to search..."
                        className="w-full form-input"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full overflow-y-auto bg-white rounded shadow h-28">
                    {filteredChoices?.map((choice: any) => (
                      <div
                        key={choice.id}
                        className="w-full border-b border-gray-100 cursor-pointer hover:bg-teal-100"
                        onClick={() => handleChoiceClick(choice.value)}
                      >
                        <div className="flex items-center w-full p-2 pl-2">
                          <div className="flex items-center w-full">
                            <div className="mx-2 leading-6">{choice.value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-5 py-4">
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="text-gray-100 bg-gray-900 btn-sm hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                  onClick={handleSave}
                >
                  Add
                </button>
              </div>
            </div>
          </ModalBasic>
          {/* End */}
        </div>
      </div>
    </div>
  );
}
