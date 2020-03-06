import React from "react";
import "./Button.css";

const ButtonBig = props => {
  return (
    <>
      <div
        className={`btn btn-primary cursor-pointer ds-inline-blok ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.title}
      </div>
    </>
  );
};

export default ButtonBig;
