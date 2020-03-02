import React from "react";
import "./input.css";

const Input = props => {
  return (
    <>
      <div className="card-input-modal">
        <input
          type={props.type}
          className={
            props.className
              ? "modal-input"
              : "modal-input transition modal-input-active"
          }
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
        />
        <label htmlFor={props.htmlFor} className="label-modal">
          {props.title}
        </label>
      </div>
    </>
  );
};

export default Input;
