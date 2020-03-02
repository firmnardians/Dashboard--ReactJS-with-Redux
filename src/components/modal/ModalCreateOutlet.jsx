import React from "react";
import "./ModalCreateOutlet.css";

const ModalCreateOutlet = props => {
  return (
    <>
      <div
        className={
          props.className
            ? "modalCreateOutlet transition"
            : "modalCreateOutlet transition modalCreateOutlet-active"
        }
      >
        <div className="modal-title">
          <h2>Create Outlet</h2>
        </div>
        <div className="modal-content">
          <div className="card-flex">
            <div className="card-left">
              <div className="card-input-modal">
                <select
                  className={
                    props.className
                      ? "select-modal"
                      : "select-modal transition select-modal-active"
                  }
                >
                  <option value="">{props.createOutletOption}</option>
                </select>
              </div>
            </div>
            <div className="crad-right">
              <div className="card-input-modal">
                <input
                  type="text"
                  className={
                    props.className
                      ? "modal-input"
                      : "modal-input transiton modal-input-active"
                  }
                />
                <label htmlFor="" className="label-modal">
                  <h4>Nama Outlet</h4>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="card-flex">
            <div className="card-grid-modal">
              <div className="discard-button-modal" onClick={props.discard}>
                <h4>Discard</h4>
              </div>
            </div>
            <div className="card-grid-modal">
              <div className="save-button-modal" onClick={props.save}>
                <h4>Save</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCreateOutlet;
