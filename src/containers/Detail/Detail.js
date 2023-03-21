import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailHeader from './DetailHeader';
// import HomeHeader from './HomeHeader';

class Detail extends Component {

    render() {
        return (
            <div>
                <DetailHeader/>
                Detail Here
                </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
