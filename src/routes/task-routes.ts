import { Router } from "express"; 
import { TaskController } from "@/controller/task-controller";

export const taskRoutes = Router()
const taskController = new TaskController()

taskRoutes.post("/", taskController.create)
