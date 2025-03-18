import { Router } from "express";
import jwt from "jsonwebtoken";


const router = Router();

router.post('/', async (req, res) => {
    try {

        const { email, password } = req.body;

        
        const token = jwt.sign({
            // userId from db
        }, 'hell');

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