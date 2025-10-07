import { configureStore } from '@reduxjs/toolkit';
import jsReducer from '../features/jd/jdSlice';
import matchReducer from '../features/match/matchSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    jd: jsReducer,
    match: matchReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
