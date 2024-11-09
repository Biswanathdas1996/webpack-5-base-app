import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  loading: boolean;
  data: any[];
  error: string | null;
}

const initialState: UsersState = {
  loading: false,
  data: [],
  error: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const { getUsers, getUsersSuccess, getUsersFailure } = slice.actions;
export default slice.reducer;
