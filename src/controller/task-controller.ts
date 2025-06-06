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

    async update(request: Request, response: Response){
        const bodySchema = z.object({
            id: z.string(),     
            status: z.enum(["pending", "progressing", "completed"])
        })

        const { id ,status } = bodySchema.parse(request.body)

        const hasTask = await prisma.tasks.findFirst({ where: { id }})

        if(!hasTask){
            throw new AppError("This task does not exist")
        }

        if(hasTask.status === "completed"){
            throw new AppError("This task is already completed")
        }

        if(hasTask.assignedTo !== request.user?.id){
            throw new AppError("Unauthorized")
        }

        const taskStatus = await prisma.tasks.update({
            data:{
                status,
            },
            where: {
                id,
            }
        })

        response.json({ taskStatus })
    }

    async show(request: Request, response: Response){
        const memberTeam = await prisma.members.findFirst({
            where: {userId: request.user?.id}
        })

        const tasks = await prisma.tasks.findMany({
            where: { teamId: memberTeam?.teamId }
        })

        response.json({tasks})
    }

    async remove(request: Request, response: Response){
        const { id } = request.params

        const hasTask = await prisma.tasks.findFirst({
            where:{ id }
        })

        if(!hasTask){
            throw new AppError("This task does not exist")
        }

        await prisma.tasks.delete({
            where: { id }
        })

        response.json({ message: "Task Deleted" })
    }
}