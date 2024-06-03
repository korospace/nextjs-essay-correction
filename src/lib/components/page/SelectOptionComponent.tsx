// react
import { useState } from "react";
// types
import { InvalidFieldType, SelectOptionType } from "@/lib/types/ComponentTypes";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  invalid?: InvalidFieldType;
  dtOption: SelectOptionType[];
  onChange: (data: SelectOptionType | null) => void;
};

export default function SelectOptionComponent({
  invalid,
  dtOption,
  onChange,
}: Props) {
  // -- Use State --
  const [selectedKey, setSelectedKey] = useState<string>("");

  // -- Functions --
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
    const opt = dtOption.find((row) => row.key === e.target.value);
    onChange(opt ?? null);
  };

  return (
    <div>
      <select
        value={selectedKey}
        onChange={handleOnChange}
        className={`w-full max-w-lg h-11.5 border focus:border focus:border-budiluhur-700 placeholder-budiluhur-700/50 text-sm rounded-md outline-none ${
          invalid?.invalid
            ? "bg-red-300 border-red-600 text-red-700"
            : "bg-budiluhur-300 border-budiluhur-600 text-budiluhur-700"
        }`}
      >
        {dtOption.map((row, index) => (
          <option key={index} value={row.key}>
            {row.value}
          </option>
        ))}
      </select>
      {invalid?.invalid && (
        <p className="mt-2 text-sm text-red-600">{invalid.message}</p>
      )}
    </div>
  );
}
