import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: [],
    isLoadingGender: false,
    users: [],
    topDoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGender = true;
            // console.log('check fire fetch gender start: ',action);
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // let copyState = {...state};
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            // let copyState = {...state};
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            // let copyState = {...state};
            
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            // let copyState = {...state};
            
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            // let copyState = {...state};
            
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            // let copyState = {...state};
            
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctor;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;