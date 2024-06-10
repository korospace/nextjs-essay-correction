// prisma
import { prisma } from "@/lib/db/init";
// helpers
import { EssayCorrection } from "@/lib/helpers/essay_correction";
// types
import {
  ExamAnswerWhereType,
  ExamResultSearchParamType,
  TrainingInputType,
  TrainingInputV2Type,
} from "@/lib/types/InputTypes";
import { ApiResponseType, SessionType } from "@/lib/types/ResultTypes";

/**
 * Get Exam Result
 * -------------------------
 */
export async function GetExamResult(
  searchParams: ExamResultSearchParamType,
  session: SessionType
): Promise<ApiResponseType> {
  try {
    // -- params value --
    let id_exam = !isNaN(parseInt(searchParams.id_exam ?? "0"))
      ? parseInt(searchParams.id_exam)
      : 0;
    let id_user = !isNaN(parseInt(searchParams.id_user ?? "0"))
      ? parseInt(searchParams.id_user)
      : 0;

    // -- Authorization --
    if (session.user.id_user_role === 3) {
      if (id_user !== session.user.id_user) {
        return { status: false, code: 404, message: "not found" };
      }
    }

    // -- where clause --
    const whereClause: ExamAnswerWhereType = {
      exam_question: {
        id_exam: id_exam,
      },
      user: {
        id_user: id_user,
      },
    };

    // -- get question table --
    const listExamQuestion = await prisma.examQuestion.findMany({
      where: {
        id_exam: id_exam,
        deleted_by: 0,
      },
      orderBy: {
        created_date: "asc",
      },
    });

    // -- get answer table --
    const listExamAnswer = await prisma.examAnswer.findMany({
      where: {
        ...whereClause,
      },
    });

    // -- answer & answer key list --
    const questionAnswerList: TrainingInputV2Type[] = listExamQuestion.map(
      (rowQuestion) => {
        const answer = listExamAnswer.find(
          (rowAnswer) =>
            rowAnswer.id_exam_question === rowQuestion.id_exam_question
        );

        return {
          similiarity_matrix: answer?.similiariy_matrix ?? "",
          max_simmatrix: answer?.max_simmatrix ?? "",
          answer: {
            raw_value: answer?.answer,
            cleaned: answer?.answer_cleaning,
            stemmed: answer?.answer_stemming,
            stopword_removed: answer?.answer_stopword,
            n_gram: answer?.answer_ngram,
          },
          answer_key: {
            raw_value: answer?.answer_key,
            cleaned: answer?.answer_key_cleaning,
            stemmed: answer?.answer_key_stemming,
            stopword_removed: answer?.answer_key_stopword,
            n_gram: answer?.answer_key_ngram,
          },
        };
      }
    );

    // -- training --
    const dtTraining = await EssayCorrection.trainingDataV2(questionAnswerList);

    return {
      status: true,
      code: 200,
      message: "exam result",
      data: dtTraining,
    };
  } catch (error: any) {
    return { status: false, code: 500, message: error.message };
  }
}

/**
 * Get Exam Result - from XLSX
 * ---------------------------
 */
export async function GetExamResultFromExcel(
  dataInput: TrainingInputType[]
): Promise<ApiResponseType> {
  try {
    // -- training --
    const dtTraining = await EssayCorrection.trainingData(dataInput);

    return {
      status: true,
      code: 200,
      message: "exam result",
      data: dtTraining,
    };
  } catch (error: any) {
    return { status: false, code: 500, message: error.message };
  }
}
