import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayLoad{
    role: string
    sub: string
}

function ensureAuth(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError("JWT Token not found", 401)
    }

    const [, token] = authHeader.split(" ")

    const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayLoad

    request.user = {
        id: user_id,
        role,
    }

    return next()
}