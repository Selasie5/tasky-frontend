import React from "react";
import { RiExpandUpDownLine } from "@remixicon/react";

interface FilterSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  return (
    <div className="relative w-full bg-white">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none cursor-pointer border border-gray-300 rounded-sm px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-purple-200 text-gray-500 text-md"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
        <RiExpandUpDownLine className="w-5 h-5" />
      </div>
    </div>
  );
};

export default FilterSelect;
