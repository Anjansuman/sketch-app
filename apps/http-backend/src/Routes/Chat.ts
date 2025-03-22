import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import { prismaClient } from "@repo/database/client";

const router: Router = Router();

router.get('/:roomId', userMiddleware, async (req, res) => {

    try {
        const roomId = Number(req.params.roomId);

        if(typeof roomId != 'number') {
            res.status(400).json({
                message: "Invalid room I'd!"
            });
            return;
        }
    
        const chats = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: 'desc'
            },
            take: 50
        });

        res.status(200).json({
            chats
        })
    
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error
        });
        return;
    }

});

export default router;