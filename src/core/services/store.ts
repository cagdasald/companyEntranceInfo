import { combineReducers, configureStore } from '@reduxjs/toolkit';
import setApiErrorReducer from './app/setApiError/setApiError.slice';
import setAppMountedReducer from './app/setAppMounted/setAppMounted.slice';
import setMeReducer from './app/setMe/setMe.slice';
import setPathnameReducer from './app/setPathname/setPathname.slice';
import setRemoteConfigReducer from './firebase/setRemoteConfig/setRemoteConfig.slice';
import  cardEntranceReducer  from './cardEntrance/cardEntrance.slice';

const appReducer = combineReducers({
  setApiError: setApiErrorReducer,
  setAppMounted: setAppMountedReducer,
  setMe: setMeReducer,
  setPathname: setPathnameReducer,
});

const firebaseReducer = combineReducers({
  setRemoteConfig: setRemoteConfigReducer,
});

const cardReducer = combineReducers({
  cardEntrance: cardEntranceReducer,
});

const store = configureStore({
  reducer: {
    app: appReducer,
    firebase: firebaseReducer,
    cardEntrance: cardReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
