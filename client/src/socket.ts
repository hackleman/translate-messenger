import io from "socket.io-client";
import { store } from "./store";
import { 
    addOnlineUser,
    removeOfflineUser,
    setNewMessage,
    setNewConversation
 } from "./store/reducers/conversations"

const socket = io(window.location.origin);

socket.on("connect", () => {
    console.log("connected to server");

    socket.once("add-online-user", (id) => {
        store.dispatch(addOnlineUser(id));
    });

    socket.once("remove-offline-user", (id) => {
        store.dispatch(removeOfflineUser(id));
    });

    socket.once("new-message", (data) => {
        const user = store.getState().user.id;
        const recipient = data.message.recipientId;
        if (user === recipient) {
            store.dispatch(setNewMessage(data));
        }
    })

    socket.once("new-conversation", (data) => {
        const user = store.getState().user.id;
        const recipient = data.message.recipientId;
        if (user === recipient) {
            data.isSender = false;
            store.dispatch(setNewConversation(data));
        }
    })
})

export default socket;