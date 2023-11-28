import { SignUser } from "@/protocols";
import { userService } from "@/services/user-service";
import { Request, Response } from "express";

export async function createUser(req:Request, res:Response ){

    const {email, password} = req.body as SignUser

    const createUser = await userService.createUser(email, password)

    return 
}


