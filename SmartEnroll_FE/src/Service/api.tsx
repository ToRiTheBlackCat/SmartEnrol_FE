import { useState } from "react";
import axios, { AxiosError } from "axios";
import axiosInstance from "../Hooks/axiosInstance";
import { User, University } from "./type";

const API_URL = "https://smartenrol2.azurewebsites.net/api";

export const useAuth = () => {
  const [User, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loginAPI = async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await axiosInstance.post<User>(
        `${API_URL}/account/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" },
          // withCredentials: true
      }
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
      const response = await axiosInstance.post(
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
    const response = await axiosInstance.post(`${API_URL}/Account/google-login`,
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
    const response = await axiosInstance.get(`${API_URL}/Account/${userId}`)
    return response.data;
  }catch(error){
    console.error("Get data fail", error);
    throw error;
  }
}

export const updateProfileAPI = async (accountId: string, accountName: string, email: string, area: string, areaId: number, token: string) => {
  try {
    console.log('Sending update profile request:', { accountId, accountName, email, areaId, area });
    console.log('Token:', token);

    const response = await axiosInstance.patch(
      `${API_URL}/Account/update-profile`,
      {
        accountId,
        accountName,
        email,
        areaId,
        area,
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

export const fetchVietnamUniversities = async (): Promise<University[]> => {
  try {
    const response = await axios.get<University[]>(
      "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json"
    );

    // Lọc các trường đại học ở Việt Nam
    const vietnamUniversities = response.data.filter(
      (uni) => uni.country === "Viet Nam"
    );

    return vietnamUniversities;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách trường đại học:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};
export const getSessionID = async () =>{
  try{
    const response = await axiosInstance.get(`${API_URL}/Chat`)
    return response.data.sessionID;
  }catch(error : any){
    console.log(error);
  }
};
export const deleteSessionID = async(sessionId : string) =>{
  try{
    console.log("session",sessionId)
    const response = await axios.delete(`${API_URL}/Chat?sessionID=${sessionId}`);
    localStorage.removeItem('chatSessionID');
    return response
  }catch(error : any){
    console.log(error);
    throw error;
  }
}


