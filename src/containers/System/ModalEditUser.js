import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Button, Modal ,ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import './UserManage.scss';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';


class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            roleId: '',
        }
    }

    componentDidMount() {
        //console.log("moutting modal");
        let user = this.props.currentUser; // check object rong hay ko >>> su dung lodash
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
                gender: user.gender,
                roleId: user.roleId,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromUserManage()
    }

    handleOnChangeInput = (event, id) => {
        //OPTION 1 >>> NOT RECOMMENDED
        /** b/c
         * this.state = {
         *  email: '',
         *  password: '',
         * }
         * JS
         * this.state.email === this.state['email']
         */
        // this.state[id] = event.target.value; //khong modify truc tiep
        // this.setState({
        //     ...this.state // ... >>> copy nguyen this.state = {}
        // }, () => {console.log("check ...this.state:", this.state)});

        // console.log(this.state[id]); //input value

        //OPTION 2
        let copyState = {...this.state}; //khong modify truc tiep thay the bang copyState
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber'];
        for(let i=0; i < arrInput.length; i++){

            //console.log("check inside loop:" + this.state[arrInput[i]]);

            if(!this.state[arrInput[i]]){
                isValid = false;    
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
            
        }
        return isValid;
    }

    handleSaveUser = () => {
        //validate phia client luon
        let isValid = this.checkValidateInput();
        if(isValid === true){
            //call api edit user
            this.props.EditUser(this.state);

            console.log("data modal edituser:", this.state);
        }
        //clear data modal create user
        // this.setState({
        //     email: '',
        //     password: '',
        //     firstName: '',
        //     lastName: '',
        //     address: '',
        //     phonenumber: '',
        //     gender: '',
        //     roleId: '',
        // })
    }

    render() {
        //console.log("check child props: ", this.props); //props >>> {isOpen: true}
        //console.log("check childs open modal isOpen", this.props.isOpen);
        return (
            <Modal isOpen={this.props.isOpen}
                    toggle={()=>{this.toggle()}}
                    className={'modal-user-container'}
                    //size="sm"
                    centered
            
            >
                <ModalHeader toggle={()=>{this.toggle()}} charCode="X">Edit user</ModalHeader>
                    <ModalBody>
                        
                    <div className="container">
                        <div className="row">
                        {/* <form action="/post-crud" method="POST"> */}
                            <div className="row">
                                <div className="form-group col-6">
                                    <label >Email</label>
                                    <input type="email" 
                                            className="form-control" 
                                            placeholder="Email" 
                                            name="email"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "email")
                                            }}
                                            value={this.state.email}
                                            disabled
                                    ></input>
                                </div>
                                <div className="form-group col-6">
                                    <label >Password</label>
                                    <input type="password"
                                            className="form-control" 
                                            placeholder="Password" 
                                            name="password"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "password")
                                            }}
                                            value={this.state.password}
                                            disabled
                                    ></input>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="form-group col-6">
                                    <label >First name</label>
                                    <input type="text"
                                            className="form-control"
                                            placeholder="First name"
                                            name="firstName"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "firstName")
                                            }}
                                            value={this.state.firstName}></input>
                                </div>
                                <div className="form-group col-6">
                                    <label >Last name</label>
                                    <input type="text"
                                            className="form-control"
                                            placeholder="Last name"
                                            name="lastName"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "lastName")
                                            }}
                                            value={this.state.lastName}></input>
                                </div>
                            </div>

                            <div className="form-group mt-4 col-12">
                                <label >Address</label>
                                <input type="text"
                                        className="form-control"
                                        name="address"
                                        onChange={(event) => {
                                            this.handleOnChangeInput(event, "address")
                                        }}
                                        value={this.state.address}></input>
                            </div>
                            <div className="row mt-4">
                                <div className="form-group col-6">
                                    <label >Phone number</label>
                                    <input type="text"
                                            className="form-control"
                                            name="phonenumber"
                                            placeholder="+84"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "phonenumber")
                                            }}
                                            value={this.state.phonenumber}></input>
                                </div>
                                <div className="form-group col-3">
                                    <label >Sex</label>
                                    <select name="gender"
                                            className="form-control"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "gender")
                                            }}
                                            value={this.state.gender}>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label >Role</label>
                                    <select name="roleId"
                                            className="form-control"
                                            onChange={(event) => {
                                                this.handleOnChangeInput(event, "roleId")
                                            }}
                                            value={this.state.roleId}>
                                    <option value="1">Admin</option>
                                    <option value="2">Doctor</option>
                                    <option value="3">Patient</option>
                                    </select>
                                </div>
                            </div>
                        {/* </form> */}
                        </div>
                    </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button className='px-2'
                                color="primary"
                                onClick={()=>{this.handleSaveUser()}}
                                >Save</Button>{' '}
                        <Button className='px-2' color="secondary" onClick={()=>{this.toggle()}}>Cancel</Button>
                    </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);