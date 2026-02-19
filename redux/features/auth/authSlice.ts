import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/types";

export interface AuthState {
  role: string | null;
  token: string | null;
  userInfo: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  role: null,
  token: null,
  userInfo: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.role = null;
      state.token = null;
      state.userInfo = null;
      state.isAuthenticated = false;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      if (action.payload.role) {
        state.role =
          typeof action.payload.role === "string"
            ? action.payload.role
            : action.payload.role.name;
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { logout, setRole, setToken, setUserData, setIsAuthenticated } =
  authSlice.actions;

export default authSlice.reducer;
