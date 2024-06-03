// nextjs
import { revalidateTag } from "next/cache";
// prisma
import { prisma } from "@/lib/db/prisma";
// types
import {
  CourseInputType,
  CourseSearchType,
  PaginationOptions,
} from "@/lib/types/InputTypes";
import { ApiResponseType } from "@/lib/types/ResultTypes";

/**
 * Get Course
 * -------------------------------
 */
export async function GetCourse(
  searchParam: CourseSearchType,
  paginationOptions?: PaginationOptions
): Promise<ApiResponseType> {
  try {
    const listUser = await prisma.course.findMany({
      where: {
        ...searchParam,
        deleted_by: 0,
      },
      ...paginationOptions,
    });

    const countRow = await prisma.course.count({
      where: {
        ...searchParam,
        deleted_by: 0,
      },
    });

    const limit = paginationOptions != undefined ? paginationOptions.take : 0;
    const countPage = Math.ceil(countRow / limit);

    return {
      status: true,
      code: 200,
      message: "course list",
      totalPage: countPage,
      totalRow: countRow,
      data: listUser,
    };
  } catch (error: any) {
    return { status: false, code: 500, message: error.message };
  }
}

/**
 * Create Course
 * -------------------------------
 */
export async function CreateCourse(
  dataInput: CourseInputType,
  userSessionId: number
): Promise<ApiResponseType> {
  try {
    // check username exist
    const dtCourse = await prisma.course.findFirst({
      where: {
        name: dataInput.name,
      },
    });

    if (dtCourse != null) {
      return { status: false, code: 400, message: "course is exist" };
    } else {
      // insert to course table
      const newCourse = await prisma.course.create({
        data: {
          name: dataInput.name,
          description: dataInput.description,
          created_by: userSessionId,
        },
      });

      revalidateTag("course");
      return {
        status: true,
        code: 201,
        message: "course created successfully",
      };
    }
  } catch (error: any) {
    return { status: false, code: 500, message: error.message };
  }
}

/**
 * Update Course
 * -------------------------------
 */
export async function UpdateCourse(
  dataInput: CourseInputType,
  userSessionId: number
): Promise<ApiResponseType> {
  try {
    // check course is exist
    const checkCourserExist = await prisma.course.findFirst({
      where: {
        id_course: dataInput.id_course,
      },
    });

    if (checkCourserExist === null) {
      return { status: false, code: 404, message: "course is not exist" };
    }

    // check course exist
    const checkCouse = await prisma.course.findFirst({
      where: {
        name: dataInput.name,
        id_course: { not: dataInput.id_course },
      },
    });

    if (checkCouse != null) {
      return { status: false, code: 400, message: "course is exist" };
    } else {
      // get old data
      const dtCourse = await prisma.course.findFirst({
        where: {
          id_course: dataInput.id_course,
        },
      });

      // update to course table
      const course = await prisma.course.update({
        data: {
          name: dataInput.name,
          description: dataInput.description,
          updated_by: userSessionId,
          updated_date: new Date(),
        },
        where: {
          id_course: dataInput.id_course,
        },
      });

      revalidateTag("course");
      return {
        status: true,
        code: 200,
        message: "course update successfully",
      };
    }
  } catch (error: any) {
    return { status: true, code: 500, message: error.message };
  }
}

/**
 * Delete Course
 * -------------------------------
 */
export async function DeleteCourse(
  id_course: number,
  userSessionId: number
): Promise<ApiResponseType> {
  try {
    // check course is exist
    const checkCourserExist = await prisma.course.findFirst({
      where: {
        id_course: id_course,
      },
    });

    if (checkCourserExist === null) {
      return { status: false, code: 404, message: "course is not exist" };
    } else {
      const course = await prisma.course.update({
        data: {
          deleted_by: userSessionId,
          deleted_date: new Date(),
        },
        where: {
          id_course: id_course,
        },
      });

      revalidateTag("course");
      return {
        status: true,
        code: 200,
        message: "course delete successfully",
      };
    }
  } catch (error: any) {
    return { status: true, code: 500, message: error.message };
  }
}
