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
  loading: boolean;
  age: number;
  show_pacer_connection: boolean;
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
  loading: false,
  age: 0,
  show_pacer_connection: false,
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
    openPacerConnection: (state) => {
      state.show_pacer_connection = true;
    },
    closePacerConnection: (state) => {
      state.show_pacer_connection = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserData.pending, (state, action) => {
      state.loaded = false;
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      const fetchedUser = action.payload;
      var date1 = new Date(fetchedUser.birthday);
      var date2 = new Date();
      var diff = new Date(date2.getTime() - date1.getTime());

      fetchedUser.age = diff.getUTCFullYear() - 1970;

      fetchedUser.loaded = true;
      fetchedUser.loading = false;

      return fetchedUser;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loaded = false;
      state.loading = false;
    });

    builder.addCase(updateUserPacer.pending, (state, action) => {
      state.loaded = false;
      state.loading = true;
    });
    builder.addCase(updateUserPacer.fulfilled, (state, action) => {
      state.loaded = true;
      state.loading = false;
    });
    builder.addCase(updateUserPacer.rejected, (state, action) => {
      state.loaded = false;
      state.loading = false;
    });
  },
});

export const { cleanPacerInfo, openPacerConnection, closePacerConnection } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
