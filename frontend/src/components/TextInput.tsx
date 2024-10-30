/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: any;
  name: string;
  error?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type,
  placeholder,
  register,
  error,
  name,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        {...register(id)}
        id={id}
        type={type}
        required={required}
        name={name}
        className="mt-1 border-blue-200 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 outline-none pl-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
