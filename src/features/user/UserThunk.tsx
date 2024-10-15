import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { User } from "./User";

interface UserPacerAttributes {
  pacerClientId: string;
  pacerClientSecret: string;
  pacerCode: string;
}

export const getUserData = createAsyncThunk<User>(
  "user/getUSerData",
  async () => {
    const userData = await api.get<User>("/user");
    return userData.data;
  }
);

export const updateUserPacer = createAsyncThunk<User, UserPacerAttributes>(
  "user/updateUserPacer",
  async (userPacerAttributes) => {
    const updatedData = await api.put("/user", {
      pacer_client_id: userPacerAttributes.pacerClientId,
      pacer_client_secret: userPacerAttributes.pacerClientSecret,
      pacer_code: userPacerAttributes.pacerCode,
    });
    return updatedData.data;
  }
);
