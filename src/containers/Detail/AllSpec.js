import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import EachSpec from "./EachSpec";
import * as actions from "../../store/actions";
import { getAllSpecialtyServiceAPI } from "../../services/userService";

class AllSpec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialtyServiceAPI();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  render() {
    let { dataSpecialty } = this.state;

    return (
      <div>
        <HomeHeader isShowBanner={false} />
        {dataSpecialty &&
          dataSpecialty.length > 0 &&
          dataSpecialty.map((item, index) => {
            return (
              <div onClick={() => this.handleViewDetailSpecialty(item)}>
                <EachSpec img={item.image} name={item.name} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(AllSpec);
