import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as actions from '../../../store/actions';

import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class Doctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            let arrDoctors = this.props.topDoctorsRedux;
            this.setState({
                arrDoctors: arrDoctors
            })
        }
    }


    render() {
        let arrDoctors = this.state.arrDoctors;
        let language = this.props.language;
        // console.log("check arrDoctors:", arrDoctors);
        // arrDoctors =arrDoctors.concat(arrDoctors).concat(arrDoctors)

        return (
            <div className='section-share section-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.out-standing-doctor"/></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more"/></button>
                    </div>
                    <div className='section-item'>
                        <Slider {...this.props.settings}>
                            {
                                arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVI = `${item.positionData.valueVI}, ${item.lastName}, ${item.firstName}`;
                                    let nameEN = `${item.positionData.valueEN}, ${item.lastName}, ${item.firstName}`;
                                    return(
                                        <div className='section-customize' key={index}>
                                            <div className='outer-bg'>
                                                <div className='bg-image section-doctor'
                                                    style={{backgroundImage: `url(${imageBase64})`}}
                                                >
                                                </div>
                                            </div>
                                            <div className='position text-center'>
                                                <div className='sub-title'>{language === LANGUAGES.VI ? nameVI : nameEN}</div>
                                                <div className='sub-title'>Cơ xương khớp</div>
                                            </div>
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
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
