import React from "react";
import "./overlay.css";

const Overlay = props => {
  return (
    <div>
      <div
        className={
          props.activeOverlay
            ? "overlayModal transition-overlayModal overlayModal-active "
            : "overlayModal "
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default Overlay;
