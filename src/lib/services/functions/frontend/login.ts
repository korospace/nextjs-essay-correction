import { ApiResponse } from "@/lib/types/mainType";
import { signIn } from "next-auth/react";

export const HttpLogin = async (data: HTMLFormElement, callbackUrl: string): Promise<ApiResponse> => {
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