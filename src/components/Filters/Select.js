import React from "react";

const Select = ({ placeholder, options, value, onChange }) => {
  return (
    <select className="select" value={value} onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
