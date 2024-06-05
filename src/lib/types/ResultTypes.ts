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

export type ExamType = {
  id_exam: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  duration: number;
  course: CourseType;
  exam_member?: ExamMemberType[];
  exam_question?: ExamQuestionType[];
};

export type ExamMemberType = {
  id_exam_member: number;
  id_exam: number;
  id_user: number;
  start_date?: string;
  end_date?: string;
  status?: string;
  user: UserType;
};

export type ExamQuestionType = {
  id_exam_question?: number;
  id_exam: number;
  question: string;
  answer_key: string;
};

export type ExamAnswerType = {
  id_exam_answer: number;
  id_exam_question: number;
  id_user: number;
  answer: string;
};
