import React from "react";
import "./modal.css";

const Modal = props => {
  return (
    <>
      {/* Modal start */}
      <div
        className={
          props.activeModal ? "modal transition modal-active" : "modal"
        }
      >
        {/* header modal */}
        <div className="modal-title">
          <h3>{props.titleModal}</h3>
        </div>
        {/* header modal */}

        {/* content modal */}
        <div className="modal-content">{props.children}</div>
        {/* content modal */}

        {/* Footer modal */}
        <div className="modal-footer">
          <div className="card-flex">
            <div className="card-grid-modal">
              <div className="button-modal" onClick={props.discard}>
                <h4>{props.titleDiscard}</h4>
              </div>
            </div>
            <div className="card-grid-modal">
              <div
                className={`${props.submitColor} button-modal`}
                onClick={props.submit}
              >
                <h4>{props.titleSubmit}</h4>
              </div>
            </div>
          </div>
        </div>
        {/* Footer modal */}
      </div>
      {/* Modal Finish */}
    </>
  );
};

export default Modal;
