import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@repo/backend-common/secrets";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"];

    if(!authorization || !authorization.startsWith("Bearer ")) {
        res.status(400).json({
            message: "You are not authorized!"
        });
        return;
    }

    const token = authorization.split(" ")[1];

    if(!token) {
        res.status(404).json({
            message: "Authorization failed!"
        });
        return;
    }

    try {
        // put a secret key from .env file
        const verifiedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if(!verifiedToken || !verifiedToken.userId) {
            res.status(401).json({
                message: "Invalid token!"
            });
            return;
        }

        req.userId = verifiedToken.userId;
        next();

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
}