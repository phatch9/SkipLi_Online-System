import React from "react";
import "./inputField.css";

let InputField = ({ handleChange, ...props }) => {
  return (
    <div className="inputBox">
      <label>{props.label}</label>
      <input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default InputField;
