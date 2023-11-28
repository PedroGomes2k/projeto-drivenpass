import { userRepository } from "@/repositories"

async function createUser(email: string, password: string) {
   await verifyUser(email)

}

async function verifyUser(email: string) {

    const response = await userRepository.findByEmail(email)
    if(!response) throw 
}


export const userService = {
    createUser

}