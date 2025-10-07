import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  session_id: string | null;
  credits: number | null;
  credits_used: number | null;
  credits_remaining: number | null;
};

const initialState: InitialState = {
  id: null,
  name: null,
  email: null,
  role: localStorage.getItem('role') || null,
  session_id: null,
  credits: null,
  credits_used: null,
  credits_remaining: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<InitialState>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.session_id = action.payload.session_id;
      state.credits = action.payload.credits;
      state.credits_used = action.payload.credits_used;
      state.credits_remaining = action.payload.credits_remaining;

      localStorage.setItem('role', 'user'); // remove later
    },
    resetUser(state) {
      state.id = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.session_id = null;
      state.credits = null;
      state.credits_used = null;
      state.credits_remaining = null;

      localStorage.removeItem('role'); // remove later
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
