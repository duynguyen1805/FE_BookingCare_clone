import { suppressDeprecationWarnings } from 'moment/moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import _ from 'lodash';
import * as actions from '../../../store/actions';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';

//MARKDOWN
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService'

// const options = [  >>>> BUILDDATASELECT
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save doctor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            nameClinic: "",
            addressClinic: "",
            note: ""

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.getAllRequiredDoctorInfor()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
            // console.log("data select ",dataSelect);
            this.setState({
                listDoctors: dataSelect
            })
        }
        
        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            // let dataSelectPayment = this.buildDataInputSelect(resPayment);
            // let dataSelectProvince = this.buildDataInputSelect(resProvince);

            this.setState({
                listPrice: dataSelectPrice,
                // listPayment: dataSelectPayment,
                // listProvince: dataSelectProvince,
            })
        }

        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
            let {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
            })
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language }  = this.props;
        // console.log("inputdata build.. : ",inputData);
        if(inputData && inputData.length > 0){
            if(type === 'USERS'){
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
            if(type === 'PRICE'){
                inputData.map((item, index) => {
                    let object = {};
                    let lableVI = `${item.valueVI}`
                    let lableEN = `${item.valueEN} USD`
    
                    object.label = language === LANGUAGES.EN ? lableEN : lableVI;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            
        }
        // console.log(" result: ", result);
        return result;
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        // console.log("check state save content: ", this.state);



        let {hasOldData} = this.state
        this.props.saveDetailInforDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: "PAY1",
            selectedProvince: "PRO4",
            nameClinic: "Bệnh viện A",
            addressClinic: "123, đường ABC, quận Ninh Kiều, thành phố Cần Thơ",
            note: this.state.note
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let {listPrice} = this.state

        let res = await getDetailInforDoctor(selectedOption.value)
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let Markdown = res.data.Markdown;

            let priceId ='', paymentId='', provinceId='', nameClinic='', addressClinic='', note='', selectedPrice=''

            if(res.data.Doctor_Infor){
                // paymentId= res.data.Doctor_Infor.paymentId;
                // provinceId = res.data.Doctor_Infor.provinceId;
                nameClinic =res.data.Doctor_Infor.nameClinic;
                addressClinic = res.data.Doctor_Infor.addressClinic;
                note = res.data.Doctor_Infor.note;

                priceId = res.data.Doctor_Infor.priceId;

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
            }



            this.setState({
                contentHTML: Markdown.contentHTML,
                contentMarkdown: Markdown.contentMarkdown,
                description: Markdown.description,
                hasOldData:true,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedPrice: selectedPrice
            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                nameClinic:'',
                addressClinic: '',
                note: '',
                selectedPrice: ''
            })
        }
        // console.log(`Option selected:`, this.state.selectedOption)
        // console.log("check getDetailInfo: ", res);
      };

      handleChangeSelectPrice = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })
        console.log("check new select on change: ",selectedOption, stateName)
      }

    
    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    render() {
        // console.log("state manage doctor: ", this.state);

        let {hasOldData} = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title mb-4'>
                    <FormattedMessage id="admin.manage-doctor.title"/>
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor"/></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor"/>}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.intro"/></label>
                        <textarea className='form-control' rows="5"
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value = {this.state.description}
                        >
                        
                        </textarea>
                    </div>    
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price"/></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectPrice}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}
                            name="selectedPrice"
                        />
                    </div>
                    {/* <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={"Chọn phương thức thanh toán"}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={"Chọn tỉnh thành"}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên bệnh viện</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ bệnh viện</label>
                        <input className='form-control' />
                    </div> */}
                    <div className='col-8 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                        <input className='form-control' 
                            onChange={(event) => this.handleOnChangeText(event, "note")}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown}
                    />
                </div>
                <button className={hasOldData === true ? 'save-content-doctor' : "create-content-doctor"}
                onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ? 
                        <span><FormattedMessage id="admin.manage-doctor.save"/></span> : <span><FormattedMessage id="admin.manage-doctor.add"/></span>
                    }
                </button>
            </div>
                
    )};

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailInforDoctor: (data) => dispatch(actions.saveDetailInforDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
