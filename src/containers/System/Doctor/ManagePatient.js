import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
  DeletePatientServiceAPI,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ConfirmModal from "./ConfirmModal";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenconfirmModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;

    let formatedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      fullname: item.fullname,
      phonenumber: item.phonenumber,
      address: item.address,
      gender: item.patientData.genderData.valueVI,
      reason: item.reason,
    };
    this.setState({
      isOpenconfirmModal: true,
      dataModal: data,
    });
  };

  closeconfirmModal = () => {
    this.setState({
      isOpenconfirmModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });

    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      fullname: dataModal.fullname,
      phonenumber: dataModal.phonenumber,
      address: dataModal.address,
      gender: dataModal.gender,
      reason: dataModal.reason,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send Remedy succeeds: ");
      this.closeconfirmModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Something wrong...");
      console.log("error send remedy: ", res);
    }
  };

  handleDeletePatient = async (patient) => {
    //console.log("check input ob user handleDelete: ", user); //>>> return ob{}
    try {
      let respone = await DeletePatientServiceAPI(patient);
      console.log(
        "check respone delete patient: ",
        respone,
        "check patient: ",
        patient
      );
      if (respone && respone.errCode !== 0) {
        alert(respone.errMessage);
      } else {
        await this.getDataPatient();
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleBtnRemedy = () => {};

  render() {
    // console.log("check state Quan ly benh nhan: ", this.state);
    // console.log("check user: ", this.props.user);

    let { dataPatient, isOpenconfirmModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Số điện thoại</th>
                      <th>Giới tính</th>
                      <th>Triệu chứng</th>
                      <th>Actions</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVI
                            : item.timeTypeDataPatient.valueEN;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData.genderData.valueVI
                            : item.patientData.genderData.valueEN;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.fullname}</td>
                            <td>{item.address}</td>
                            <td>{item.phonenumber}</td>
                            <td>{gender}</td>
                            <td>{item.reason}</td>
                            <td>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác nhận
                              </button>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleDeletePatient(item)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>Không có bệnh nhân đặt lịch hôm nay</tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ConfirmModal
            isOpenModal={isOpenconfirmModal}
            dataModal={dataModal}
            closeconfirmModal={this.closeconfirmModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
