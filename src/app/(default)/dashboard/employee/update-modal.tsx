'use client';

import { useEffect, useState } from 'react';
import ModalBasic from '@/components/modal-basic';
import employeesService from '@/api/employees';

export default function UpdateEmployeeModal({
  open,
  onOpen,
  employee,
  onEmployeeUpdated,
}: {
  open: boolean;
  onOpen: (open: boolean) => void;
  employee: any;
  onEmployeeUpdated: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    email: employee?.email || '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setFormData({
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      email: employee?.email || '',
      newPassword: '',
      confirmPassword: '',
    });
  }, [employee]);

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError('');
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await employeesService.update(formData, employee.id);
      onEmployeeUpdated();
      onOpen(false);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div>
      <ModalBasic isOpen={open} setIsOpen={onOpen} title="Update Employee">
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="firstName"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                className="w-full px-2 py-1 form-input"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="lastName"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                className="w-full px-2 py-1 form-input"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                className="w-full px-2 py-1 form-input"
                type="email"
                required
                value={formData.email}
                // onChange={handleChange}
                disabled
              />
            </div>

            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                className="w-full px-2 py-1 form-input"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-2 py-1 form-input"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
              onClick={() => onOpen(false)}
            >
              Cancel
            </button>
            <button
              className="text-gray-100 bg-gray-900 btn-sm hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </ModalBasic>
    </div>
  );
}
