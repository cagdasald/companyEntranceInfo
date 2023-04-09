import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ErrorDto } from '../../../models/dtos/error.dto';
import { LocalStorage } from '../../../utilities/localStorage';
import { Errors } from '../../errors';
import getMeRequest from '../../user/getMe/getMe.repository';

type InitialState = {
  loading: boolean;
  data?: boolean;
  error?: ErrorDto;
};
const initialState: InitialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

export const checkToken = createAsyncThunk(
  'checkToken',
  async (_, { dispatch }) => {
    const token = LocalStorage.get(LocalStorage.token);
    if (token) {
      await getMeRequest(dispatch);
    }
  }
);

const checkTokenSlice = createSlice({
  name: 'checkToken',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkToken.pending, (state) => {
      state.loading = true;
      state.data = false;
      state.error = undefined;
    });
    builder.addCase(checkToken.fulfilled, (state) => {
      state.loading = false;
      state.data = true;
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      state.loading = false;
      state.error = Errors.getErrorDtoFromApiError(action.error);
    });
  },
});

export default checkTokenSlice.reducer;
