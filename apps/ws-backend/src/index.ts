import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket, request) => {

    const url = request.url;
    if(!url) {
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');

    if(!token) return;

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if(!decoded || !decoded.userId) {
        socket.close();
        return;
    }

    socket.on('message', (data) => {
        socket.send('pong');
    })
})