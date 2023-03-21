import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailHeader.scss'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
            <div className='detail-header-container'>
                <div className='detail-header-content'>
                    <div className='left-content'>
                        <i class="fas fa-arrow-left"></i>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b>Chuyên Khoa</b></div>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
