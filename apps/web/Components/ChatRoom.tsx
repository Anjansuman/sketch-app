import axios from "axios";
import { HTTP_URL } from "../app/config";
import { ChatRoomclient } from "./ChatRoomClient";

async function getChats(roomId: string) {
    const response = await axios.get(`${HTTP_URL}/chat/${roomId}`);
    return await response.data.chats;
}

export async function ChatRoom({id}: {
    id: string
}) {
    // const chats = await getChats(id);

    const response = await axios.get(`${HTTP_URL}/chat/${id}`);

    const chats = await response.data.chats;

    return <ChatRoomclient chat={chats} id={id} />

}