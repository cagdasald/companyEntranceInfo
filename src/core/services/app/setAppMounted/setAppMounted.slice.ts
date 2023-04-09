import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isMounted: boolean;
};
const initialState: InitialState = {
  isMounted: false,
};

const setAppMountedSlice = createSlice({
  name: 'setAppMounted',
  initialState,
  reducers: {
    setAppMounted: (state, action: PayloadAction<boolean>) => {
      state.isMounted = action.payload;
    },
  },
});

export default setAppMountedSlice.reducer;
export const { setAppMounted } = setAppMountedSlice.actions;
