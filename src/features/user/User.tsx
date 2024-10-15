import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getUserData, updateUserPacer } from "./UserThunk";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: string;
  university: string;
  pacer_client_id: string;
  pacer_client_secret: string;
  pacer_user_id: string;
  pacer_code: string;
  pacer_access_token: string;
  pacer_refresh_token: string;
  total_activities: number;
  total_distance: number;
  loaded: boolean;
  age: number;
}

const userInitialState: User = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  birthday: "",
  university: "",
  pacer_client_id: "",
  pacer_client_secret: "",
  pacer_user_id: "",
  pacer_code: "",
  pacer_access_token: "",
  pacer_refresh_token: "",
  total_activities: 0,
  total_distance: 0,
  loaded: false,
  age: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    cleanPacerInfo: (state) => {
      state.pacer_access_token = "";
      state.pacer_client_id = "";
      state.pacer_client_secret = "";
      state.pacer_code = "";
      state.pacer_refresh_token = "";
      state.pacer_user_id = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserData.pending, (state, action) => {
      state.loaded = false;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      const fetchedUser = action.payload;
      var date1 = new Date(fetchedUser.birthday);
      var date2 = new Date();
      var diff = new Date(date2.getTime() - date1.getTime());

      fetchedUser.age = diff.getUTCFullYear() - 1970;

      fetchedUser.loaded = true;

      return fetchedUser;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loaded = false;
    });

    builder.addCase(updateUserPacer.pending, (state, action) => {
      state.loaded = false;
    });
    builder.addCase(updateUserPacer.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      updatedUser.loaded = true;
      return updatedUser;
    });
    builder.addCase(updateUserPacer.rejected, (state, action) => {
      state.loaded = false;
    });
  },
});

export const { cleanPacerInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
