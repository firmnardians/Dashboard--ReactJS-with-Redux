import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import Loading from "../../../components/Loading/Loading";
import { businessPost, generalPost } from "../../../service/api";
import InputNormal from "../../../components/Input/InputNormal";
import Modal from "../../../components/Modal/Modal";
import Overlay from "../../../components/Overlay/Overlay";

import "react-accessible-accordion/dist/fancy-example.css";
import "react-tabs/style/react-tabs.css";
import "./overview.css";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOverlay: false,
      isLoading: true,
      collapse: false,
      myCategoryBusiness: [],
      myOutlet: [],
      outletId: "60",

      myBusiness: {
        id: "",
        name: "",
        description: "",
      },
      myBusinessCategory: {
        id: "",
        name: "",
      },
      myDetailOutlet: {
        id: "",
        name: "",
        address: "",
        phone_number: "",
        region: "",
        city: "",
        table_status: true,
        table_category: 0,
        country: {
          id: "",
          name: "",
        },
        billing: {
          name: "",
          expired: "",
        },
        num_emp: {
          id: "",
          name: "",
        },
        tax_list: "",
      },
    };
  }

  myBusiness_API = () => {
    const business_id = this.props.match.params.businessId;
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 2,
      bid: business_id,
    });
    businessPost(__data).then((res) => {
      // console.log(`bisnis`, res);
      this.setState({
        myBusiness: {
          name: res.data.data.name,
          description: res.data.data.description,
        },
        myBusinessCategory: {
          name: res.data.data.business_category_id.name,
        },
        isLoading: !this.state.isLoading,
      });
    });
  };

  myOutlet_API = () => {
    const business_id = this.props.match.params.businessId;
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 4,
      business_id: business_id,
    });
    generalPost(__data).then((res) => {
      // console.log(`outlet list`, res);
      this.setState({
        myOutlet: res.data,
      });
    });
  };

  myOutletDetail_API = () => {
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 10,
      outlet_id: this.state.outletId,
    });
    businessPost(__data).then((res) => {
      console.log(`outlet detail`, res);
      let _tax = "Tidak ada Servis & Pajak";
      if (res.data.data.tax_list.length > 0) {
        _tax = "Ada Servis & Pajak";
      }
      this.setState({
        myDetailOutlet: {
          id: res.data.data.id,
          name: res.data.data.name,
          address: res.data.data.address,
          phone_number: res.data.data.phone_number,
          region: res.data.data.region,
          city: res.data.data.city,
          table_status: res.data.data.table_status,
          table_category: res.data.data.table_category,
          country: {
            id: res.data.data.country.id,
            name: res.data.data.country.name,
          },
          billing: {
            name: res.data.data.billing.name,
            expired: res.data.data.billing.expired,
          },
          num_emp: {
            id: res.data.data.num_emp.id,
            name: res.data.data.num_emp.name,
          },
          tax_list: _tax,
        },
      });
    });
  };

  deleteOutlet_API = () => {
    console.log(this.state.outletId);

    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 12,
      outlet_id: this.state.outletId,
    });

    businessPost(__data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            isModalOverlay: !this.state.isModalOverlay,
          });
          this.myOutlet_API();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteBusiness_API = () => {
    const business_id = this.props.match.params.businessId;
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 8,
      bid: business_id,
    });

    businessPost(__data).then((res) => {
      console.log(res);
      window.history.push("/business");
    });
  };

  businessCategory_API = () => {
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 0,
    });
    generalPost(__data).then((res) => {
      this.setState({
        myCategoryBusiness: res.data,
      });
    });
  };

  handleAccordion = (e) => {
    const targetElement = e.target.dataset.id;
    this.setState(
      {
        outletId: targetElement,
      },
      () => {
        this.myOutletDetail_API();
      }
    );
  };

  modalOverlay = () => {
    this.setState({
      isModalOverlay: !this.state.isModalOverlay,
    });

    !this.state.isModalOverlay
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  };

  componentDidMount() {
    this.myBusiness_API();
    this.myOutletDetail_API();
    this.myOutlet_API();
    this.businessCategory_API();
  }

  render() {
    const mapCategoryBusiness = this.state.myCategoryBusiness.map((item) => {
      return <option value={item.id}>{item.name}</option>;
    });

    const mapOutlet = this.state.myOutlet.map((item) => {
      return (
        <AccordionItem key={item.id}>
          <AccordionItemHeading value={item.id} onClick={this.handleAccordion}>
            <AccordionItemButton data-id={item.id}>
              {item.name}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="card-flex">
              <div className="card-grid">
                <div className="detail-outlet-accordion">
                  <p>Bisnis: {this.state.myBusiness.name}</p>
                  <p>Karyawan: {this.state.myDetailOutlet.num_emp.name}</p>
                  <p>
                    Nomor telepone: {this.state.myDetailOutlet.phone_number}
                  </p>
                  <p>Alamat: {this.state.myDetailOutlet.address}</p>
                  <p>Negara: {this.state.myDetailOutlet.country.name}</p>
                </div>
              </div>
              <div className="card-grid">
                <div className="detail-outlet-accordion">
                  <p>Tagihan: {this.state.myDetailOutlet.tax_list}</p>
                  <p>Membership: {this.state.myDetailOutlet.billing.name}</p>
                  <p>
                    Tanggal kadaluarsa:{" "}
                    {this.state.myDetailOutlet.billing.expired}
                  </p>
                  <p>Produk kategori: {this.state.myBusiness.name}</p>
                  <p>Produk item: {this.state.myBusiness.name}</p>
                </div>
              </div>
              <div className="card-grid">
                <div className="detail-outlet-action">
                  <div className="detail-outlet-button">
                    <div className="card-flex">
                      <div className="btn btn-primary cursor-pointer fw-600 mr-20">
                        Meja
                      </div>
                      <div className="btn btn-primary cursor-pointer fw-600">
                        Pembayaran
                      </div>
                    </div>
                  </div>
                  <div className="detail-outlet-button">
                    <div className="card-flex">
                      <div className="btn btn-primary cursor-pointer fw-600 mr-20">
                        Ubah
                      </div>
                      <div
                        value={item.id}
                        onClick={this.modalOverlay}
                        className="btn btn-primary cursor-pointer fw-600"
                      >
                        Hapus
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      );
    });

    return (
      <>
        <div className="card-content-app">
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="card-content-title">
                <h1>Bisnis {this.state.myBusiness.name}</h1>
              </div>

              <Tabs>
                <TabList>
                  <Tab>Semua outlet</Tab>
                  <Tab>Detail bisnis</Tab>
                  <Tab>Pengaturan</Tab>
                </TabList>

                <TabPanel>
                  <div className="card-content-overview">
                    <div className="title-content-overview">
                      <h2>Semua outlet</h2>
                      <p>
                        Semua outlet pada bisnis {this.state.myBusiness.name}{" "}
                        akan muncul di halaman ini.
                      </p>
                    </div>

                    <div className="data-content-overview">
                      <Accordion allowZeroExpanded={true}>
                        {mapOutlet}
                      </Accordion>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="card-content-overview">
                    <div className="title-content-overview">
                      <h2>Detail bisnis</h2>
                      <p>
                        Berisi tentang informasi dari bisnis{" "}
                        {this.state.myBusiness.name} yang kamu miliki.
                      </p>
                    </div>

                    <div className="data-content-overview">
                      <div className="detail-content">
                        <div className="card-flex mb-30">
                          <h3>Kategori bisnis: </h3>{" "}
                          <p>{this.state.myBusinessCategory.name}</p>
                        </div>
                      </div>
                      <div className="detail-content">
                        <div className="card-flex mb-30">
                          <h3>Deskripsi: </h3>{" "}
                          <p>{this.state.myBusiness.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="card-content-overview">
                    <div className="title-content-overview">
                      <h2>Pengaturan bisnis</h2>
                      <p>
                        Kamu bisa edit bisnis {this.state.myBusiness.name} di
                        halaman ini.
                      </p>
                    </div>

                    <div className="data-content-overview">
                      <div className="card-setting-overview">
                        <form onSubmit={null}>
                          <p>Nama bisnis</p>
                          <InputNormal
                            value={this.state.myBusiness.name}
                            name="outlet_name"
                            type="text"
                            autoComplete="off"
                          />

                          <p>Kategori bisnis</p>
                          <select className="select-group width-75">
                            {mapCategoryBusiness}
                          </select>

                          <p>Deskripsi</p>
                          <InputNormal
                            value={this.state.myBusiness.description}
                            name="outlet_name"
                            type="text"
                            autoComplete="off"
                          />
                          <div className="mt-30">
                            <div className="btn ds-inline-block btn-primary fw-600 uppercase">
                              Simpan
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className="card-delete-business-overview">
                        <div className="card-flex">
                          <div className="card-grid">
                            <h2>Hapus bisnis</h2>
                            <p>
                              Bisnis {this.state.myBusiness.name} akan terhapus.
                            </p>
                          </div>
                          <div className="card-grid">
                            <div className="mt-20 float-right">
                              <div
                                onClick={this.deleteBusiness_API}
                                className="btn btn-danger ds-inline-block cursor-pointer fw-600"
                              >
                                Hapus
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </>
          )}
        </div>

        <Overlay activeOverlay={this.state.isModalOverlay} />
        <Modal
          activeModal={this.state.isModalOverlay}
          titleModal="Hapus outlet"
          titleDiscard="Batal"
          titleSubmit="Hapus"
          discard={this.modalOverlay}
          submit={this.deleteOutlet_API}
          submitColor="danger-color"
        >
          <p>Kamu yakin akan menghapus outlet ini?</p>
        </Modal>
      </>
    );
  }
}

const stateToProps = (state) => {
  return {
    user_id: state.auth.user_id,
    token: state.auth.token,
  };
};

export default connect(stateToProps)(Overview);
