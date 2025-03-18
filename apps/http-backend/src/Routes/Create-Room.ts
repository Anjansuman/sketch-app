import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";


const router = Router();

router.post('/',userMiddleware, async (req, res) => {
    try {

        const { roomId } = req.body;
        const userId = req.userId;

        

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