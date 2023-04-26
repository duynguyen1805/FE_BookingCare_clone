import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  saveBulkScheduleDoctorServiceAPI,
  getAllSchedule,
  DeleteScheduleServiceAPI,
  DeleteAllScheduleServiceAPI,
} from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
      arrDoctors: [],
      maxNum: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
    // this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async (id) => {
    let response = await getAllSchedule(id);
    if (response && response.errCode === 0) {
      this.setState({
        arrDoctors: response.users,
      });
      console.log("check state user: ", this.state.arrDoctors); //[]
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      // console.log("data select ",dataSelect);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      //gan item isSelected = false
      if (data && data.length > 0) {
        // data.map(item => {
        //     item.isSelected = false;
        //     return item;
        // })
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      await this.getAllUsersFromReact(this.state.selectedDoctor.value);

      this.setState({
        rangeTime: data,
      });
    }

    // if(prevProps.language !== this.props.language){
    //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    //     // console.log("data select ",dataSelect);
    //     this.setState({
    //         listDoctors: dataSelect
    //     })
    // }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    // console.log("inputdata build.. : ",inputData);
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let lableVI = `${item.lastName} ${item.firstName}`;
        let lableEN = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? lableVI : lableEN;
        object.value = item.id;
        result.push(object);
      });
    }
    // console.log(" result: ", result);
    return result;
  };

  handleChangeSelect = async (selectedOption) => {
    await this.setState({ selectedDoctor: selectedOption });
    this.getAllUsersFromReact(this.state.selectedDoctor.value);
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = (time) => {
    // console.log(time);
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });

      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate, maxNum } = this.state;

    let result = [];

    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected Doctor !");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date ! ");
      return;
    }
    if (!maxNum) {
      toast.error("Invalid maxNum ! ");
      return;
    }
    // >>> DD/MM/YYYY
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          // console.log("check schedule: ", schedule, index);
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          object.maxNumber = maxNum;

          result.push(object);
        });
      } else {
        toast.error("Invalid selected Time !");
        return;
      }
    }

    let res = await saveBulkScheduleDoctorServiceAPI({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
      maxNumber: maxNum,
    });

    if (res && res.errCode === 0) {
      toast.success("Save Schedule success !");
      await this.getAllUsersFromReact(this.state.selectedDoctor.value);
    } else {
      toast.error("Error saveBulkScheduleDoctorServiceAPI => res: ", res);
    }
    console.log("check res:saveBulkScheduleDoctorServiceAPI ", res);
    // console.log("check result: ", result);
  };

  handleDeleteSchedule = async (schedule) => {
    //console.log("check input ob user handleDelete: ", user); //>>> return ob{}
    try {
      let respone = await DeleteScheduleServiceAPI(schedule.id);
      console.log("check respone delete user: ", respone);
      if (respone && respone.errCode !== 0) {
        alert(respone.errMessage);
      } else {
        await this.getAllUsersFromReact(this.state.selectedDoctor.value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteScheduleForDay = async () => {
    //console.log("check input ob user handleDelete: ", user); //>>> return ob{}
    let { currentDate, selectedDoctor } = this.state;

    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected Doctor !");
      return;
    }

    if (!currentDate) {
      toast.error("Select date want to DELETE the appointment.");
    } else {
      let formatedDate = new Date(currentDate).getTime();
      try {
        let respone = await DeleteAllScheduleServiceAPI(formatedDate);
        console.log("check respone delete user: ", respone);
        if (respone && respone.errCode !== 0) {
          alert(respone.errMessage);
        } else {
          await this.getAllUsersFromReact(this.state.selectedDoctor.value);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state }; //khong modify truc tiep thay the bang copyState
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  render() {
    // console.log('check state: ', this.state.rangeTime);
    console.log("check props: ", this.state);

    let { rangeTime, maxNum } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let arrDoctor = this.state.arrDoctors;

    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container mt-4">
            <div className="row">
              <div className="col-5 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctors}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate[0]}
                  minDate={yesterday}
                />
              </div>
              <div className="col-3 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.maxNum" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="maxNum"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "maxNum");
                  }}
                  value={maxNum}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule"
                        }
                        key={index}
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.valueVI
                          : item.valueEN}
                      </button>
                    );
                  })}
              </div>
              <div className="row col-12">
                <div className="col-2">
                  <button
                    className="btn btn-primary btn-save-schedule mt-4"
                    onClick={() => this.handleSaveSchedule()}
                  >
                    <FormattedMessage id="manage-schedule.save-plan" />
                  </button>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-primary btn-save-schedule mt-4"
                    onClick={() => this.handleDeleteScheduleForDay()}
                  >
                    Xóa kế hoạch theo ngày
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="users-table mt-4 col-7 mx-auto">
          <table id="customers">
            <thead>
              <tr>
                <th>ID Bác sĩ</th>
                <th>Ngày</th>
                <th>Thời gian</th>
                <th>Số lượng tối đa</th>
                <th>Số lượng hiện tại</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrDoctor &&
                arrDoctor.map((item, index) => {
                  //.map lap theo phan tu cua arr
                  // console.log("check map: ", item, index);
                  let time = item.timeTypeData;
                  let date =
                    language === LANGUAGES.VI
                      ? moment
                          .unix(+item.date / 1000)
                          .format("dddd - DD/MM/YYYY")
                      : moment
                          .unix(+item.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");
                  return (
                    //return >>> 1 khoi (Fragments <> )
                    <tr>
                      <td className="item-center">{item.doctorId}</td>
                      <td>{date}</td>
                      <td className="item-center">{time.valueVI}</td>
                      <td className="item-center">{item.maxNumber}</td>
                      <td>{item.currentNumber}</td>
                      <td className="item-center">
                        <button
                          className="btn-delete"
                          onClick={() => {
                            this.handleDeleteSchedule(item);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
