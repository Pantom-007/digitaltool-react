import React, { useEffect, useState } from 'react';

interface InputProps {
  initValue?: string;
  initPlaceHolder: string;
}

const Input: React.FC<InputProps> = ({ initValue, initPlaceHolder }) => {
  const [placeholder] = useState(initPlaceHolder);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (initValue) {
      setValue(initValue);
    }
  }, [initValue]);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={
        'bg-gray-50 bg-slate-200 text-black text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      }
      placeholder={placeholder}
    />
  );
};

export default Input;
