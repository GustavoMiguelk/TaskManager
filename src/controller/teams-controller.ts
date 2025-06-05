import { Request, Response } from "express";
import { z } from "zod"
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

export class TeamsController {
    async create(request: Request, response: Response):Promise<any>{
        const bodySchema = z.object({
            name: z.string(),
            description: z.string().min(3)
        })

        const { name, description } = bodySchema.parse(request.body)

        const teamWithSameName = await prisma.teams.findFirst({
            where: { name }
        })

        if(teamWithSameName){
            throw new AppError("Team with the same name already exists")
        }

        const team = await prisma.teams.create({
            data: {
                name,
                description,
            }
        })

        response.json({ team })
    }

    async remove(request: Request, response: Response):Promise<any>{
        const { id } = request.params

        const team = await prisma.teams.findFirst({ where: { id }})

        if(!team){
            throw new AppError("This team does not exist")
        }

        await prisma.teams.delete({ where: { id }})

        response.json({ message: "Team Deleted"})
    }

    async update(request: Request, response: Response):Promise<any>{
        const bodySchema = z.object({
            name: z.string(),
            description: z.string().min(3)
        })

        const { id } = request.params

        const teamExist = await prisma.teams.findFirst({ where: { id }})

        if(!teamExist){
            throw new AppError("This team does not exist")
        }

        const { name, description } = bodySchema.parse(request.body)

        const teamUpdate = await prisma.teams.update({
            data:{
                name,
                description,
            },
            where: {
                id,
            }
        })

        response.json({ teamUpdate })
    }
}