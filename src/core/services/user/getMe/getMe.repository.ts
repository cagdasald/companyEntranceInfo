import { ThunkDispatch } from '@reduxjs/toolkit';
import { MeDto } from '../../../models/dtos/me.dto';
import { setMe } from '../../app/setMe/setMe.slice';
import axios from '../../axios';

export default async function getMeRequest(
  dispatch?: ThunkDispatch<any, any, any>
): Promise<MeDto> {
  const response = await axios.get<MeDto>(
    `${process.env.REACT_APP_BASE_URL}/user/me`
  );
  if (dispatch) {
    dispatch(setMe(response.data));
  }
  return response.data;
}
