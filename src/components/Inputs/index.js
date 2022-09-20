import React from "react";

export const Input = ({
  name,
  value,
  onChange,
  type,
  placeholder,
  label,
  error,
  disabled,
  ...props
}) => {
  return (
    <div className="input">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};
