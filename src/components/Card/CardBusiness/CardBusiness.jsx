import React from "react";
import { Link } from "react-router-dom";
import ButtonMedium from "../../Button/ButtonMedium";

import "./CardBusiness.css";

const CardBusiness = props => {
  return (
    <>
      <div key={props.id} className="card-business-app">
        <div className="card-business-title">{props.title}</div>
        {/* <div className="card-business-description">
          <p>{props.description}</p>
        </div> */}
        <div className="card-business-footer mt-20">
          <Link to={props.href}>
            <ButtonMedium className="width-100" title="Lihat Detail" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardBusiness;
