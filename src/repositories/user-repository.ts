import prisma from "@/database/database"

async function findByEmail(email:string){
    return prisma.user.findFirst({
        where:{
            email
        }
    })
}


export const userRepository = {
    findByEmail
}   