import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  loading: boolean;
  data?: boolean;
};
const initialState: InitialState = {
  loading: false,
  data: undefined,
};

export const setRemoteConfig = createAsyncThunk('setRemoteConfig', () => {
  // TODO Active or delete firebase
  // const firebaseService = new FirebaseService();
  // return firebaseService.fetchAndActivateRemoteConfig();
});

const setRemoteConfigSlice = createSlice({
  name: 'setRemoteConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setRemoteConfig.pending, (state) => {
      state.loading = true;
      state.data = undefined;
    });
    builder.addCase(setRemoteConfig.fulfilled, (state) => {
      state.loading = false;
      state.data = true;
    });
    builder.addCase(setRemoteConfig.rejected, (state) => {
      state.loading = false;
      state.data = false;
    });
  },
});

export default setRemoteConfigSlice.reducer;
