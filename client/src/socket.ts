import io from "socket.io-client";
import { store } from "./store";
import { 
    addOnlineUser,
    removeOfflineUser,
    setNewMessage,
    setNewConversation,
    updateConversation
 } from "./store/reducers/conversations"

const socket = io("https://translate-messaging-server.herokuapp.com");

socket.on("connect", () => {
    console.log("connected to server");

    socket.on("add-online-user", (id) => {
        store.dispatch(addOnlineUser(id));
    });

    socket.on("remove-offline-user", (id) => {
        store.dispatch(removeOfflineUser(id));
    });

    socket.on("new-message", (data) => {
        const user = store.getState().user.id;
        const recipient = data.message.recipientId;

        if (user === recipient) {
            data.isSender = false;
            store.dispatch(setNewMessage(data));
        }
    })

    socket.on("new-conversation", (data) => {
        const user = store.getState().user.id;
        const recipient = data.message.recipientId;
        
        if (user === recipient) {
            data.isSender = false;
            store.dispatch(setNewConversation(data));
        }
    })

    socket.on("update-conversation", (data) => {
        const { otherUser } = data;
        const user = store.getState().user.id;
        
        if (user === otherUser.id) {
            store.dispatch(updateConversation({
                conversationId: data.conversationId,
                otherUser: data.otherUser,
                userId: user
            }));
        }
    })
})

export default socket;