import React, { Component } from "react";
import { connect } from "react-redux";

import DetailTransactions from "../../../components/DetailTransactions/DetailTransactions";
import SellData from "../../../components/Chart/SellData";
import Loading from "../../../components/Loading/Loading";
import { generalPost } from "../../../service/api";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBusiness: [],
      myOutlet: [],

      isLoading: true,
      business_id: ""
    };
  }

  myBusiness_API = () => {
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 3
    });

    generalPost(__data)
      .then(res => {
        if (res.status === 200) {
          this.setState(
            {
              myBusiness: res.data,
              business_id: res.data[0].id,
              isLoading: false
            },
            () => {
              this.myOutlet_API();
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  myOutlet_API = () => {
    const __data = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      business_id: this.state.business_id,
      data_type: 4
    });

    generalPost(__data)
      .then(res => {
        // console.log(`outlet`, res);
        if (res.status === 200) {
          this.setState({
            myOutlet: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChangeBusiness = event => {
    this.setState(
      {
        business_id: event.target.value
      },
      () => {
        this.myOutlet_API();
      }
    );
  };

  componentDidMount() {
    this.myBusiness_API();
  }

  render() {
    const mapBusiness = this.state.myBusiness.map((item, index) => {
      if (this.state.isLoading) {
        return <option key={index}>Loading...</option>;
      } else {
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      }
    });

    const mapOutlet = this.state.myOutlet.map((item, index) => {
      if (this.state.isLoading) {
        return <option key={index}>Loading...</option>;
      } else {
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      }
    });

    return (
      <div className="card-content-app">
        <div className="card-content-title">
          <h1>Dashboard</h1>
        </div>

        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="card-app">
            <div className="card-app-title">
              <h2 className="ml-20 ">My Business</h2>
            </div>

            <div className="card-flex mb-20">
              <div className="card-grid">
                <p>Bisnis</p>
                <select
                  value={this.state.business_id}
                  onChange={this.handleChangeBusiness}
                  className="select-group mr-20"
                >
                  {mapBusiness}
                </select>
              </div>

              <div className="card-grid">
                <p>Outlet</p>
                <select className="select-group">{mapOutlet}</select>
              </div>

              <div className="card-grid">
                <p>Dari</p>
                <input type="date" className="input-normal" />
              </div>

              <div className="card-grid">
                <p>Sampai</p>
                <input type="date" className="input-normal" />
              </div>
            </div>

            <div className="card-sub-app mb-20 text-center mt-30">
              <div className="card-flex">
                <div className="card-grid">
                  <DetailTransactions title="Total transaksi" number="0" />
                </div>
                <div className="card-grid">
                  <DetailTransactions title="Transaksi selesai" number="0" />
                </div>
                <div className="card-grid">
                  <DetailTransactions title="Transaksi berjalan" number="0" />
                </div>
                <div className="card-grid">
                  <DetailTransactions title="Transaksi batal" number="0" />
                </div>
                <div className="card-grid">
                  <DetailTransactions title="Transaksi void" number="0" />
                </div>
              </div>
            </div>

            <hr className="mt-30 mb-30" />
            <SellData className="mt-30" />
          </div>
        )}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    token: state.auth.token,
    user_id: state.auth.user_id
  };
};

export default connect(stateToProps)(Dashboard);
