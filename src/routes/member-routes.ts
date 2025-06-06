import { Router } from "express";
import { MembersController } from "@/controller/members-controller";
import { ensureAuth } from "@/middleware/ensure-auth";
import { verifyUserAuth } from "@/middleware/verify-auth";

export const memberRoutes = Router()

const membersController = new MembersController()

memberRoutes.use(ensureAuth, verifyUserAuth(["admin"]))

memberRoutes.post("/", membersController.create)
memberRoutes.delete("/:id", membersController.remove)