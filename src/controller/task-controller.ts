import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { z } from "zod"

export class TaskController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            title: z.string().min(3),
            description: z.string().min(3),
            priority: z.enum(["high", "medium", "low"]),
            assignedTo: z.string(),
            teamId: z.string()
        })

        const { 
            title, 
            description, 
            priority, 
            assignedTo, 
            teamId
        } = bodySchema.parse(request.body)


        const hasUser = await prisma.users.findFirst({ 
            where: { id: assignedTo }
        })

        if(!hasUser){
            throw new AppError("This user does not exist")
        }

        const hasTeam = await prisma.teams.findFirst({
            where: { id: teamId }
        })

        if(!hasTeam){
            throw new AppError("This team does not exist")
        }

        const taskCreated = await prisma.tasks.create({
            data:{
                title,
                description,
                priority,
                assignedTo,
                teamId,
            }
        }) 

        response.json({ taskCreated })
    }
}