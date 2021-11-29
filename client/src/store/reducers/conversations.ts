import { AnyAction } from "redux";
import { addSearchedUsersToStore } from "./utils"

const conversationState: any[] = [];

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";

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

export const setSearchedUsers = (users: any) => {
    return {
        type: SET_SEARCHED_USERS,
        users
    }
}

export const clearSearchedUsers = () => {
    return {
        type: CLEAR_SEARCHED_USERS
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
        case SET_SEARCHED_USERS:
            return addSearchedUsersToStore(state, action.users);
        case CLEAR_SEARCHED_USERS:
            return state.filter((convo) => convo.id)
        default:
            return state;
    }
};

export default reducer;