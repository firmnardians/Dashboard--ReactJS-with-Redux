import React from "react";
import "./InputNormal.css";

const InputNormal = props => {
  return (
    <>
      <input
        type="text"
        title={props.title}
        className="input-normal"
        onChange={props.onChange}
      />
    </>
  );
};

export default InputNormal;
