import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { AppError } from "@/utils/AppError";

export class MembersController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            userId: z.string(),
            teamId: z.string()
        })

        const { userId, teamId } = bodySchema.parse(request.body)

        const hasUser = await prisma.users.findFirst({ where: { id: userId }})

        if(!hasUser){
            throw new AppError("This user does not exist")
        }

        const hasTeam = await prisma.teams.findFirst({ where: { id: teamId }})

        if(!hasTeam){
            throw new AppError("This team does not exist")
        }

        const memberExist = await prisma.members.findFirst({
            where: { userId }
        })

        if(memberExist){
            throw new AppError("This member is already assigned to a team")
        }

        const member = await prisma.members.create({
            data:{
                userId,
                teamId
            }
        })

        response.status(200).json({ message: "New member created" })
    }

    async remove(request: Request, response: Response){
        const { id } = request.params

        const hasMember = await prisma.members.findFirst({ where: { id }})

        if(!hasMember){
            throw new AppError("This member does not exist")
        }

        const deletedMember = await prisma.members.delete({ where: { id }})

        response.json({ deletedMember })
    }
}