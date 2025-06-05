import { Request, Response } from "express";
import { z } from "zod"

export class TeamsController {
    async create(request: Request, response: Response):Promise<any>{
        const bodySchema = z.object({
            name: z.string(),
            description: z.string().min(3)
        })
    }
}