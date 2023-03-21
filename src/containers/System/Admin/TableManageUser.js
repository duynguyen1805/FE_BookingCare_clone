import { suppressDeprecationWarnings } from 'moment/moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import _ from 'lodash';
import * as actions from '../../../store/actions'

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchAllUsers();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(
            prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUser(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserfromParent(user)
    }

    render() {
        
        // console.log('check: ', this.props.listUsers);
        // console.log('check: ', this.props.usersRedux);
        let arrUsers = this.state.usersRedux;
        return (
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>    
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item,index) => {
                                return(
                                    <tr key = {index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                        <button className='btn-edit'
                                                onClick={() => {
                                                    this.handleEditUser(item)
                                                }}
                                            >
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                                onClick={() => {
                                                    this.handleDeleteUser(item)
                                                }}
                                            >
                                            <i className='fas fa-trash'></i>
                                        </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>       
                    </table>
                </div>
    )};

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUser: (userId) => dispatch(actions.deleteAUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
