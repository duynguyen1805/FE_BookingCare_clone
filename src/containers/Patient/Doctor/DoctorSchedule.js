import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    // console.log("moment vi: ",moment(new Date()).format('dddd - DD/MM'));
    // console.log("moment en: ",moment(new Date()).locale('en').format('ddd - DD/MM'));
    let allDays = this.getArrDays(language);

    if (this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }

    this.setState({
      allDays: allDays,
    });
  }

  uppercaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let lableVI = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.uppercaseFirstLetter(lableVI);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }

    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);

      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
  }

  getDataSchedule = async (doctorId, date) => {
    let res = await getScheduleDoctorByDate(doctorId, date);

    if (res && res.errCode === 0) {
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
  };

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      // let res = await getScheduleDoctorByDate(doctorId, date);

      // if (res && res.errCode === 0) {
      //   this.setState({
      //     allAvalableTime: res.data ? res.data : [],
      //   });
      // }
      this.getDataSchedule(doctorId, date);

      // console.log("check res schedule from react: ", res);
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
    console.log("check time: ", time);
  };

  handleClickScheduleTime_Full = (time) => {
    this.setState({
      isOpenModalBooking: false,
      dataScheduleTimeModal: time,
    });
    console.log("check time: ", time);
  };

  closeBooking = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let {
      allDays,
      allAvalableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    let { language } = this.props;
    console.log("check allAvalableTime: ", allAvalableTime);

    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {allAvalableTime && allAvalableTime.length > 0 ? (
                allAvalableTime.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVI
                      : item.timeTypeData.valueEN;
                  if (item.currentNumber < item.maxNumber) {
                    return (
                      <button
                        key={index}
                        className={
                          language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                        }
                        onClick={() => this.handleClickScheduleTime(item)}
                      >
                        {timeDisplay}
                      </button>
                    );
                  } else {
                    return (
                      <>
                        <button
                          key={index}
                          className={
                            language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                          }
                          onClick={() =>
                            this.handleClickScheduleTime_Full(item)
                          }
                        >
                          {timeDisplay} <br />
                          <FormattedMessage id="patient.detail-doctor.full" />
                        </button>
                      </>
                    );
                  }
                })
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModalBooking={isOpenModalBooking}
          closeBooking={this.closeBooking}
          dataTime={dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
