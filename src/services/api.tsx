import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import keycloak from "../Keycloak";
import { User } from "../features/user/User";
import { University } from "../models/University";

const oldAPI =
  import.meta.env.VITE_REACT_APP_API_ENDPOINT +
  import.meta.env.VITE_REACT_APP_API_URL;
const newAPI =
  import.meta.env.VITE_REACT_APP_API_NEW_ENDPOINT +
  import.meta.env.VITE_REACT_APP_API_URL;

const api: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_API_NEW_ENDPOINT +
    import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (keycloak.authenticated) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
  }
);

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
  const users = await api.get<Array<User>>("/users/list", config);
  return users.data;
}

export async function getUserData(): Promise<User> {
  const userData = await api.get<User>("/user");
  return userData.data;
}

export async function updatePaserInfo(
  pacerClientId: string,
  pacerClientSecret: string,
  pacerCode: string
): Promise<any> {
  const updatedData = await api.put("/user", {
    pacer_client_id: pacerClientId,
    pacer_client_secret: pacerClientSecret,
    pacer_code: pacerCode,
  });
  return updatedData.data;
}

export async function getUniversities(
  skip: number,
  limit: number,
  orderBy: string = "distance_asc"
): Promise<Array<University>> {
  let config = {
    params: {
      skip: skip,
      limit: limit,
      order_by: orderBy,
    },
  } as AxiosRequestConfig<any>;

  const universities = await api.get("/universities", config);

  return universities.data;
}

export async function getActivities(): Promise<Array<any>> {
  const activities = await api.get("/activities");

  return activities.data;
}

export default api;
