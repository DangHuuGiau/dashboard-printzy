import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConfirmOptions {
  title: string;
  message: string;
  action?: string;
  onConfirm: () => void;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => void;
  close: () => void;
  isOpen: boolean;
  confirmOptions: ConfirmOptions | null;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};

export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const confirm = (options: ConfirmOptions) => {
    setConfirmOptions(options);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setConfirmOptions(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm, close, isOpen, confirmOptions }}>
      {children}
    </ConfirmContext.Provider>
  );
};
