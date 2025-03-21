import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/secrets";
import { prismaClient } from "@repo/database/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    userId: string,
    rooms: string[],
    ws: WebSocket
}

const users: User[] = [];

function checkUser(token: string): string | null {
    try {

        if(!token.startsWith("Bearer")) {
            return null;
        }

        const passedToken = token.split(" ")[1];

        if(!passedToken) {
            return null;
        }

        const decoded = jwt.verify(passedToken, JWT_SECRET);

        if(typeof decoded == 'string') return null;

        if(!decoded || !decoded.userId) return null;

        return decoded.userId;
    } catch (error) {
        return null;
    }
}

wss.on('connection', (ws, request) => {

    const url = request.url;
    if(!url) {
        ws.close();
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');

    if(!token) {
        ws.close();
        return;
    }

    const userId = checkUser(token);

    if(!userId) {
        ws.close();
        return;
    }

    users.push({
        userId,
        rooms: [],
        ws
    });

    // returning everytime is disconnecting the ws server I guess, do check it once
    ws.on('message', async (data) => {

        if(typeof data == 'string') return;

        const parsedData = JSON.parse(data.toString()); // { type: join_room, roomId: id }

        if(parsedData.type === "join_room") {
            const user = users.find((x) => x.userId === userId && x.ws === ws);

            if(!user) return;

            user.rooms.push(parsedData.roomId);
        }

        if(parsedData.type === "leave_room") {
            const user = users.find((x) => x.userId === userId && x.ws === ws);
           
            if(!user) return;

            user.rooms = user.rooms.filter((x) => x === parsedData.roomId)
        }

        if(parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message; // you can do checks for abnoxious messages or too long things

            //for now, before broadcasting the message store it in the db then broadcast
            // after learning how to implement queue use that

            await prismaClient.chat.create({
                data: {
                    roomId,
                    userId,
                    message
                }
            });

            users.forEach(user => {
                if(user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        roomId: roomId,
                        message: message
                    }))
                }
            })

        }

    })
})