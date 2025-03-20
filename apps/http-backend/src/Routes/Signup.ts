import { Router } from "express";
import { prismaClient } from "@repo/database/client";
import { signupSchema } from "@repo/common/zod";


const router: Router = Router();

router.post('/', async (req, res) => {
    try {

        const body = signupSchema.safeParse(req.body);

        if(!body.success) {
            res.status(404).json({
                message: "missing sign-up fields!"
            });
            return;
        }

        const { name, email, password } = body.data;

        const existingUser = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(existingUser) {
            res.status(403).json({
                message: "User already exists!"
            });
            return;
        }

        // before adding the new user do hash the password

        const newUser = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
        

        res.status(200).json({
            message: "Signed-up!"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
});

export default router;