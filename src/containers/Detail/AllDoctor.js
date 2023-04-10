import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import EachDoctor from "./EachDoctor";
import * as actions from "../../store/actions";
import { getAllSpecialtyServiceAPI } from "../../services/userService";

class AllDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      let arrDoctors = this.props.topDoctorsRedux;
      this.setState({
        arrDoctors: arrDoctors,
      });
    }
  }

  handleViewDetailDoctor = (dataDoctor) => {
    // console.log("view info doctor; ", dataDoctor);
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${dataDoctor.id}`);
    }
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let language = this.props.language;

    return (
      <div>
        <HomeHeader isShowBanner={false} />
        {arrDoctors &&
          arrDoctors.length > 0 &&
          arrDoctors.map((item, index) => {
            let imageBase64 = "";
            if (item.image) {
              imageBase64 = new Buffer(item.image, "base64").toString("binary");
            }
            let nameVI = `${item.positionData.valueVI}, ${item.lastName}, ${item.firstName}`;
            let nameEN = `${item.positionData.valueEN}, ${item.firstName}, ${item.lastName}`;
            return (
              <div onClick={() => this.handleViewDetailDoctor(item)}>
                <EachDoctor
                  img={imageBase64}
                  name={nameVI}
                  specialty={item.Doctor_Infor.specialtyData.name}
                />
                ;
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);
