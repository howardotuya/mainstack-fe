import { apiClient } from "./apiClient";

export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
}

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>("/user");
  return response.data;
};
