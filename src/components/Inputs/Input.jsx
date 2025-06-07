import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, placeholder, label, type, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      {label && (
        <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
      )}

      <div
        className={`input-box flex items-center px-3 py-2 border rounded ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm"
          value={value}
          onChange={onChange}
        />

        {type === 'password' &&
          (showPassword ? (
            <FaRegEye
              size={20}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={20}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          ))}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
