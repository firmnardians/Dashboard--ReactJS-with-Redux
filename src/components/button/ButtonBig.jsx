import React from "react";
import "./Button.css";

const ButtonBig = props => {
  return (
    <>
      <button
        type="submit"
        className={`btn btn-primary cursor-pointer ds-inline-blok btn-big ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.title}
      </button>
    </>
  );
};

export default ButtonBig;
