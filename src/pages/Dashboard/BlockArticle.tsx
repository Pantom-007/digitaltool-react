import React, { useState} from 'react';
import Header from "../../components/Header/index";

interface BlockArticleToolProps {
  title: String;
}

const BlockArticleTool: React.FC<BlockArticleToolProps> = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <iframe
            src="https://udify.app/chat/DoLj5ck0hcHURSVw"
            className = " h-full"
            allow="microphone">
        </iframe>
        </div>
      </div>
    </div>
  );
};

export default BlockArticleTool;
