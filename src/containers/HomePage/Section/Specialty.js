import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import "./Specialty.scss"
import Slider from 'react-slick';
import {getAllSpecialtyServiceAPI} from '../../../services/userService'
import { withRouter } from 'react-router';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyServiceAPI();
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if(this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }


    render() {

        let {dataSpecialty} = this.state

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-item'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 
                                && dataSpecialty.map((item,index) => {
                                    return (
                                        <div className='section-customize' 
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div className='outer-bg'>
                                                <div className='bg-image-spec section-spec'
                                                    style={{ backgroundImage: `url(${item.image})`}}
                                                ></div>
                                            </div>
                                            
                                            <div className='sub-title-spec'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                            
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
