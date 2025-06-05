import { Request, Response } from "express";

export class TaskController {
    async create(request: Request, response: Response){
        response.json({ message: "Ok" })
    }
}