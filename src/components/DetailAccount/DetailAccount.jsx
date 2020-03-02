import React from "react";
import "./DetailAccount.css";

const DetailAccount = props => {
  return (
    <>
      <div className="card-account">
        <div className="card-flex">
          <div className="detail-info-account">
            <h3>{props.info}</h3>
          </div>
          <div className="data-info-account">
            <h3>{props.title}</h3>
          </div>
          <div className="card-edit-account">
            <h3>{props.edit}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailAccount;
