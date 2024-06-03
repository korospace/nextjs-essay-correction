// nextjs
import { revalidateTag } from "next/cache";
// prisma
import { prisma } from "@/lib/db/prisma";
// helpers
import { Hash } from "@/lib/helpers/helpers";
// types
import {
  PaginationOptions,
  UserInputType,
  UserSearchType,
} from "@/lib/types/InputTypes";
import { ApiResponseType } from "@/lib/types/ResultTypes";

/**
 * Get User
 * -------------------------------
 */
export async function GetUser(
  searchParam: UserSearchType,
  paginationOptions?: PaginationOptions
): Promise<ApiResponseType> {
  try {
    const listUser = await prisma.user.findMany({
      where: {
        ...searchParam,
        deleted_by: 0,
      },
      ...paginationOptions,
    });

    const countRow = await prisma.user.count({
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
      message: "user list",
      totalPage: countPage,
      totalRow: countRow,
      data: listUser,
    };
  } catch (error: any) {
    return { status: false, code: 500, message: error.message };
  }
}

/**
 * Create User
 * -------------------------------
 */
export async function CreateUser(
  dataInput: UserInputType,
  userSessionId: number
): Promise<ApiResponseType> {
  try {
    // check username exist
    const dtUser = await prisma.user.findFirst({
      where: {
        username: dataInput.username,
      },
    });

    if (dtUser != null) {
      return { status: false, code: 400, message: "username is exist" };
    } else {
      // insert to user table
      dataInput.password = Hash.encrypt(dataInput.password ?? "");

      const newUser = await prisma.user.create({
        data: {
          username: dataInput.username,
          password: dataInput.password,
          full_name: dataInput.full_name,
          id_user_role: dataInput.id_user_role,
          created_by: userSessionId,
        },
      });

      revalidateTag("user");
      return { status: true, code: 201, message: "user created successfully" };
    }
  } catch (error: any) {
    return { status: false, code: 500, message: error.message };
  }
}

/**
 * Update User
 * -------------------------------
 */
export async function UpdateUser(
  dataInput: UserInputType,
  userSessionId: number
): Promise<ApiResponseType> {
  try {
    // check user is exist
    const checkUserExist = await prisma.user.findFirst({
      where: {
        id_user: dataInput.id_user,
      },
    });

    if (checkUserExist === null) {
      return { status: false, code: 404, message: "user is not exist" };
    }

    // check username exist
    const checkUsername = await prisma.user.findFirst({
      where: {
        username: dataInput.username,
        id_user: { not: dataInput.id_user },
      },
    });

    if (checkUsername != null) {
      return { status: false, code: 400, message: "username is exist" };
    } else {
      // get old data
      const dtUser = await prisma.user.findFirst({
        where: {
          id_user: dataInput.id_user,
        },
      });

      // update to user table
      if (dataInput.password !== "" && dataInput.password !== undefined) {
        dataInput.password = Hash.encrypt(dataInput.password ?? "");
      } else {
        dataInput.password = dtUser?.password || "";
      }

      const user = await prisma.user.update({
        data: {
          username: dataInput.username,
          full_name: dataInput.full_name,
          password: dataInput.password,
          updated_by: userSessionId,
          updated_date: new Date(),
        },
        where: {
          id_user: dataInput.id_user,
        },
      });

      revalidateTag("user");
      return {
        status: true,
        code: 200,
        message: "user update successfully",
      };
    }
  } catch (error: any) {
    return { status: true, code: 500, message: error.message };
  }
}

/**
 * Delete User
 * -------------------------------
 */
export async function DeleteUser(
  id_user: number,
  userSessionId: number
): Promise<ApiResponseType> {
  try {
    // check user is exist
    const checkUserExist = await prisma.user.findFirst({
      where: {
        id_user: id_user,
      },
    });

    if (checkUserExist === null) {
      return { status: false, code: 404, message: "user is not exist" };
    } else {
      const user = await prisma.user.update({
        data: {
          deleted_by: userSessionId,
          deleted_date: new Date(),
        },
        where: {
          id_user: id_user,
        },
      });

      revalidateTag("user");
      return {
        status: true,
        code: 200,
        message: "user delete successfully",
      };
    }
  } catch (error: any) {
    return { status: true, code: 500, message: error.message };
  }
}
