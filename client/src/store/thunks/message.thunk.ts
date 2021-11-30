import socket from "../../socket";
import { setNewMessage, setNewConversation } from "../reducers/conversations";

const saveMessage = async (body: any) => {
    const token = localStorage.getItem("messenger-token") || "";
    const res = await fetch("/api/messages", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    return data;
}

export const postMessage = (body: any) => async (dispatch: any) => {
    try {
        const data = await saveMessage(body);
        if (data.newConvo) {
            dispatch(setNewConversation(data))
        } else {
            dispatch(setNewMessage(data));
        }

        socket.emit("new-message", data)
    } catch (error) {
        console.error(error)
    }
}