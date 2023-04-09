import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorDto } from '../../../models/dtos/error.dto';
import { LoginDto } from '../../../models/dtos/login.dto';
import { LoginRequest } from '../../../models/requests/login.request';
import Helpers from '../../../utilities/helpers';
import { setMe } from '../../app/setMe/setMe.slice';
import { Errors } from '../../errors';

type InitialState = {
  loading: boolean;
  data?: LoginDto;
  error?: ErrorDto;
};
const initialState: InitialState = {
  loading: false,
  data: undefined,
  error: undefined,
};

export const login = createAsyncThunk(
  'login',
  async (request: LoginRequest, { dispatch }) => {
    // TODO Activate login logic
    // const response = await loginRequest(request);
    // LocalStorage.set(LocalStorage.token, response.token);
    // await getMeRequest(dispatch);
    // return response;
    await Helpers.wait(1000);
    dispatch(setMe({ email: request.email }));
    return { token: request.email };
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginReset: (state) => {
      state.loading = false;
      state.data = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginDto>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = Errors.getErrorDtoFromApiError(action.error);
    });
  },
});

export default loginSlice.reducer;
export const { loginReset } = loginSlice.actions;
