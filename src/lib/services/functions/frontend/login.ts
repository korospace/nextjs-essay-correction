// nextjs
import { signIn } from "next-auth/react";
// types
import { ApiResponse } from "@/lib/types/mainType";

export const HttpLogin = async (data: any, callbackUrl: string): Promise<ApiResponse> => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      username: data.username.value,
      password: data.password.value,
      callbackUrl: callbackUrl,
    });

    if (!res?.error) {
      return {
        status: true,
        message: "login success",
      };
    } else {
      return {
        status: false,
        message: res?.error,
      };
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    };
  }
};