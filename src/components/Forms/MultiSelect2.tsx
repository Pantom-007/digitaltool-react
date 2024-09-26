import React, { useState, useEffect, useRef } from 'react';
import { IoMdAdd } from 'react-icons/io';

const MultiSelect2: React.FC = ({updateInputValue, users, value}) => {
  const [options, setOptions] = useState<{_id:string; username:string}[]>(users);
  const [selected, setSelected] = useState<string[]>(value);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<any>(null);
  const trigger = useRef<any>(null);

   const open = () => {
     setShow(true);
   };
   useEffect(()=>{
    setOptions(users);
  },[users])
  useEffect(()=>{
    setSelected(value);
  },[value])
  
   const isOpen = () => {
     return show === true;
   };

   const select = (_id: any, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const newSelected = [...selected];

    if (newSelected.includes(_id)) {
      // Deselect if already selected
      setSelected(newSelected.filter((item) => item?._id !== _id));
      updateInputValue(newSelected.filter((item) => item?._id !== _id),'creaters');
    } else {
      // Select if not already selected
      setSelected([...newSelected, _id]);
      updateInputValue([...newSelected, _id],'creaters');
    }
  };

  const remove = (id: string) => {
    setSelected(selected.filter((item) => item._id !== id));
    updateInputValue(selected.filter((item) => item._id !== id),'creaters');
  };
  
  const selectedValues = () => {
    return selected?.map((item) => (item?.username));
  };

    useEffect(() => {
      const clickHandler = ({ target }: MouseEvent) => {
        if (!dropdownRef.current) return;
        if (
          !show ||
          dropdownRef.current.contains(target) ||
          trigger.current.contains(target)
        )
          return;
        setShow(false);
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
    });

  return (
    <div className="relative z-40">
      <div>
        <div className="flex flex-col items-center">
          <input type="hidden" defaultValue={selectedValues()} 
            
          name="creaters"
          id="creaters"/>
          <div className="relative z-20 inline-block w-full">
            <div className="relative flex flex-col items-center">
              <div ref={trigger} onClick={open} className="w-full">
                <div className="flex outline-none ">
                  <div className="flex flex-auto flex-wrap gap-3 overflow-y-auto h-12">
                    {selected?.map((item,index) => (
                      <div
                        key={index}
                        className="my-1.5 flex items-center  rounded-[30px] border-[.5px] border-stroke bg-[#70ad47] px-2.5 py-1 text-[0.8rem] text-white  font-medium dark:border-strokedark"
                      >
                        <div className="max-w-full flex-initial">
                          {options?.filter(items=>items._id==item._id)[0]?.username}
                        </div>
                        <div className="flex flex-auto flex-row-reverse">
                          <div
                            onClick={() => remove(item._id)}
                            className="cursor-pointer pl-2 hover:text-danger"
                          >
                            <svg
                              className="fill-current"
                              role="button"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                    {selected?.length === 0 && (
                      <div className="flex-1">
                        <input
                          placeholder="担当者を選択してください。"
                          className="h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
                          defaultValue={selectedValues()}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex w-8 items-center py-1 pl-1 pr-1">
                  <button
                      type="button"
                      onClick={open}
                      className="h-6 w-6 cursor-pointer outline-none focus:outline-none"
                    >
                      <IoMdAdd className='h-6 w-6'/>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <div
                  className={`max-h-select absolute top-full left-0 z-40 w-full overflow-y-auto rounded bg-white shadow dark:bg-form-input ${
                    isOpen() ? '' : 'hidden'
                  }`}
                  ref={dropdownRef}
                  onFocus={() => setShow(true)}
                  onBlur={() => setShow(false)}
                >
                  <div className="flex w-full flex-col">
                    {options?.map((option, index) => (
                      <div key={index}>
                        <div
                          className="w-full cursor-pointer rounded-t border-b border-stroke hover:bg-primary/5 dark:border-form-strokedark"
                          onClick={(event) => select(option, event)}
                        >
                          <div
                            className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2`}
                          >
                            <div className="flex w-full items-center">
                              <div className="mx-2 leading-6">
                                {option.username}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect2;
