import React from "react";
import "./overlay.css";

const Overlay = props => {
  return (
    <div>
      <div
        className={
          props.className
            ? "overlay "
            : "overlay transition-overlay overlay-active "
        }
        onClick={props.onClick}
      ></div>
    </div>
  );
};

export default Overlay;
