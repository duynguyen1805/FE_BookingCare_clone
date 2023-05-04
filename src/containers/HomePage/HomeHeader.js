import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: true,
      valueChange: "",
      listspec: [
        { id: 25, name: "TS. Chu Tấn Sĩ - CK.Thần Kinh", role: 0 },
        { id: 26, name: "TS. Nguyễn Thị Minh Đức - CK.Thần Kinh", role: 0 },
        {
          id: 27,
          name: "TS. Tăng Hà Nam Anh - CK.Chấn thương chỉnh hình",
          role: 0,
        },
        { id: 28, name: "BS. Nguyễn Tấn Vũ - CK.Cơ Xương Khớp", role: 0 },
        {
          id: 29,
          name: "BS. Nguyễn Thị Kim Dung - CK.Da liễu-Thẩm mỹ da",
          role: 0,
        },
        { id: 30, name: "PGS. Vũ Huy Trụ - CK.Khoa Nhi", role: 0 },
        { id: 31, name: "TS. Bùi Thị Phương Nga - CK.Phụ Khoa", role: 0 },
        {
          id: 32,
          name: "PGS. Trần Phan Chung Thủy - CK.Tai mũi họng",
          role: 0,
        },
        {
          id: 33,
          name: "TS. Vũ Trường Khanh - CK.Tiêu hóa-Gan-Mật tụy",
          role: 0,
        },
        { id: 34, name: "PGS. Phạm Nguyễn Vinh - CK.Tim mạch", role: 0 },
        { id: 35, name: "BS. Trần Vương Thảo Nghi - CK.Ung bướu", role: 0 },
        { id: 36, name: "BS. Nguyễn Quốc Dũng - CK.Xét nghiệm", role: 0 },
        { id: 7, name: "Thần Kinh", role: 1 },
        { id: 10, name: "Chấn thương chỉnh hình", role: 1 },
        { id: 11, name: "Cơ Xương Khớp", role: 1 },
        { id: 12, name: "Da liễu-Thẩm mỹ da", role: 1 },
        { id: 13, name: "Khoa Nhi", role: 1 },
        { id: 14, name: "Phụ Khoa", role: 1 },
        { id: 15, name: "Tai mũi họng", role: 1 },
        { id: 16, name: "Tiêu hóa - Gan - Mật tụy", role: 1 },
        { id: 17, name: "Tim mạch", role: 1 },
        { id: 18, name: "Ung bướu", role: 1 },
        { id: 19, name: "Xét nghiệm", role: 1 },
      ],
      arrDoctors: [],
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  toggleNav() {
    this.setState({
      showNav: !this.state.showNav,
    });
  }

  changeLanguage = (language) => {
    //fire redux event: folder >>> actions
    // this.props.dispatch(changeLanguageApp(languge))
    this.props.changeLanguageAppRedux(language);
  };

  returntoHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  returntoAllSpec = () => {
    if (this.props.history) {
      this.props.history.push(`/all-specialty`);
    }
  };

  returntoAllDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/all-doctor`);
    }
  };

  handleChange = (event) => {
    this.setState({
      valueChange: event.target.value,
    });
  };
  handleSelect = (search) => {
    if (this.props.history) {
      if (search.role === 0) {
        this.props.history.push(`/detail-doctor/${search.id}`);
      } else {
        this.props.history.push(`/detail-specialty/${search.id}`);
      }
    }
  };

  render() {
    const { showNav, listspec, valueChange, arrDoctors } = this.state;
    let language = this.props.language; //lay tu redux ra
    let filteredSpecs = listspec.filter((spec) =>
      spec.name.toLowerCase().includes(valueChange.toLowerCase())
    );
    console.log("check arrDoctor: ", arrDoctors);

    return (
      <React.Fragment>
        <div className="home-header-container navbar-light navbar-expand-lg">
          <div className="home-header-content">
            <div className="left-content">
              <button
                className="navbar-toggler"
                type="button"
                onClick={this.toggleNav}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {/* <i class="fas fa-bars"></i> */}
              <div
                className="header-logo"
                onClick={() => this.returntoHome()}
              ></div>
            </div>

            <div className="center-content">
              <div
                className={
                  (showNav ? "show" : "") + " collapse navbar-collapse"
                }
                ref="mynav"
              >
                <div className="child-content">
                  <div>
                    <b onClick={() => this.returntoAllSpec()}>
                      {" "}
                      <FormattedMessage id="home-header.speciality" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home-header.searchdoctor" />
                  </div>
                </div>

                <div className="child-content">
                  <div>
                    <b onClick={() => this.returntoAllDoctor()}>
                      <FormattedMessage id="home-header.doctor" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home-header.select-doctor" />
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div
                className={
                  (showNav ? "show" : "") + " collapse navbar-collapse"
                }
                ref="mynav"
              >
                <div className="support">
                  <i class="fas fa-question-circle">
                    {" "}
                    <FormattedMessage id="home-header.support" />
                  </i>
                </div>
                <div className="language">
                  <div
                    className={
                      language === LANGUAGES.VI
                        ? "language-vi active hover"
                        : "language-vi"
                    }
                  >
                    <span
                      onClick={() => {
                        this.changeLanguage(LANGUAGES.VI);
                      }}
                    >
                      VN
                    </span>
                  </div>
                  <div
                    className={
                      language === LANGUAGES.EN
                        ? "language-en active hover"
                        : "language-en"
                    }
                  >
                    <span
                      onClick={() => {
                        this.changeLanguage(LANGUAGES.EN);
                      }}
                    >
                      EN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title-1">
                <FormattedMessage id="banner.title-1" />
              </div>
              <div className="title-2">
                <FormattedMessage id="banner.title-2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  id="specialty"
                  value={this.valueChange}
                  placeholder="Tìm chuyên khoa khám bệnh"
                  onChange={this.handleChange}
                  list="specialties"
                />
              </div>
              {valueChange !== "" && (
                <div className="search-results">
                  {filteredSpecs.map((spec) => (
                    <div
                      key={spec}
                      className="result"
                      onClick={() => {
                        this.handleSelect(spec);
                      }}
                    >
                      {spec.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-hospital" />
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.text-1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-mobile-alt" />
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.text-2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-procedures" />
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.text-3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-flask" />
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.text-4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-user-md" />
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.text-5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-briefcase-medical" />
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.text-6" />
                  </div>
                </div>
                {/* <div className='option-child'>
                        <div className='icon'>
                            <i className='fas fa-hospital'/>
                        </div>
                        <div className='text'>Gói phẫu thuật</div>
                    </div>
                    <div className='option-child'>
                        <div className='icon'>
                            <i className='fas fa-hospital'/>
                        </div>
                        <div className='text'>Sản phẩm y tế</div>
                    </div>
                    <div className='option-child'>
                        <div className='icon'>
                            <i className='fas fa-hospital'/>
                        </div>
                        <div className='text'>Sức khỏe doanh nghiệp</div>
                    </div> */}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
