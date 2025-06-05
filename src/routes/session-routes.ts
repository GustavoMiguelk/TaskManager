import { Router } from "express";
import { SessionsController } from "@/controller/sessions-controller";

export const sessionRoutes = Router()

const sessionsController = new SessionsController()

sessionRoutes.post("/", sessionsController.create)
