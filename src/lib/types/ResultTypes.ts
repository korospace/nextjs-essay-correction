// nextjs
import { NextMiddleware } from "next/server";

export type PreProcessingType = {
  str: string;
  arr: string[];
};

export type ApiResponseType = {
  status: boolean;
  code?: number;
  message: string;
  totalPage?: number;
  totalRow?: number;
  data?: any;
};

export type MiddlewareFactoryType = (
  middleware: NextMiddleware
) => NextMiddleware;

export type UserType = {
  id_user: number;
  username: string;
  full_name: string;
  id_user_role: number;
};

export interface SessionType {
  user: {
    id_user: number;
    username: string;
    full_name: string;
    id_user_role: number;
  };
}

export type CourseType = {
  id_course: number;
  name: string;
  description: string;
};
