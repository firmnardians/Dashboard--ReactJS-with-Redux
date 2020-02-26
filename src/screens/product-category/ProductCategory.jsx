import React, { Component } from "react";
import AddCategory from "../../controllers/add-category/AddCategory";

export class ProductCategory extends Component {
  render() {
    return (
      <div className="card-content-app">
        <div className="card-content-title">
          <h1>Product category </h1>
        </div>

        <AddCategory />
      </div>
    );
  }
}

export default ProductCategory;
