import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chat/${roomId}`, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    });
    const messages = await res.data.chats;

    // this will send the messages in format of
    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        return messageData;
    });
    return shapes;
}