import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import keycloak from "../Keycloak";
import { User } from "../models/User";

const API_URL = "/api/v1";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8081" + API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (keycloak.authenticated) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }

  return config;
});

export async function getUsers(
  skip: number,
  limit: number
): Promise<Array<User>> {
  let config = {
    params: {
      skip: skip,
      limit: limit,
    },
  } as AxiosRequestConfig<any>;
  const users = await api.get("users/list", config);

  if (users.status == 200) {
    return users.data;
  }

  return [];
}

export async function getUserData(): Promise<User> {
  return api.get("/user");
}

export async function updatePaserInfo(
  pacerClientId: string,
  pacerClientSecret: string,
  pacerCode: string
): Promise<any> {
  return api.put("/user", {
    pacer_client_id: pacerClientId,
    pacer_client_secret: pacerClientSecret,
    pacer_code: pacerCode,
  });
}

export default api;
