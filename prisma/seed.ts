import { prisma } from "@/database/prisma";

async function seed(){
    await prisma.users.create({
        data: {
            name: "admin",
            email: "admin@email.com",
            password: "123456",
            role: "admin"
        }
    })
}

seed().then( async () => {
    console.log("Database seeded!")
    await prisma.$disconnect()
})
