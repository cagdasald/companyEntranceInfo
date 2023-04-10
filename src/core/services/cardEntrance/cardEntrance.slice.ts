import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorDto } from '../../models/dtos/error.dto';
import { CardEntranceDto } from '../../models/dtos/cardEntrance.dto';
import { Errors } from '../errors';
import cardEntranceRequest from './cardEntrance.repository';

type InitialState = {
  loading: boolean;
  data?: CardEntranceDto[];
  error?: ErrorDto;
};
const initialState: InitialState = {
  loading: false,
  data: undefined,
  error: undefined,
};


export const cardEntrance = createAsyncThunk(
  'cardEntrance',
  async (): Promise<CardEntranceDto[]> => {
    const card = await cardEntranceRequest();
    return card;
  }
);

const cardEntranceSlice = createSlice({
  name: 'cardEntrance',
  initialState,
  reducers: {
    cardEntranceReset: (state) => {
      state.loading = false;
      state.data = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cardEntrance.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(
      cardEntrance.fulfilled,
      (state, action: PayloadAction<CardEntranceDto[]>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(cardEntrance.rejected, (state, action) => {
      state.loading = false;
      state.error = Errors.getErrorDtoFromApiError(action.error);
    });
  },
});

export default cardEntranceSlice.reducer;
export const { cardEntranceReset } = cardEntranceSlice.actions;