import React, { Component } from "react";
import MultiStepBusiness from "../../../components/Card/MultiStep/MultiStepBusiness";

export class CreateBusiness extends Component {
  render() {
    return (
      <>
        <div className="card-content-app">
          <MultiStepBusiness
            title="Buat bisnis"
            description="Kamu bisa buat bisnis yang baru disini."
          />
        </div>
      </>
    );
  }
}

export default CreateBusiness;
