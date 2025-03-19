import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import { CreateRoomSchema } from "@repo/common/types";


const router = Router();

router.post('/',userMiddleware, async (req, res) => {
    try {

        const data = CreateRoomSchema.safeParse(req.body);

        if(!data.success) {
            res.status(404).json({
                message: "Fields are empty!"
            });
            return;
        }

        const { name } = data.data;
        

        res.status(200).json({
            message: "Room created successfully!"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
})