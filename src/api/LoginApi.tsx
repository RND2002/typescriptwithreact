
import { ILoginData, ILoginResponse } from "../utils/types";
import { apiClient } from "./apiclient";



export const executeLoginService = async (
  loginData: ILoginData
): Promise<ILoginResponse | null> => {
  try {
    const response = await apiClient.post<ILoginResponse>("/auth/login", loginData);
    return response.data; // Return parsed response
  } catch (error) {
    console.error("Login failed:", error);
    return null; // Handle errors gracefully
  }
};
