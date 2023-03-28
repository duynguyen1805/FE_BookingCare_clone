import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';


class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
        }
    }

    async componentDidMount() {
        let {language} = this.props;
        // console.log("moment vi: ",moment(new Date()).format('dddd - DD/MM'));
        // console.log("moment en: ",moment(new Date()).locale('en').format('ddd - DD/MM'));
        let allDays = this.getArrDays(language);
            this.setState({
                allDays: allDays,
            })
    }

    uppercaseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0 ; i < 7 ; i++){
            let object = {};
            if(language === LANGUAGES.VI) {
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today
                }else{
                    let lableVI = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.uppercaseFirstLetter(lableVI)
                }
            }else {
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today
                }else{
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (event) => {
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            if(res && res.errCode === 0){
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }

            console.log("check res schedule from react: ", res);
        }
    }


    render() {
        let {allDays, allAvalableTime} = this.state;
        let {language} = this.props;
        
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 && 
                            allDays.map((item, index) => {
                                return (
                                    <option 
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })    
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className='fas fa-calendar-alt'>
                            <span>
                                <FormattedMessage id='patient.detail-doctor.schedule'/>
                            </span>
                        </i>
                    </div>
                    <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?
                        allAvalableTime.map((item,index) => {
                            let timeDisplay = language ===LANGUAGES.VI ? item.timeTypeData.valueVI : item.timeTypeData.valueEN
                            return (
                                <button key={index}
                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                >{timeDisplay}</button>
                            )
                        })
                        : <div className='no-schedule'>
                                <FormattedMessage id='patient.detail-doctor.no-schedule'/>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);