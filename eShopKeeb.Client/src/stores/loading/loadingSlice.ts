import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type LoadingState = {
  isLoading: boolean;
  message?: string;
};

const initialState: LoadingState = {
  isLoading: false,
  message: undefined,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = true;
      state.message = action.payload;
    },
    hideLoading: (state) => {
      state.isLoading = false;
      state.message = undefined;
    },
  },
});

const { reducer, actions } = loadingSlice;

export const { showLoading, hideLoading } = actions;

export const selectLoading = (state: { loading: LoadingState }) => state.loading;
export default reducer;

