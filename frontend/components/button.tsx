import { NextPage } from 'next';

interface ButtonProps {
  label: string;
  buttonClick: () => void;
  disabled?: boolean;
}

const Button: NextPage<ButtonProps> = ({
  label,
  buttonClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={
        'w-full my-2 py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ' +
        (disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-indigo-600 hover:bg-indigo-700')
      }
      onClick={buttonClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
