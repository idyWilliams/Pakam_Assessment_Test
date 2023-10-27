import React, { useState } from "react";
import { FieldError, UseFormRegister, FieldValues } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type PasswordField = {
  name: "password";
  value: string;
};

type TextField = {
  name: string;
  value: string;
};

type Field = PasswordField | TextField;

interface IPasswordInputProps {
  label: string;
  field: UseFormRegister<Field>;
  error?: FieldError;
  type?: "text" | "password";
  placeholder: string;
  isPassword?: boolean;
}

const PasswordInput: React.FC<IPasswordInputProps> = ({
  label,
  field,
  error,
  type = "text",
  placeholder,
  isPassword,
}) => {
  const [visible, setVisible] = useState(false);

  const handleVisibilty = () => {
    setVisible(!visible);
  };
  return (
    <div className="mb-4 relative">
      <label
        htmlFor={label}
        className="block font-medium mb-1 text-[14px] leading-[22px] text-[#222D33]"
      >
        {label}
      </label>
      <input
        {...field}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className={`w-full p-2 rounded-md border ${
          error ? "border-[#a10]" : "border - #E5E7EB"
        } focus:border-[#005700] focus:outline-none placeholder:text-[16px] placeholder:leading-[28px] text-[#222D33] placeholder:font-normal placeholder:text-opacity-100`}
      />

      <p className="text-[#a10]">{error?.message}</p>
      <span
        onClick={handleVisibilty}
        className="absolute  right-4 transform -translate-y-8   cursor-pointer text-gray-500"
      >
        {visible ? (
          <AiOutlineEyeInvisible size={23} />
        ) : (
          <AiOutlineEye size={23} />
        )}
      </span>
      {isPassword && (
        <p className="text-[#C2C2C2] text-[13px] leading-[22px]">
          Must be 8 characters long, Uppercase inclusive
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
