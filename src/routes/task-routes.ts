import { Router } from "express"; 
import { TaskController } from "@/controller/task-controller";
import { ensureAuth } from "@/middleware/ensure-auth";
import { verifyUserAuth } from "@/middleware/verify-auth";

export const taskRoutes = Router()
const taskController = new TaskController()

taskRoutes.use(ensureAuth)

taskRoutes.post("/", verifyUserAuth(["admin"]),taskController.create)
taskRoutes.delete("/:id", verifyUserAuth(["admin"]),taskController.remove)

taskRoutes.patch("/", taskController.update)
taskRoutes.get("/", taskController.show)