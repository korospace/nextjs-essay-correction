// prisma
import { prisma } from "@/lib/db/prisma";
// helpers
import { Hash } from "@/lib/helpers/helpers";
// types
import { ApiResponse } from "@/lib/types/mainType";
import { UserInput } from "@/lib/types/userType";

export async function CreateAdmin(dataInput: UserInput): Promise<ApiResponse> {
    try {
        // check username exist
        const dtUser = await prisma.user.findFirst({
            where: {
                username: dataInput.username
            }
        })

        if (dtUser != null) {
            return {status:false, code: 400, message: "username is exist"}
        } 
        else {
            // insert to user table
            dataInput.password     = Hash.encrypt(dataInput.password)
    
            const newUser = await prisma.user.create({
                data: {
                    username: dataInput.username,
                    password: dataInput.password,
                    full_name: dataInput.full_name,
                    id_user_role: 1
                }
            })
    
            return {status:true, code: 201, message: "user created successfully"}
        }
    } catch (error: any) {
        return {status:true, code: 500, message: error.message}
    }
}