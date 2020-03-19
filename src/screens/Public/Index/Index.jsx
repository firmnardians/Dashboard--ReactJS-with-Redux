import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Index extends Component {
  render() {
    return (
      <>
        <h1 className="text-center">
          Silahkan
          <Link className="color-primary pl-5 pr-5" to="/login">
            login
          </Link>
          atau
          <Link className="color-primary pl-5 pr-5" to="/register">
            buat akun
          </Link>
        </h1>
      </>
    );
  }
}

export default Index;
