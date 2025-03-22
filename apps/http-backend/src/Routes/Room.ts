import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import { createRoomSchema } from "@repo/common/zod";
import { prismaClient } from "@repo/database/client";


const router: Router = Router();

router.post('/create-room', userMiddleware, async (req, res) => {
    try {

        const data = createRoomSchema.safeParse(req.body);

        if(!data.success) {
            res.status(404).json({
                message: "Fields are empty!"
            });
            return;
        }

        const { name } = data.data;
        const userId = req.userId;

        if (!userId) {
            res.status(400).json({
                message: "User ID is missing!"
            });
            return;
        }

        const newRoom = await prismaClient.room.create({
            data: {
                slug: name,
                adminId: userId
            }
        });
        

        res.status(200).json({
            message: "Room created successfully!",
            name: newRoom.slug,
            admin: newRoom.adminId,
            room: newRoom.id
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
});

router.get('/:slug', userMiddleware, async (req, res) => {
    try {
        
        const slug = req.params.slug;
        console.log(slug);

        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        });

        if(!room) {
            res.status(404).json({
                message: "Room not found!"
            });
            return;
        }

        res.status(200).json({
            roomId: room.id
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error
        });
        return;
    }
});

export default router;