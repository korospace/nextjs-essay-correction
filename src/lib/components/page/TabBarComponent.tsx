// react
import { useEffect, useState } from "react";
// component
import { TabBarItemType } from "@/lib/types/ComponentTypes";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  tabList: TabBarItemType[];
  onSelect: (tabKey: string) => void;
};

export default function TabBarComponent({ tabList, onSelect }: Props) {
  const selected = tabList.find((row) => row.selected === true);
  // -- Use State --
  const [selectedTabKey, setSelectedTabKey] = useState<string>();

  // -- Use Effect --
  useEffect(() => {
    const selected = tabList.find((row) => row.selected === true);
    setSelectedTabKey(selected?.key || "");
    onSelect(selected?.key || "");
  }, []);

  // -- Function --
  const handleSelect = (tabKey: string, disable: boolean) => {
    if (disable) return false;
    setSelectedTabKey(tabKey);
    onSelect(tabKey);
  };

  return (
    <div className="mb-4 border-b border-budiluhur-700/50">
      <ul className="flex text-sm">
        {tabList.map((row, index) => {
          return (
            <li key={index} className="me-2">
              <button
                type="button"
                onClick={() => handleSelect(row.key, row.disable)}
                className={`inline-block px-4 py-2.5 rounded-t-md transition-all border-b-3 ${
                  row.disable
                    ? "cursor-default"
                    : "hover:bg-budiluhur-400 hover:text-budiluhur-800 hover:border-budiluhur-800"
                } ${
                  row.key === selectedTabKey
                    ? "border-budiluhur-700 text-budiluhur-700 bg-budiluhur-300"
                    : " border-budiluhur-700/80 text-budiluhur-700/80"
                }`}
              >
                {row.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
