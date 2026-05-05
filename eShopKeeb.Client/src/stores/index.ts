import { configureStore } from '@reduxjs/toolkit';

import loadingReducer from '@/stores/loading/loadingSlice';
import userReducer from '@/stores/user/userSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
