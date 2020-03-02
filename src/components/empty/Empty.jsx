import React from "react";
import ButtonBig from "../Button/ButtonBig";
import "./empty.css";

const Empty = props => {
  return (
    <>
      <div className="card-empty">
        <div className="card-empty-title">
          <h2>{props.titleEmpty}</h2>
        </div>

        <ButtonBig title={props.titleButton} onClick={props.onClick} />
      </div>
    </>
  );
};
export default Empty;
