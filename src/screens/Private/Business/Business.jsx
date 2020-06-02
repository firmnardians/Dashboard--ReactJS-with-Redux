import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CardBusiness from "../../../components/Card/CardBusiness/CardBusiness";
import ButtonMedium from "../../../components/Button/ButtonMedium";
import Loading from "../../../components/Loading/Loading";
import { generalPost } from "../../../service/api";

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBusiness: [],
      isLoading: true
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
          this.setState({
            myBusiness: res.data,
            isLoading: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.myBusiness_API();
  }

  render() {
    const mapBusiness = this.state.myBusiness.map(item => {
      return (
        <div key={item.id} className="column">
          <CardBusiness title={item.name} href={`/overview/${item.id}`} />
        </div>
      );
    });

    return (
      <>
        <div className="card-content-app">
          <div className="card-content-title">
            <div className="card-flex">
              <h1>Bisnis</h1>
              <Link to="/create-business">
                <ButtonMedium className="ml-20" title="Buat bisnis baru" />
              </Link>
            </div>
          </div>

          {this.state.isLoading ? (
            <Loading />
          ) : (
            <div className="mt-20">
              <div className="card-flex">
                <div className="row">{mapBusiness}</div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const stateToProps = state => {
  return {
    token: state.auth.token,
    user_id: state.auth.user_id
  };
};

export default connect(stateToProps)(Business);
