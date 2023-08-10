import { FC } from "react";

interface FormFieldProps {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: any) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

export const FormField: FC<FormFieldProps> = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-black text-xm py-1 px-2 rounded-[5px]"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  );
};
