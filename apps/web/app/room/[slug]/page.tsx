import axios from "axios";
import { HTTP_URL } from "../../config";
import { ChatRoom } from "../../../Components/ChatRoom";

async function getRoomId(slug: string) {
    const response = await axios.get(`${HTTP_URL}/room/${slug}`);
    const id = await response.data.room.id;
    return id;
}

export default async function chatRoom({
    params
}: {
    params: {
        slug: string
    }
}) {

    const slug = (await params).slug;
    console.log(slug);
    const roomId = await getRoomId(slug);
    console.log(roomId);

    return <ChatRoom id={roomId} />

}