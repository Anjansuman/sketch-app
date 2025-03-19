import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { SignInSchema } from "@repo/common/types";


const router = Router();

router.post('/', async (req, res) => {
    try {

        const data = SignInSchema.safeParse(req.body);

        if(!data.success) {
            res.status(404).json({
                message: "Fields are empty"
            });
            return;
        }

        const { email, password } = data.data;

        
        const token = jwt.sign({
            // userId from db
        }, JWT_SECRET);

        res.status(200).json({
            message: "Signed-in!"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
})