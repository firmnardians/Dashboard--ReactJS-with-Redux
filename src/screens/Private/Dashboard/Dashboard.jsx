import React, { Component } from "react";
import axios from "axios";
import DetailTransactions from "../../../components/DetailTransactions/DetailTransactions";
import SellData from "../../../components/Chart/SellData";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBusiness: []
    };
  }

  myBusinessAPI = () => {
    const BusinessList = JSON.stringify({
      id: this.props.user_id,
      token: this.props.token,
      data_type: 3
    });

    axios
      .post(
        "https://devtest-api-beo.hop.cash/v1/api/data/general",
        BusinessList
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            myBusiness: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.myBusinessAPI();
  }
  render() {
    return (
      <div className="card-content-app">
        <div className="card-content-title">
          <h1>Dashboard</h1>
        </div>

        <div className="card-app">
          <div className="card-app-title">
            <h2 className="ml-20 ">My Business</h2>
          </div>
          <div className="card-flex mb-20">
            <div className="card-grid">
              <select className="select-group mr-20">
                {this.state.myBusiness.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <select className="select-group">
                <option value="test">test</option>
              </select>
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
