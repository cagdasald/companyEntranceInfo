import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeDto } from '../../../models/dtos/me.dto';
import { LocalStorage } from '../../../utilities/localStorage';

type InitialState = {
  me?: MeDto;
};
const initialState: InitialState = {
  me: undefined,
};

const setMeSlice = createSlice({
  name: 'setMe',
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<MeDto | undefined>) => {
      state.me = action.payload;
      if (!action.payload) {
        LocalStorage.remove(LocalStorage.token);
      }
    },
  },
});

export default setMeSlice.reducer;
export const { setMe } = setMeSlice.actions;
