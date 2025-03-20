import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/secrets";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    userId: string,
    rooms: string[],
    ws: WebSocket
}

const users: User[] = [];

function checkUser(token: string): string | null {
    const decoded = jwt.verify(token, JWT_SECRET);

    if(typeof decoded == 'string') return null;

    if(!decoded || !decoded.userId) return null;

    return decoded.userId;
}

wss.on('connection', (ws, request) => {

    const url = request.url;
    if(!url) {
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

    ws.on('message', (data) => {

        if(typeof data == 'string') return;

        const parsedData = JSON.parse(data.toString()); // { type: join_room, roomId: id }

        if(parsedData.type === 'join_room') {
            const user = users.find((x) => x.userId === userId && x.ws === ws);

            if(!user) return;

            user.rooms.push(parsedData.roomId);
        }

        if(parsedData.type === 'leave_room') {
            const user = users.find((x) => x.userId === userId && x.ws === ws);
           
            if(!user) return;

            user.rooms = user.rooms.filter((x) => x === parsedData.roomId)
        }

        if(parsedData.type === 'chat') {
            const roomId = parsedData.roomId;
            const message = parsedData.message; // you



        }

    })
})