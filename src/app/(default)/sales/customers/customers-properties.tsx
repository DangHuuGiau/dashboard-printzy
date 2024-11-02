'use client';

import { useState } from 'react';

export const CustomersProperties = () => {
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false);

  const statusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-700';
      case 'lock':
        return 'bg-yellow-500/20 text-yellow-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400';
    }
  };

  return {
    descriptionOpen,
    setDescriptionOpen,
    statusColor,
  };
};