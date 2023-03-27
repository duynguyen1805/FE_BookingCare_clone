import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Doctor from './Section/Doctor';
import './HomePage.scss';

//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          };

        return (
            <div>
                <HomeHeader isShowBanner={true}/>
                <Specialty settings = {settings}/>
                <Doctor settings = {settings}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
