import React, { Component } from "react";
import DetailTransactions from "../../../components/DetailTransactions/DetailTransactions";

class Report extends Component {
  render() {
    return (
      <>
        <div className="card-content-app">
          <div className="card-content-title">
            <h1>Report</h1>
          </div>
          <div className="card-app">
            <div className="card-sub-app mb-20 text-center">
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
          </div>
        </div>
      </>
    );
  }
}

export default Report;
