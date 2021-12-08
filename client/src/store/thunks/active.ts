import socket from "../../socket";
import { setActiveChat } from "../reducers/active";
import { updateConversation } from "../reducers/conversations";
import { updateConversationInDB } from "./utils";

export const setActiveConversation = (conversation: any) => async (dispatch: any) => {
    try {
        const userId = (conversation.user1Id === conversation.otherUser.id) ? conversation.user2Id : conversation.user1Id;

        const data = {
            conversationId: conversation.id,
            otherUser: conversation.otherUser,
            userId
        };

        await updateConversationInDB(data);

        dispatch(updateConversation(data));
        socket.emit("update-conversation", data);

        dispatch(setActiveChat(conversation.otherUser.username))
    } catch (error) {
        console.error(error);
    }
}