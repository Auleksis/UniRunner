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
}
