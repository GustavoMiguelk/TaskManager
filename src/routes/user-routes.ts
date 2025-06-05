import { Router } from "express";
import { UsersController } from "@/controller/users-controller";

export const userRoutes = Router()

const usersController = new UsersController()

userRoutes.post("/", usersController.create)