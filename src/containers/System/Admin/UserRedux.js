import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import { fetchGenderStart } from "../../../store/actions";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "",
      position: "",
      roleId: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    // try {
    //     let res_gender = await getAllCodeService('gender');
    //     if(res_gender && res_gender.errCode === 0){
    //         this.setState({
    //             genderArr: res_gender.data
    //         })
    //     }
    // } catch (e) {
    //   console.log(e);
    // }
    // try {
    //     let res_pos = await getAllCodeService('position');
    //     if(res_pos && res_pos.errCode === 0){
    //         this.setState({
    //             positionArr: res_pos.data
    //         })
    //     }
    // } catch (e) {
    //   console.log(e);
    // }
    // try {
    //     let res_role = await getAllCodeService('role');
    //     if(res_role && res_role.errCode === 0){
    //         this.setState({
    //             roleArr: res_role.data
    //         })
    //     }
    // } catch (e) {
    //   console.log(e);
    // }
    //-----------------------------------------------------------
    document.title = "Quản lý Tài khoản Bác sỹ";
    this.props.getGenderStart(); //dispatch ben duoi truoc or
    // this.props.dispatch(actions.fetchGenderStart())
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  //được gọi sau khi render chạy: render => didupdate
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }

    if (prevProps.listUsers != this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTION.CREATE,
        previewImgURL: "",
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("check base64 img: ", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
    // console.log("check url file img: ", objectUrl);
  };

  openPreviewImg = () => {
    if (!this.state.previewImgURL) return;

    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    }

    let { action } = this.state;

    if (action === CRUD_ACTION.CREATE) {
      //fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender, //gender type boolean
        roleId: this.state.roleId,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTION.EDIT) {
      //fire redux edit user
      this.props.editAUser({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender, //gender type boolean
        roleId: this.state.roleId,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state }; //khong modify truc tiep thay the bang copyState
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      //console.log("check inside loop:" + this.state[arrInput[i]]);

      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditUserfromParent = (user) => {
    //load imgString base64 >>> image
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    if (user.roleId === "R3") {
      this.setState({
        email: user.email,
        password: "HARDCODE",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phonenumber: user.phonenumber,
        gender: user.gender,
        position: "P5",
        roleId: user.roleId,
        avatar: user.avatar,
        previewImgURL: imageBase64,
        action: CRUD_ACTION.HIDE_USER,
        userEditId: user.id,
      });
    } else {
      this.setState({
        email: user.email,
        password: "HARDCODE",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phonenumber: user.phonenumber,
        gender: user.gender,
        position: user.positionId,
        roleId: user.roleId,
        avatar: user.avatar,
        previewImgURL: imageBase64,
        action: CRUD_ACTION.EDIT,
        userEditId: user.id,
      });
    }

    // console.log("check handle edit user from parent", user);
    // this.setState({
    //   email: user.email,
    //   password: "HARDCODE",
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   address: user.address,
    //   phonenumber: user.phonenumber,
    //   gender: user.gender,
    //   position: user.positionId,
    //   roleId: user.roleId,
    //   avatar: user.avatar,
    //   previewImgURL: imageBase64,
    //   action: CRUD_ACTION.EDIT,
    //   userEditId: user.id,
    // });
  };

  render() {
    // console.log("check props gender from redux: ", this.props.genderRedux);
    console.log("check state: ", this.state);

    let language = this.props.language;

    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;

    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phonenumber,
      gender,
      position,
      roleId,
      avatar,
    } = this.state;

    let isLoadingGender = this.props.isLoadingGender;
    return (
      <div className="user-redux-container">
        <div className="title">Tạo tài khoản Bác sỹ</div>
        <div className="user-redux-body">
          <div className="container">
            {/* <div className="row"> */}
            <div className="row col-12">
              <FormattedMessage id="manage-user.add" />
            </div>
            {/* <form action="/post-crud" method="POST"> */}
            <div className="row col-12">
              {isLoadingGender === true ? "Loading genders" : ""}
            </div>
            <div className="row mt-4">
              <div className="form-group col-6">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  value={email}
                  disabled={
                    this.state.action === CRUD_ACTION.EDIT ||
                    this.state.action === CRUD_ACTION.HIDE_USER
                      ? true
                      : false
                  }
                ></input>
              </div>
              <div className="form-group col-6">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  value={password}
                  disabled={
                    // this.state.action === CRUD_ACTION.EDIT ? true : false
                    this.state.action === CRUD_ACTION.EDIT ||
                    this.state.action === CRUD_ACTION.HIDE_USER
                      ? true
                      : false
                  }
                ></input>
              </div>
            </div>

            <div className="row mt-4">
              <div className="form-group col-6">
                <label>
                  <FormattedMessage id="manage-user.first-Name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  name="firstName"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                  value={firstName}
                  disabled={
                    this.state.action === CRUD_ACTION.HIDE_USER ? true : false
                  }
                ></input>
              </div>
              <div className="form-group col-6">
                <label>
                  <FormattedMessage id="manage-user.last-Name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  name="lastName"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                  value={lastName}
                  disabled={
                    this.state.action === CRUD_ACTION.HIDE_USER ? true : false
                  }
                ></input>
              </div>
            </div>

            <div className="row mt-4">
              <div className="form-group col-8">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  value={address}
                  disabled={
                    this.state.action === CRUD_ACTION.HIDE_USER ? true : false
                  }
                ></input>
              </div>
              <div className="form-group col-4">
                <label>
                  <FormattedMessage id="manage-user.phone" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phonenumber"
                  placeholder="+84"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phonenumber");
                  }}
                  value={phonenumber}
                  disabled={
                    this.state.action === CRUD_ACTION.HIDE_USER ? true : false
                  }
                ></input>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  name="gender"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "gender");
                  }}
                  value={gender}
                  disabled={
                    this.state.action === CRUD_ACTION.HIDE_USER ? true : false
                  }
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option keyMap={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  name="position"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "position");
                  }}
                  value={position}
                  disabled={
                    this.state.action === CRUD_ACTION.HIDE_USER ? true : false
                  }
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option keyMap={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  name="roleId"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "roleId");
                  }}
                  value={roleId}
                  disabled={
                    this.state.action === CRUD_ACTION.HIDE_USER ? true : false
                  }
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.slice(0, 2).map((item, index) => {
                      return (
                        <option keyMap={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVI
                            : item.valueEN}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="preview-img"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label className="lable-upload" htmlFor="preview-img">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    previewImgURL
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImg()}
                  ></div>
                </div>
              </div>
              <div>
                <button
                  className={
                    this.state.action === CRUD_ACTION.EDIT
                      ? "btn btn-warning ml-3"
                      : "btn btn-primary ml-3"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTION.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserfromParent={this.handleEditUserfromParent}
                  action={this.state.action}
                />
              </div>
            </div>
            {/* </form> */}
          </div>

          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editAUser: (data) => dispatch(actions.editAUser(data)),

    // fetchAllUsers: () => dispatch(actions.fetchAllUsersStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
