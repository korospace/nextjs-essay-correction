// nextjs
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
// auth
import authOptions from "../../auth/[...nextauth]/authOptions";
// helpers
import { ResponseFormating } from "@/lib/helpers/helpers";
// validation request
import {
  ExamQuestionInputValidation,
  ExamQuestionUpdateValidation,
} from "@/lib/validation/request";
// types
import { SessionType } from "@/lib/types/ResultTypes";
import { ExamQuestionSearchParamType } from "@/lib/types/InputTypes";
// services
import {
  CreateExamQuestion,
  GetExamQuestion,
  UpdateExamQuestion,
  DeleteExamQuestion,
} from "@/lib/services/mysql/examQuestion";

/**
 * Get Exam Question
 * -------------------------
 */
export async function GET(request: NextRequest) {
  // session
  const session = (await getServerSession(authOptions)) as SessionType;

  // url params
  const { searchParams } = new URL(request.url);
  const examSearch: ExamQuestionSearchParamType = {
    page: searchParams.get("page") ?? "",
    limit: searchParams.get("limit") ?? "",
    keyword: searchParams.get("keyword") ?? "",
    id_exam: searchParams.get("id_exam") ?? "",
  };

  // logic
  const res = await GetExamQuestion(examSearch, session);

  // response api
  const data = {
    totalRow: res.totalRow,
    totalPage: res.totalPage,
    data: res.data,
  };
  return ResponseFormating.json(res.message, res.code, data);
}

/**
 * Create Exam Question
 * -------------------------
 */
export async function POST(request: NextRequest) {
  // session
  const session = (await getServerSession(authOptions)) as SessionType;

  // json
  const req = await request.json();

  // validation
  const validationResult = ExamQuestionInputValidation.safeParse(req);

  if (!validationResult.success) {
    return ResponseFormating.json(
      "validation failed",
      400,
      ResponseFormating.zodErrors(validationResult.error)
    );
  }

  // logic
  const res = await CreateExamQuestion(req, session);

  // response api
  return ResponseFormating.json(res.message, res.code, res.data);
}

/**
 * Update Exam Question
 * -------------------------
 */
export async function PUT(request: NextRequest) {
  // session
  const session = (await getServerSession(authOptions)) as SessionType;

  // json
  const req = await request.json();

  // validation
  const validationResult = ExamQuestionUpdateValidation.safeParse(req);

  if (!validationResult.success) {
    return ResponseFormating.json(
      "validation failed",
      400,
      ResponseFormating.zodErrors(validationResult.error)
    );
  }

  // logic
  const res = await UpdateExamQuestion(req, session);

  // response api
  return ResponseFormating.json(res.message, res.code, res.data);
}

/**
 * Delete Exam Question
 * -------------------------
 */
export async function DELETE(request: NextRequest) {
  // session
  const session = (await getServerSession(authOptions)) as SessionType;

  // url params
  const { searchParams } = new URL(request.url);
  const id_exam_question = searchParams.get("id_exam_question");

  // logic
  const res = await DeleteExamQuestion(
    parseInt(id_exam_question ?? "0"),
    session
  );

  // response api
  return ResponseFormating.json(res.message, res.code, res.data);
}
