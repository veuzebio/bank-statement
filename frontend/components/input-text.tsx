import { NextPage } from 'next';

interface InputTextProps {
  label: string;
  value: any;
  valueChange: (v: any) => void;
  disabled?: boolean;
}

const InputText: NextPage<InputTextProps> = ({
  label,
  value,
  valueChange,
  disabled = false,
}) => {
  return (
    <div className="rounded-md shadow-sm my-4 -space-y-px">
      <div>
        <label className="block text-lg font-medium text-indigo-600 mb-2">
          {label}
        </label>
        <input
          type="text"
          className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          value={value}
          disabled={disabled}
          onChange={(e) => valueChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputText;
