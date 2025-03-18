import { Router } from "express";


const router = Router();

router.post('/', async (req, res) => {
    try {

        const { name, email, password } = req.body;

        

        res.status(200).json({
            message: "Signed-up!"
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
})