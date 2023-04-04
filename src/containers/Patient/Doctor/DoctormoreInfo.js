import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctormoreInfo.scss";
import { LANGUAGES } from "../../../utils";

import { getMoreInforDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class DoctormoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInforPrice: false,
      moreInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getMoreInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          moreInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getMoreInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          moreInfor: res.data,
        });
      }
    }
  }

  showHide = (status) => {
    this.setState({
      isShowDetailInforPrice: status,
    });
  };

  render() {
    let { language } = this.props;
    let { isShowDetailInforPrice, moreInfor } = this.state;

    console.log("state: ", this.state);
    return (
      <div className="doctor-more-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.more-infor.text-address" />
          </div>
          <div className="name-clinic">
            {moreInfor && moreInfor.nameClinic ? moreInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            {moreInfor && moreInfor.addressClinic
              ? moreInfor.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInforPrice === false && (
            <div className="short-info">
              <FormattedMessage id="patient.more-infor.price" />
              {moreInfor &&
                moreInfor.priceData &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    className="currency"
                    value={moreInfor.priceData.valueVI}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                )}
              {moreInfor &&
                moreInfor.priceData &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    className="currency"
                    value={moreInfor.priceData.valueEN}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )}
              <span
                className="detail"
                onClick={() => {
                  this.showHide(true);
                }}
              >
                <FormattedMessage id="patient.more-infor.detail" />
              </span>
            </div>
          )}
          {isShowDetailInforPrice === true && (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.more-infor.price" />
              </div>
              <div className="detail-price">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.more-infor.price" />
                  </span>
                  <span className="right">
                    {moreInfor &&
                      moreInfor.priceData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          className="currency"
                          value={moreInfor.priceData.valueVI}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      )}
                    {moreInfor &&
                      moreInfor.priceData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          className="currency"
                          value={moreInfor.priceData.valueEN}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {moreInfor && moreInfor.note ? moreInfor.note : ""}
                </div>
              </div>
              <div className="noti-payment">
                <FormattedMessage id="patient.more-infor.payment" />
              </div>
              <div className="hide-price">
                <span
                  onClick={() => {
                    this.showHide(false);
                  }}
                >
                  <FormattedMessage id="patient.more-infor.hide-price" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctormoreInfo);
