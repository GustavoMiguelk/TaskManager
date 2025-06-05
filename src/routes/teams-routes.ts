import { Router } from "express";
import { TeamsController } from "@/controller/teams-controller";
import { ensureAuth } from "@/middleware/ensure-auth";
import { verifyUserAuth } from "@/middleware/verify-auth";

export const teamsRoutes = Router()

const teamsController = new TeamsController()

teamsRoutes.use(ensureAuth, verifyUserAuth(["admin"]))

teamsRoutes.post("/", teamsController.create)
teamsRoutes.delete("/:id", teamsController.remove)
teamsRoutes.put("/:id", teamsController.update)