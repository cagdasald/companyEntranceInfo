import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorDto } from '../../../models/dtos/error.dto';
import { MeDto } from '../../../models/dtos/me.dto';
import { Errors } from '../../errors';
import getMeRequest from './getMe.repository';

type InitialState = {
  loading: boolean;
  data?: MeDto;
  error?: ErrorDto;
};
const initialState: InitialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

export const getMe = createAsyncThunk('getMe', (_, { dispatch }) => {
  return getMeRequest(dispatch);
});

const getMeSlice = createSlice({
  name: 'getMe',
  initialState,
  reducers: {
    getMeReset: (state) => {
      state.loading = false;
      state.data = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(getMe.fulfilled, (state, action: PayloadAction<MeDto>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.loading = false;
      state.error = Errors.getErrorDtoFromApiError(action.error);
    });
  },
});

export default getMeSlice.reducer;
export const { getMeReset } = getMeSlice.actions;
