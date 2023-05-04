import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../containers/Header/Header";

class Doctor extends Component {
  async componentDidMount() {
    document.title = "Quản lý";
  }
  render() {
    const { isLoggedIn } = this.props;

    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div></div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
