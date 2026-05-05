import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "./userInfo";

interface UserState {
  user: UserInfo | null;
  roles: string[];
}

const initialState: UserState = {
  user: null,
  roles: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
    setRoles(state, action: PayloadAction<string[]>) {
      state.roles = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.roles = [];
    },
  },
});

export const { setUser, clearUser, setRoles } = userSlice.actions;
export default userSlice.reducer;