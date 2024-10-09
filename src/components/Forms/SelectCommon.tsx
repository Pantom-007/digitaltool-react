import React from 'react';

// Define the interface for options
interface SelectOption {
  label: string;
}

interface SelectCommonProps {
  options: SelectOption[]; // Use plural 'options' to match the prop in InstallTool
}

const SelectCommon: React.FC<SelectCommonProps> = ({ options }) => {
  return (
    <select className="bg-slate-200 text-black rounded p-2 w-full">
      {options.map((opt, index) => (
        <option key={index} value={opt.label} className="p-3">
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectCommon;