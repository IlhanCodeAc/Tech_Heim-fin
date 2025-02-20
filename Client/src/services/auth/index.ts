import axiosInstance from "../axiosInstance";
import {
  RegisterRequestPayloadType,
  AuthResponseType,
  LoginRequestPayloadType,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "./types";

const login = async (payload: LoginRequestPayloadType) => {
  return await axiosInstance.post<AuthResponseType>("/auth/login", payload);
};

const register = async (payload: RegisterRequestPayloadType) => {
  return await axiosInstance.post<AuthResponseType>("/auth/register", payload);
};

const logout = async () => {
  return await axiosInstance.post("/auth/logout");
};

const getCurrentUser = async () => {
  return await axiosInstance.get("/auth/current-user");
};

const forgotPassword = async (payload: ForgotPasswordPayload) => {
  return await axiosInstance.post("/auth/forgot-password", payload);
};


const resetPassword = async (payload: ResetPasswordPayload) => {
  return await axiosInstance.post(`/auth/reset-password/${payload.token}`, {
    password: payload.password,
    token:payload.token
  });
};
const authService = { login, register, getCurrentUser, logout, forgotPassword, resetPassword };

export default authService;
