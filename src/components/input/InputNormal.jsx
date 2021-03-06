import React from "react";
import "./InputNormal.css";

const InputNormal = props => {
  return (
    <>
      <input
        name={props.name}
        value={props.value}
        type={props.type}
        title={props.title}
        className="input-normal"
        autoComplete={props.autoComplete}
        onChange={props.onChange}
      />
    </>
  );
};

export default InputNormal;
