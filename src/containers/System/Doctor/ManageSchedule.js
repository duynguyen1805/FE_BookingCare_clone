import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import {toast} from 'react-toastify';
import _ from 'lodash';
import {saveBulkScheduleDoctorServiceAPI} from '../../../services/userService'


class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            // console.log("data select ",dataSelect);
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            //gan item isSelected = false
            if(data && data.length > 0){
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({...item, isSelected: false}))
            }

            this.setState({
                rangeTime: data
            })
        }

        // if(prevProps.language !== this.props.language){
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
        //     // console.log("data select ",dataSelect);
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language }  = this.props;
        // console.log("inputdata build.. : ",inputData);
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                let lableVI = `${item.lastName} ${item.firstName}`
                let lableEN = `${item.firstName} ${item.lastName}`
                // let lableVI = item.lastName + " " + item.firstName
                // let lableEN = item.firstName + " " + item.lastName

                object.label = language === LANGUAGES.VI ? lableVI : lableEN;
                object.value = item.id;
                result.push(object)
            })
        }
        // console.log(" result: ", result);
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });

      };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        // console.log(time);
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })

            this.setState({
                rangeTime: rangeTime
            })
        }

    }

    handleSaveSchedule = async () => {

        let {rangeTime, selectedDoctor, currentDate} = this.state;

        let result = [];
    
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Invalid selected Doctor !")
            return;
        }
        if(!currentDate){
            toast.error("Invalid date ! ")
            return;
        }
        // >>> DD/MM/YYYY
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

        let formatedDate = new Date(currentDate).getTime();

        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map((schedule, index) => {
                    // console.log("check schedule: ", schedule, index);
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    // object.maxNumber = 10;

                    result.push(object)
                })    
            }else{
                toast.error("Invalid selected Time !");
                return;
            } 
        }

        let res = await saveBulkScheduleDoctorServiceAPI({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })

        if(res && res.errCode === 0){
            toast.success("Save Schedule success !")
        }else{
            toast.error("Error saveBulkScheduleDoctorServiceAPI => res: ",res)
        }
        // console.log("check res:saveBulkScheduleDoctorServiceAPI ", res);
        // console.log("check result: ", result);
    }

    render() {
        // console.log('check state: ', this.state.rangeTime);
        // console.log('check props: ', this.props);

        let {rangeTime} = this.state;
        let {language} = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

        return (
            <div className='manage-schedule-container'>
                <div className='m-s title'>
                    <FormattedMessage id='manage-schedule.title'/>
                </div>
                <div className='container mt-4'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor'/></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date'/></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate[0]}
                                minDate = {yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && 
                            rangeTime.map((item,index) => {
                                return (
                                    <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                        key={index}
                                        onClick={() => this.handleClickBtnTime(item)}
                                    >
                                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                    </button>
                                )
                            })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule mt-4'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id='manage-schedule.save-plan'/></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
