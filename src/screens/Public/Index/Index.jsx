import React, { Component } from "react";
import "./Index.css";

export class Index extends Component {
  render() {
    return (
      <>
        <div className="card-jumbo">
          <div className="card-flex">
            <div className="card-grid">
              <div className="card-title-homepage">
                <h1>Selamat datang di cloud ERP untuk retail</h1>
                <p>
                  Kami mempermudah pengelolaan bisnis dengan cloud dan sejalan
                  dalam pengembangan anda, dengan Backoffice yang user-friendly,
                  integrasi terhadap aplikasi kasir dan harga yang terjangkau.
                </p>
              </div>
            </div>
            <div className="card-grid">
              <div className="card-images-landing-homepage">
                <img
                  className="data-image"
                  src="https://hop.cash/static/images/assets/jah-000.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Index;
