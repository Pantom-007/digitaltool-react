import React, { useState } from 'react';

const SelectStatus: React.FC = ({updateInputValue, value}) => {
  const selectedOption = value;
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
      <div className="relative w-[200px] z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption}

          onChange={(e) => {
            updateInputValue(e.target.value, e.target.id);
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          
          name="status"
          id="status"
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >

          <option value="" className="text-body dark:text-bodydark" hidden>
            </option>
          <option value="未対応" className="text-body dark:text-bodydark">
          未対応
          </option>
          <option value="対応中" className="text-body dark:text-bodydark">
          対応中
          </option>
          <option value="完了" className="text-body dark:text-bodydark">
          完了
          </option>
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
  );
};

export default SelectStatus;
