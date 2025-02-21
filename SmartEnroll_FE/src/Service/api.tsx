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

      console.log('Login API Response:', response.data);

      if (!response.data.token || !response.data.accountId) {
        console.error('Missing token or accountId in response');
        return null;
      }

      const userData: User = {
        token: response.data.token,
        accountId: response.data.accountId,
        accountName: response.data.accountName || email.split('@')[0],
        email: response.data.email || email
      };

      setUser(userData);
      return userData;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      console.error('Login API Error:', axiosError.response?.data);
      setError(axiosError.response?.data?.message || "Login failed");
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

export const viewUserInfo = async (userId: string) =>{
  try{
    const response = await axios.get(`${API_URL}/Account/${userId}`)
    return response.data;
  }catch(error){
    console.error("Get data fail", error);
    throw error;
  }
}

export const updateProfileAPI = async (accountId: string, accountName: string, email: string, token: string) => {
  try {
    console.log('Sending update profile request:', { accountId, accountName, email });
    console.log('Token:', token);

    const response = await axios.patch(
      `${API_URL}/Account/update-profile`,
      {
        accountId,
        accountName,
        email
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    console.log('Update profile response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error("Update profile error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      throw new Error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
    }
    throw new Error(error.response?.data?.message || "Cập nhật thông tin thất bại");
  }
};


