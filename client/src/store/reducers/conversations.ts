import { AnyAction } from "redux";
import { Conversation } from "../../types/conversation";
import { 
    addMessageToStore,
    addSearchedUsersToStore,
    addConversationToStore,
    addOnlineUserToStore,
    removeOfflineUserFromStore
 } from "./utils"

const ConversationState: Conversation[] = [];

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_CONVERSATION = "SET_CONVERSATION";
const SET_MESSAGE = "SET_MESSAGE";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";

export const gotConversations = (conversations: Conversation[]) => {
    return {
        type: GET_CONVERSATIONS,
        conversations
    }
}

export const setNewMessage = (payload: any) => {
    return {
        type: SET_MESSAGE,
        payload
    }
}

export const setNewConversation = (payload: any) => {
    return {
        type: SET_CONVERSATION,
        payload
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

export const addOnlineUser = (id: number) => {
    return {
        type: ADD_ONLINE_USER,
        id
    }
}

export const removeOfflineUser = (id: number) => {
    return {
        type: REMOVE_OFFLINE_USER,
        id
    }
}

type ConversationReducer = typeof ConversationState

const reducer = (state = ConversationState, action: AnyAction): ConversationReducer => {
    switch (action.type) {
        case GET_CONVERSATIONS:
            return action.conversations;
        case SET_CONVERSATION:
            return addConversationToStore(state, action.payload);
        case SET_MESSAGE:
            return addMessageToStore(state, action.payload);
        case SET_SEARCHED_USERS:
            return addSearchedUsersToStore(state, action.users);
        case CLEAR_SEARCHED_USERS:
            return state.filter((convo) => convo.id)
        case ADD_ONLINE_USER:
            return addOnlineUserToStore(state, action.id)
        case REMOVE_OFFLINE_USER:
            return removeOfflineUserFromStore(state, action.id)
        default:
            return state;
    }
};

export default reducer;