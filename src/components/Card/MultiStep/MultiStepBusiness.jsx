import React, { Component } from "react";
import ButtonMedium from "../../Button/ButtonMedium";
import InputNormal from "../../Input/InputNormal";
import Textarea from "../../TextArea/TextArea";

import "./multistepbusiness.css";

class MultiStepBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultStep: 1
    };
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  nextStep = () => {
    this.setState({
      defaultStep: this.state.defaultStep + 1
    });
  };

  backStep = () => {
    this.setState({
      defaultStep: this.state.defaultStep - 1
    });
  };
  render() {
    return (
      <>
        <div className="card-multi-step">
          <div className="card-number-multi-step">
            <div className="card-flex">
              <div className="card-grid">
                <h3 className={this.state.defaultStep === 1 ? "active" : ""}>
                  1
                </h3>
                <p>Buat bisnis</p>
              </div>

              <div className="card-grid">
                <h3 className={this.state.defaultStep === 2 ? "active" : ""}>
                  2
                </h3>
                <p>Pindahkan outlet</p>
              </div>
            </div>
          </div>

          <div className="card-content-multi-step">
            <form onSubmit={this.handleSubmit}>
              <div
                className={
                  this.state.defaultStep === 1
                    ? "card-first-step"
                    : "card-first-step-active"
                }
              >
                <div className="content-title-multi-step">
                  <h1>{this.props.title}</h1>
                  <p>{this.props.description}</p>
                </div>
                <div className="card-flex">
                  <div className="card-grid">
                    <p>Nama bisnis</p>
                    <InputNormal
                      name="business_name"
                      type="text"
                      autoComplete="off"
                    />
                  </div>
                  <div className="card-grid">
                    <p>Kategori bisnis</p>
                    <select name="" className="select-group" id="">
                      <option value="">test</option>
                    </select>
                  </div>
                </div>
                <div className="card-flex">
                  <div className="card-grid">
                    <div className="mt-20 mb-20">
                      <Textarea label="Deskripsi bisnis" rows="5" cols="25" />
                    </div>
                  </div>
                </div>

                <ButtonMedium onClick={this.nextStep} title="Selanjutnya" />
              </div>

              <div
                className={
                  this.state.defaultStep === 2
                    ? "card-second-step-active"
                    : "card-second-step"
                }
              >
                <div className="content-title-multi-step">
                  <h1>Pindahkan outlet</h1>
                  <p>Mau pindahkan outlet?</p>
                </div>

                <div className="text-center">
                  <select className="select-group" name="" id="">
                    <option value="">Tidak</option>
                  </select>
                </div>

                <div className="mt-30">
                  <div className="card-flex">
                    <div className="card-grid">
                      <ButtonMedium onClick={this.backStep} title="Kembali" />
                    </div>
                    <div className="card-grid">
                      <ButtonMedium title="Simpan" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default MultiStepBusiness;
