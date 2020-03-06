import React from "react";
import "./Button.css";

const ButtonMedium = props => {
  return (
    <>
      <div
        className={`btn btn-primary cursor-pointer ds-inline-blok btn-medium ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.title}
      </div>
    </>
  );
};

export default ButtonMedium;
