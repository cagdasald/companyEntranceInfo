import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorDto } from '../../../models/dtos/error.dto';

type InitialState = {
  error?: ErrorDto;
};
const initialState: InitialState = {
  error: undefined,
};

const setApiErrorSlice = createSlice({
  name: 'setApiError',
  initialState,
  reducers: {
    setApiError: (state, action: PayloadAction<ErrorDto | undefined>) => {
      state.error = action.payload;
    },
  },
});

export default setApiErrorSlice.reducer;
export const { setApiError } = setApiErrorSlice.actions;
