import React from "react";
import "./select.css";

const Select = props => {
  return (
    <>
      <select
        className={`select-group ${props.className}`}
        name={props.name}
        id={props.id}
      >
        <option value={props.valueOption}>{props.titleOption}</option>
      </select>
    </>
  );
};

export default Select;
