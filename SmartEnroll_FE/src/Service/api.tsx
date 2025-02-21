import { useState } from "react";
import axios, { AxiosError } from "axios";
import { User } from "./type";

const API_URL = "https://smartenrol.azurewebsites.net/api";

export const useAuth = () => {
  const [User, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loginAPI = async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await axios.post<User>(
        `${API_URL}/account/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setUser(response.data);
      return response.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "Login failed"); // Lấy lỗi từ API
      return null;
    }
  };

  const signupAPI = async (accountName: string, email: string, password: string): Promise<{ result: string, submitData: any } | null> => {
    try {
      const response = await axios.post(
        `${API_URL}/account/signup`,
        { 
          accountName,
          email,
          password,
          confirmPassword: password
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "Đăng ký thất bại");
      return null;
    }
  };

  return { loginAPI, signupAPI, User, error };
};

export const googleLoginAPI = async (email: string, name: string) =>{
  try{
    const response = await axios.post(`${API_URL}/Account/google-login`,
      {email, name}
    )
    return response.data;
  }catch(error){
    console.error("Google login API failed", error);
    throw error;
  }
}


