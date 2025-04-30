// components/InputField.tsx
import { useField } from 'formik';
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={props.id || props.name} className="mb-1 text-sm font-medium text-black">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`border p-2 rounded-md font-normal text-sm focus:outline-none focus:ring ${
          meta.touched && meta.error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-600 mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};
