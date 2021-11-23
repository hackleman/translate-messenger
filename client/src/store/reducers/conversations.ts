import { AnyAction } from "redux";

const conversationState: any[] = [];

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_CONVERSATION = "ADD_CONVERSATION";

export const gotConversations = (conversations: any[]) => {
    return {
        type: GET_CONVERSATIONS,
        conversations
    }
}

export const setNewMessage = (message: any, sender: any) => {
    return {
        type: SET_MESSAGE,
        payload: { message, sender: sender || null}
    }
}

export const addConversation = (recipientId: number, newMessage: any) => {
    return {
        type: ADD_CONVERSATION,
        payload: {
            recipientId,
            newMessage
        }
    }
}

type ConversationReducer = typeof conversationState

const reducer = (state = conversationState, action: AnyAction): ConversationReducer => {
    switch (action.type) {
        case GET_CONVERSATIONS:
            return action.conversations;
        default:
            return state;
    }
};

export default reducer;