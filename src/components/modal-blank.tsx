import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

interface ModalBlankProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ModalBlank({
  children,
  isOpen,
  setIsOpen,
}: ModalBlankProps) {
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <TransitionChild
          as="div"
          className="fixed inset-0 z-50 transition-opacity bg-gray-900 bg-opacity-30"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />
        <TransitionChild
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 my-4 overflow-hidden sm:px-6"
          enter="transition ease-in-out duration-200"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <DialogPanel className="max-w-lg max-h-full overflow-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 w-fit">
            {children}
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
