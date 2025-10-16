import { prisma } from "../services/db.js"

export const UserRepository = {
    getUserByCredentials: async (email, password) => {
        const user = await prisma.users.findFirst({
            where: {
                email: email,
                password: password
            },
        })
    },

    createUser: async (email, password) => {
        const newUser = await prisma.users.create({
            data: {
                email: user.email,
                password: user.password,
            },
        });
        return newUser;
    },

    
}