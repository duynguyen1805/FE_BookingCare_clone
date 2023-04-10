import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./eachSpec.scss";

class EachSpec extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <>
        <div className="container col-10 container-spec">
          <div className="row">
            <div className="content-left col-2">
              <div
                className="icon-spec"
                style={{ backgroundImage: `url(${this.props.img})` }}
              ></div>
            </div>
            <div className="content-right col-10">{this.props.name}</div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EachSpec);
