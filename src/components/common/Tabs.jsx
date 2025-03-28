import { useState } from "react";

const Tabs = ({ tabs, defaultTab = 0, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={className}>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === index
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
