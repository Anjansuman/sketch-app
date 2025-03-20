import { Router } from "express";
import jwt from "jsonwebtoken";
import { signinSchema } from "@repo/common/zod";
import { JWT_SECRET } from "@repo/backend-common/secrets";
import { prismaClient } from "@repo/database/client";


const router: Router = Router();

router.post('/', async (req, res) => {
    try {

        const data = signinSchema.safeParse(req.body);

        if(!data.success) {
            res.status(404).json({
                message: "Fields are empty"
            });
            return;
        }

        const { email, password } = data.data;

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(!user) {
            res.status(404).json({
                message: "User doesn't exists!"
            });
            return;
        }

        // now check for the hashed password 
        if(user.password !== password) {
            res.status(401).json({
                message: "Wrong password!"
            });
            return;
        }
        
        const token = "Bearer " + jwt.sign({
            userId: user.id
        }, JWT_SECRET);

        res.status(200).json({
            message: "Signed-in!",
            token: token
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
});

export default router;