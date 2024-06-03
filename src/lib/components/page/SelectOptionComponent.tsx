// react
import { useState } from "react";
// types
import { SelectOptionType } from "@/lib/types/ComponentTypes";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  dtOption: SelectOptionType[];
  onChange: (data: SelectOptionType | null) => void;
};

export default function SelectOptionComponent({ dtOption, onChange }: Props) {
  // -- Use State --
  const [selectedKey, setSelectedKey] = useState<string>("");

  // -- Functions --
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
    const opt = dtOption.find((row) => row.key === e.target.value);
    onChange(opt ?? null);
  };

  return (
    <select
      value={selectedKey}
      onChange={handleOnChange}
      className="w-full block p-3 bg-budiluhur-300 border border-budiluhur-600 focus:border focus:border-budiluhur-700 placeholder-budiluhur-700/50 text-sm rounded-md outline-none"
    >
      {dtOption.map((row, index) => (
        <option key={index} value={row.key}>
          {row.value}
        </option>
      ))}
    </select>
  );
}
