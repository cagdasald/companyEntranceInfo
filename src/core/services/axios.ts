import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { LocalStorage } from '../utilities/localStorage';
import { setApiError } from './app/setApiError/setApiError.slice';
import { setMe } from './app/setMe/setMe.slice';
import { Errors } from './errors';

let dispatch: ThunkDispatch<unknown, unknown, AnyAction>;

axios.interceptors.request.use((request) => {
  const token = LocalStorage.get(LocalStorage.token);
  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export function setResponseInterceptor(
  appDispatch: ThunkDispatch<unknown, unknown, AnyAction>
) {
  dispatch = appDispatch;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (Errors.isAuthError(error)) {
        dispatch(setMe());
      } else {
        dispatch(setApiError(Errors.getErrorDtoFromApiError(error)));
      }
      return Promise.reject(error);
    }
  );
}

export default axios;
