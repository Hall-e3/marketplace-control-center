import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  loading: boolean;
}

const initialState: AppState = {
  sidebarOpen: true,
  theme: "system",
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<AppState["theme"]>) => {
      state.theme = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setTheme, setLoading } =
  appSlice.actions;
export default appSlice.reducer;
