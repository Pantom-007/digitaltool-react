import React, { useEffect, useState} from 'react';
import Header from "../../components/Header/index";

interface ChatToolProps {
  title: String;
}

const ChatTool: React.FC<ChatToolProps> = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-col items-center justify-center h-full">
            <iframe
              src="https://udify.app/chat/djzi7Ufg6X4zKwXp"
              className={`h-full w-full `} 
              allow="microphone"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTool;
