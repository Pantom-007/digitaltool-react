import React, { useState} from 'react';
import Header from '../components/Header/index';

interface DefaultLayoutProps {
  title: String;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <iframe
            src="https://udify.app/chat/djzi7Ufg6X4zKwXp"
            className = " h-full"
            allow="microphone">
        </iframe>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
