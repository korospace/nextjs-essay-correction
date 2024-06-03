// nextjs
import { revalidateTag } from "next/cache";
// prisma
import { prisma } from "@/lib/db/prisma";
// types
import { ApiResponseType } from "@/lib/types/ResultTypes";
import { ExamInputType } from "@/lib/types/InputTypes";

/**
 * Create Exam
 * -------------------------------
 */
export async function CreateExam(
  dataInput: ExamInputType,
  userSessionId: number
): Promise<ApiResponseType> {
  try {
    // check course exist
    const dtCourseExist = await prisma.course.findFirst({
      where: {
        id_course: dataInput.id_course,
      },
    });

    if (dtCourseExist === null) {
      return { status: false, code: 404, message: "course not found" };
    } else {
      // check exam exist
      const dtExamExist = await prisma.exam.findFirst({
        where: {
          title: dataInput.title,
        },
      });

      if (dtExamExist != null) {
        return { status: false, code: 400, message: "exam is exist" };
      } else {
        const newData = await prisma.exam.create({
          data: {
            id_course: dataInput.id_course,
            title: dataInput.title,
            description: dataInput.description,
            start_date: new Date(dataInput.start_date),
            end_date: new Date(dataInput.end_date),
            duration: dataInput.duration,
            created_by: userSessionId !== 1 ? userSessionId : 0,
          },
        });

        revalidateTag("exam");
        return {
          status: true,
          code: 201,
          message: "exam created successfully",
          data: newData,
        };
      }
    }
  } catch (error: any) {
    return { status: false, code: 500, message: error.message };
  }
}
