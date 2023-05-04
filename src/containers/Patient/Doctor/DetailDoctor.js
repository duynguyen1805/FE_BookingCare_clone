import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import DoctorSchedule from "./DoctorSchedule";
import DoctormoreInfo from "./DoctormoreInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    document.title = "Thông tin Bác sỹ";
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });

      let res = await getDetailInforDoctor(id);
      // console.log("check res get detail infor doctor: ", res);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    //get id on url link (/detail-doctor/23)
    // console.log(this.props.match.params.id);

    console.log("Check detail infor doctor: ", this.state);
    let { detailDoctor } = this.state;

    let { language } = this.props;
    let nameVI = "",
      nameEN = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVI = `${detailDoctor.positionData.valueVI}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEN = `${detailDoctor.positionData.valueEN}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVI : nameEN}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctormoreInfo doctorIdFromParent={this.state.currentDoctorId} />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
