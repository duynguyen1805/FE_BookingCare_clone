import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Slider from 'react-slick';

class Specialty extends Component {


    render() {

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-item'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image'></div>
                                <div className='sub-title'>Specialy item 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image'></div>
                                <div className='sub-title'>Specialy item 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image'></div>
                                <div className='sub-title'>Specialy item 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image'></div>
                                <div className='sub-title'>Specialy item 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image'></div>
                                <div className='sub-title'>Specialy item 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image'></div>
                                <div className='sub-title'>Specialy item 6</div>
                            </div>
                        </Slider>
                    </div>
                    
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
