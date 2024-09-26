import React, { useEffect, useState } from "react";

interface TextareaProps {
  initValue: string; 
  initPlaceholder: string;
}

const Textarea: React.FC<TextareaProps> = ({ initValue, initPlaceholder}) => {
  const [value, setValue] =  useState(initValue);

  useEffect(() => {
    if(initValue) {
      setValue(initValue);
    }
  }, [])
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={"bg-gray-50 bg-slate-200 h-24 text-black text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      }
      placeholder={initPlaceholder}
    />
  );
};
export default Textarea;