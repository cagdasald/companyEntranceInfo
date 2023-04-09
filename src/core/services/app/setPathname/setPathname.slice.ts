import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  pathname: string;
};
const initialState: InitialState = {
  pathname: window.location.pathname,
};

const setPathnameSlice = createSlice({
  name: 'setPathname',
  initialState,
  reducers: {
    setPathname: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload;
    },
  },
});

export default setPathnameSlice.reducer;
export const { setPathname } = setPathnameSlice.actions;
