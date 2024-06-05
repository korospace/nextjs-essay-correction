// nextjs
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
// auth
import authOptions from "../../auth/[...nextauth]/authOptions";
// helpers
import { ResponseFormating } from "@/lib/helpers/helpers";
// validation request
import { ExamMemberInputValidation } from "@/lib/validation/request";
// types
import { SessionType } from "@/lib/types/ResultTypes";
import { ExamQuestionSearchParamType } from "@/lib/types/InputTypes";
// services
import {
  CreateExamMember,
  GetExamMember,
  DeleteExamMember,
} from "@/lib/services/mysql/examMember";

/**
 * Get Exam Member
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
  const res = await GetExamMember(examSearch, session);

  // response api
  const data = {
    totalRow: res.totalRow,
    totalPage: res.totalPage,
    data: res.data,
  };
  return ResponseFormating.json(res.message, res.code, data);
}

/**
 * Create Exam Member
 * -------------------------
 */
export async function POST(request: NextRequest) {
  // session
  const session = (await getServerSession(authOptions)) as SessionType;

  // json
  const req = await request.json();

  // validation
  const validationResult = ExamMemberInputValidation.safeParse(req);

  if (!validationResult.success) {
    return ResponseFormating.json(
      "validation failed",
      400,
      ResponseFormating.zodErrors(validationResult.error)
    );
  }

  // logic
  const res = await CreateExamMember(req, session);

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
  const id_exam_question = searchParams.get("id_exam_member");

  // logic
  const res = await DeleteExamMember(
    parseInt(id_exam_question ?? "0"),
    session
  );

  // response api
  return ResponseFormating.json(res.message, res.code, res.data);
}
