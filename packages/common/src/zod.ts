import { z } from "zod";

export const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const createRoomSchema = z.object({
    name: z.string()
})