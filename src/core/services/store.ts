import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkTokenReducer from './app/checkToken/checkToken.slice';
import setApiErrorReducer from './app/setApiError/setApiError.slice';
import setAppMountedReducer from './app/setAppMounted/setAppMounted.slice';
import setMeReducer from './app/setMe/setMe.slice';
import setPathnameReducer from './app/setPathname/setPathname.slice';
import loginReducer from './auth/login/login.slice';
import setRemoteConfigReducer from './firebase/setRemoteConfig/setRemoteConfig.slice';
import getMeReducer from './user/getMe/getMe.slice';

const appReducer = combineReducers({
  checkToken: checkTokenReducer,
  setApiError: setApiErrorReducer,
  setAppMounted: setAppMountedReducer,
  setMe: setMeReducer,
  setPathname: setPathnameReducer,
});

const authReducer = combineReducers({
  login: loginReducer,
});

const firebaseReducer = combineReducers({
  setRemoteConfig: setRemoteConfigReducer,
});

const userReducer = combineReducers({
  getMe: getMeReducer,
});

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
