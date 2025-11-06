import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import rfpReducer from '../features/rfp/rfpSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rfp: rfpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
