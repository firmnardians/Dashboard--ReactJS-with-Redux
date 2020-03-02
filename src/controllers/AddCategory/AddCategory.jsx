import React, { Component } from "react";
import Overlay from "../../components/Overlay/Overlay";
import Empty from "../../components/Empty/Empty";
import { v4 as uuidv4 } from "uuid";

import "../../components/Modal/modal.css";

export class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      category: [],
      isModal: true
    };
  }

  modalCategory = () => {
    this.setState({
      isModal: !this.state.isModal
    });
  };

  addTask = () => {
    const Items = {
      id: uuidv4(),
      value: this.input.current.value,
      Date: new Date().toUTCString()
    };

    if (localStorage.getItem("category") == null) {
      const category = [];
      category.push(Items);
      localStorage.setItem("category", JSON.stringify(category));
    } else {
      const category = JSON.parse(localStorage.getItem("category"));
      category.push(Items);
      localStorage.setItem("category", JSON.stringify(category));
    }
    this.setState({
      category: JSON.parse(localStorage.getItem("category"))
    });
    this.modalCategory();
  };

  componentDidMount() {
    const category = window.localStorage.getItem("category");
    const parsedcategory = JSON.parse(category);
    if (category == null) {
      return false;
    } else {
      this.setState({
        category: parsedcategory
      });
    }
  }

  deleteCategory = event => {
    let index = event.target.getAttribute("data-key");
    let categoryValue = JSON.parse(localStorage.getItem("category"));
    categoryValue.splice(index, 1);
    this.setState({ category: categoryValue });
    localStorage.setItem("category", JSON.stringify(categoryValue));
  };
  render() {
    return (
      <div>
        <Overlay className={this.state.isModal} onClick={this.modalCategory} />

        {/* Modal start */}
        <div
          className={
            this.state.isModal ? "modal" : "modal transition modal-active"
          }
        >
          {/* header modal */}
          <div className="modal-title">
            <h2>Create category</h2>
          </div>
          {/* header modal */}

          {/* content modal */}
          <div className="modal-content">
            <div className="card-input-modal">
              <input
                className={
                  this.state.isModal
                    ? "modal-input"
                    : "modal-input transition modal-input-active"
                }
                type="text"
                name="category"
                id="inputModalCategory"
                ref={this.input}
              />
              <label htmlFor="inputModalCategory" className="label-modal">
                <h4>New Category</h4>
              </label>
            </div>
          </div>
          {/* content modal */}

          {/* Footer modal */}
          <div className="modal-footer">
            <div className="card-flex">
              <div className="card-grid-modal">
                <div
                  className="discard-button-modal"
                  onClick={this.modalCategory}
                >
                  <h4>Discard</h4>
                </div>
              </div>
              <div className="card-grid-modal">
                <div className="save-button-modal" onClick={this.addTask}>
                  <h4>Save</h4>
                </div>
              </div>
            </div>
          </div>
          {/* Footer modal */}
        </div>
        {/* Modal Finish */}

        <Empty
          titleEmpty="You don't have a category product"
          titleButton="
          Create category"
          onClick={this.modalCategory}
        />
        <ol>
          {this.state.category.map((item, index) => {
            return (
              <table>
                <td key={item.id}>
                  {item.value} - {item.Date}
                  <button
                    type="button"
                    value="delete"
                    data-key={index}
                    onClick={this.deleteCategory}
                  >
                    Hapus
                  </button>
                </td>
              </table>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default AddCategory;
