import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    // whitelist: ['isLoggedIn', 'adminInfo']
    whitelist: ['isLoggedIn', 'userInfo']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    // whitelist: ['isLoggedIn', 'adminInfo']
    whitelist: ['language']
}

const adminPersistConfig = {
    ...persistCommonConfig,
    key: 'admin',
    // whitelist: ['isLoggedIn', 'adminInfo']
    whitelist: ['language']
}

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    // admin: persistReducer(adminPersistConfig, adminReducer)
    admin: adminReducer
})