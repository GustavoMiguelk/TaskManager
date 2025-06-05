import { Router } from "express";

import { userRoutes } from "./user-routes";
import { sessionRoutes } from "./session-routes";

export const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)