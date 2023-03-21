import actionTypes from './actionTypes';
import {getAllCodeService, CreateNewUserServiceAPI,
    EditUserServiceAPI, getAllUser,
    DeleteUserServiceAPI,
    getTopDoctorHomeServiceAPI,
    } from '../../services/userService';
import { toast } from 'react-toastify';
//start doing end

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = (dispatch, getState) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService("gender");
            // console.log("check getallcode gender: ", res);
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data));
            }else{
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error",e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = (dispatch, getState) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService("position");
            // console.log("check getallcode gender: ", res);
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionStart error",e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = (dispatch, getState) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService("role");
            // console.log("check getallcode gender: ", res);
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart error",e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await CreateNewUserServiceAPI(data);
            // console.log("check create user redux: ", res);
            if(res && res.errCode === 0){
                toast.success("Create a new user succeed ")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart())
            }else{
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed error",e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS

})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = (dispatch, getState) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllUser("ALL");
            // console.log("check topdoctor: ", res_topdoctor);
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }else{
                toast.error("fetchAllUser error ")
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("fetchAllUser error ")
            dispatch(fetchAllUsersFailed());
            console.log("fetchAllUsersStart error",e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteUserServiceAPI(userId);
            if(res && res.errCode === 0){
                toast.success("Delete the user succeed ")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart())
            }else{
                toast.error("Delete the user error ")
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error ")
            dispatch(deleteUserFailed());
            console.log("deleteUserFailed error",e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS

})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await EditUserServiceAPI(data);
            if(res && res.errCode === 0){
                toast.success("Update the user succeed ")
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart())
            }else{
                toast.error("Update the user error ")
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error ")
            dispatch(editUserFailed());
            console.log("editUserFailed error",e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS

})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

// let res_topdoctor = await getTopDoctorHomeServiceAPI(3);
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeServiceAPI('');
            console.log("check fetch top doctor: ", res);
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctor: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}