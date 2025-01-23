import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;