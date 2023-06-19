import { ChangeEvent } from "react";

type FilterControlProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};
type Option = {
  label: string;
  value: string;
};

const FilterControl = ({
  options,
  onChange,
  value,
  label,
}: FilterControlProps) => {
  console.log({ value, label, options }, "value");
  return (
    <div className="flex justify-between items-center cursor-pointer">
      {label && <label className="uppercase text-gray-500">{label}:</label>}
      <select
        onChange={onChange}
        value={value}
        className="border-2 outline-none py-1"
      >
        {options.map((item) => (
          <option value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterControl;
