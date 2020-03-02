import React, { Component } from "react";
import "./notification.css";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
    this.clickNotif = this.clickNotif.bind(this);
  }

  clickNotif() {
    this.setState(state => ({
      active: !state.active
    }));
  }
  render() {
    return (
      <>
        <div className="card-notification">
          <i className="material-icons navbar-icon" onClick={this.clickNotif}>
            notifications
          </i>
          <div
            className={
              this.state.active
                ? "card-data-notification transform-notification"
                : "card-data-notification transform-notification transform-notification-active"
            }
          >
            <div className="card-title-notification">
              <div className="title-notification">
                <div className="card-flex jc-sb">
                  <h3>Notification</h3>
                  <i
                    className="material-icons-no-font fw-bold"
                    onClick={this.clickNotif}
                  >
                    close
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Notification;
