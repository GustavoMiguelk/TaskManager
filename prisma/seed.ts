import { prisma } from "@/database/prisma";

async function seed(){
    await prisma.users.create({
        data: {
            name: "admin",
            email: "admin@email.com",
            password: "admin",
            role: "admin"
        }
    })
}

seed().then(() => {
    console.log("Database seeded!")
    prisma.$disconnect
})