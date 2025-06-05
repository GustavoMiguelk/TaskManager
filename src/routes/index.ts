import { Router } from "express";

import { userRoutes } from "./user-routes";
import { sessionRoutes } from "./session-routes";
import { teamsRoutes } from "./teams-routes";

export const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/teams", teamsRoutes)