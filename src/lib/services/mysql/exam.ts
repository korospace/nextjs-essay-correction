// nextjs
import { revalidateTag } from "next/cache";
// prisma
import { prisma } from "@/lib/db/prisma";
// types
import { ApiResponseType, SessionType } from "@/lib/types/ResultTypes";
import {
  ExamInputType,
  ExamWhereType,
  PaginationOptions,
} from "@/lib/types/InputTypes";

/**
 * Get Exam
 * -------------------------------
 */
export async function GetExam(
  searchParams: any,
  session: SessionType
): Promise<ApiResponseType> {
  try {
    // -- params value --
    const id_exam = searchParams.get("id_exam");
    const id_course = searchParams.get("id_course");
    const status = searchParams.get("status");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const keyword = searchParams.get("keyword");

    // -- where clause --
    const whereClause: ExamWhereType = {
      OR: [
        {
          title: {
            contains: keyword ?? "",
          },
        },
      ],
    };
    // AND
    if (id_exam) {
      whereClause.id_exam = !isNaN(parseInt(id_exam ?? "0"))
        ? parseInt(id_exam)
        : 0;
    }
    if (session.user.id_user_role === 2) {
      whereClause.created_by = {
        in: [session.user.id_user, 0],
      };
    }
    if (session.user.id_user_role === 3) {
      whereClause.exam_member = {
        some: {
          id_user: session.user.id_user,
        },
      };
    }
    // OR
    if (whereClause.OR && status) {
      whereClause.OR[0].status = status;
    }
    if (whereClause.OR && id_course) {
      whereClause.OR[0].id_course = !isNaN(parseInt(id_course ?? "0"))
        ? parseInt(id_course)
        : 0;
    }

    // -- pagination --
    let paginationParam: PaginationOptions | undefined;
    if (page !== null && limit !== null) {
      paginationParam = {
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      };
    }

    // -- get rows --
    const listExam = await prisma.exam.findMany({
      where: {
        ...whereClause,
        deleted_by: 0,
      },
      include: {
        course: true,
        exam_member: session.user.id_user_role === 3,
      },
      ...paginationParam,
    });

    // -- count rows --
    const countRow = await prisma.exam.count({
      where: {
        ...whereClause,
        deleted_by: 0,
      },
    });

    return {
      status: true,
      code: 200,
      message: "exam list",
      totalPage: Math.ceil(countRow / limit),
      totalRow: countRow,
      data: listExam,
    };
  } catch (error: any) {
    return { status: false, code: 500, message: error.message };
  }
}

/**
 * Create Exam
 * -------------------------------
 */
export async function CreateExam(
  dataInput: ExamInputType,
  session: SessionType
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
          id_course: dataInput.id_course,
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
            created_by:
              session.user.id_user_role !== 1 ? session.user.id_user : 0,
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

/**
 * Update Exam
 * -------------------------------
 */
export async function UpdateExam(
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
          id_course: dataInput.id_course,
          id_exam: { not: dataInput.id_exam },
        },
      });

      if (dtExamExist != null) {
        return { status: false, code: 400, message: "exam is exist" };
      } else {
        const exam = await prisma.exam.update({
          data: {
            id_course: dataInput.id_course,
            title: dataInput.title,
            description: dataInput.description,
            start_date: new Date(dataInput.start_date),
            end_date: new Date(dataInput.end_date),
            duration: dataInput.duration,
            created_by: userSessionId !== 1 ? userSessionId : 0,
          },
          where: {
            id_exam: dataInput.id_exam,
          },
        });

        revalidateTag("exam");
        return {
          status: true,
          code: 201,
          message: "exam update successfully",
          data: exam,
        };
      }
    }
  } catch (error: any) {
    return { status: false, code: 500, message: error.message };
  }
}
