import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginAPI } from "../../services/userService";
import { dateFilter } from "react-bootstrap-table2-filter";

class Login extends Component {
  constructor(props) {
    {
      /**Constructor là hàm tạo <<>> khai báo các state */
    }
    super(props);
    this.state = {
      //state login có 2 biến component cần ql là username và password
      username: "",
      password: "",
      isshowPWD: false,
      errMessage: "",
    };
  }

  async componentDidMount() {
    document.title = "Đăng nhập";
  }

  //state quản lý các giá trị của component
  //state là biến lưu giữ giá trị component suốt quá trình hđ

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    // console.log("username: ", this.state.username, "password: ", this.state.password);
    console.log(this.state);

    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      } else {
        if (data && data.errCode === 0) {
          //todo
          this.props.userLoginSuccess(data.user);

          console.log("Login success");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      // this.setState({
      //     errMessage: e.message,
      // })
    }
  };
  handleShowhidePWD = () => {
    this.setState({
      isshowPWD: !this.state.isshowPWD,
    });
  };

  handleKeyDown = (event) => {
    // console.log("check keyDown: ", event);
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    //JSX
    return (
      //chỉ return ra 1 khối - ex: <div></div>
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => {
                  this.handleOnChangeUsername(event);
                }}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-pwd">
                <input
                  type={this.state.isshowPWD ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnChangePassword(event);
                  }}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowhidePWD();
                  }}
                >
                  <i
                    className={
                      this.state.isshowPWD ? "far fa-eye" : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>

            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgotpassword">Forgot your password</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  {
    /**of redux */
  }
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  {
    /**of redux */
  }
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
