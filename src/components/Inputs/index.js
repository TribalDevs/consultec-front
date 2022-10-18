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
  key,
  ...props
}) => {
  return (
    <div className="input" key={key}>
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
      {error.error && <p className="input__error">{error.message}</p>}
    </div>
  );
};
