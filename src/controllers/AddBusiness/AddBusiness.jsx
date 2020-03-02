import React, { Component } from "react";
import ButtonBig from "../../components/Button/ButtonBig";
import Overlay from "../../components/Overlay/Overlay";
import Input from "../../components/Input/Input";
import TextArea from "../../components/TextArea/TextArea";
import CardBusiness from "../../components/Card/CardBusiness/CardBusiness";
import axios from "axios";

import "../../components/Modal/modal.css";

export class AddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: [],
      hideOverlayModal: true,
      isLoading: true,
      isEmpty: true,
      isUpdate: false,

      createBusiness: {
        id: "",
        title: "",
        description: ""
      }
    };
  }

  clickModalOverlay = () => {
    this.setState({
      hideOverlayModal: !this.state.hideOverlayModal
    });
  };

  getDataAPI = () => {
    axios
      .get("http://localhost:3004/business?_sort=id&_order=desc")
      .then(
        response => {
          this.setState({
            business: response.data,
            isLoading: false
          });
        }
        // console.log(response);
      )
      .catch(error => {
        console.log(error);
      });
  };

  postDataAPI = () => {
    axios
      .post("http://localhost:3004/business", this.state.createBusiness)
      .then(() => {
        // console.log(result);
        this.getDataAPI();
        this.setState({
          createBusiness: {
            id: "",
            title: "",
            description: ""
          }
        });
      });
  };

  putDataAPI = () => {
    axios
      .put(
        `http://localhost:3004/business/${this.state.createBusiness.id}`,
        this.state.createBusiness
      )
      .then(() => {
        // console.log(result);
        this.getDataAPI();
        this.setState({
          isUpdate: !this.state.isUpdate,
          createBusiness: {
            id: "",
            title: "",
            description: ""
          }
        });
      });
  };

  handleCreateBusiness = event => {
    let getId = new Date().getTime();
    // console.log(`ini id saya ${getId}`);

    // console.log("cek onchange", event.target.value);
    let newCreateBusiness = { ...this.state.createBusiness }; // mengcopy / duplicat ke varibel baru
    // console.log(event.target.name);
    if (!this.state.isUpdate) {
      newCreateBusiness["id"] = getId;
    }

    newCreateBusiness[event.target.name] = event.target.value;

    this.setState(
      {
        createBusiness: newCreateBusiness
      }
      // () => {
      //   console.log(this.state.createBusiness);
      // }
    );
  };

  clickRemoveBusiness = data => {
    axios.delete(`http://localhost:3004/business/${data}`).then(() => {
      this.getDataAPI();
    });
  };

  clickUpdateBusiness = data => {
    this.clickModalOverlay();
    this.setState({
      createBusiness: data,
      isUpdate: !this.state.isUpdate
    });

    // console.log(data);
  };

  clickSubmitBusiness = () => {
    if (this.state.isUpdate) {
      this.putDataAPI();
      this.clickModalOverlay();
    } else {
      // console.log("submit work");
      // console.log(this.state.createBusiness);
      this.postDataAPI();
      this.clickModalOverlay();
    }
  };

  componentDidMount() {
    this.getDataAPI();
  }

  render() {
    return (
      <>
        <Overlay
          className={this.state.hideOverlayModal}
          onClick={this.clickModalOverlay}
        />

        <div
          className={
            this.state.hideOverlayModal
              ? "modal"
              : "modal transition modal-active"
          }
        >
          <div className="modal-title">
            <h2>Add Business</h2>
          </div>

          <div className="modal-content">
            <Input
              className={this.state.hideOverlayModal}
              title="Title"
              type="text"
              name="title"
              value={this.state.createBusiness.title}
              onChange={this.handleCreateBusiness}
            />
            <TextArea
              className={
                this.state.hideOverlayModal
                  ? "text-area"
                  : "text-area transition text-area-active"
              }
              name="description"
              value={this.state.createBusiness.description}
              placeholder="Deskripsi"
              onChange={this.handleCreateBusiness}
            />
          </div>

          <div className="modal-footer">
            <div className="card-flex">
              <div className="card-grid-modal">
                <div
                  className="discard-button-modal"
                  onClick={this.clickModalOverlay}
                >
                  <h4>Discard</h4>
                </div>
              </div>
              <div className="card-grid-modal">
                <div className="save-button-modal">
                  <h4 onClick={this.clickSubmitBusiness}>Save</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ButtonBig title="Buat bisnis baru" onClick={this.clickModalOverlay} />

        <div className="mt-20">
          <div className="card-flex">
            <div className="row">
              {!this.state.isLoading ? (
                this.state.business.map(item => {
                  return (
                    <div key={item.id} className="column">
                      <CardBusiness
                        key={item.id}
                        data={item}
                        removeBusiness={this.clickRemoveBusiness}
                        updateBusiness={this.clickUpdateBusiness}
                      />
                    </div>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddBusiness;
