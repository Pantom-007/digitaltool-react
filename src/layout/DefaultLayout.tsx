import React, { useState} from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';

interface DefaultLayoutProps {
  title: String;
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className=" m-auto bg-white shadow-2 rounded-lg w-[45%]">
            <div className=" max-w-full text-lg bg-slate-200 w-full p-6 rounded-tr-lg rounded-tl-lg text-black-2 font-medium"><span className=" pr-2">🤖</span>{title}</div>
            <div className="max-w-full flex p-6 gap-4 ">
              {children}
            </div>
            <div className='flex w-full gap-3 p-2 pb-4'>
            <div className='w-[20%]'></div>
            <button className=" text-base p-2 pl-4 pr-6 bg-blue-600 rounded-lg border border-blue-600 text-white font-normal flex gap-2 items-center hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
              Start Chat
            </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
