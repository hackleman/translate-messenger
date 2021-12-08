import socket from "../../socket";
import { 
    setNewMessage, 
    setNewConversation,
    gotConversations, 
    clearSearchedUsers, 
    setSearchedUsers
} from "../reducers/conversations";
import { 
    postMessageToDB, 
    getSearchedUsersFromDB,
    getConversationsFromDB
 } from "./utils";

export const fetchConversations = () => async (dispatch: any) => {
    try {
        const data = await getConversationsFromDB();

        dispatch(gotConversations(data))
    } catch (error) {
        console.error(error);
    }
}

export const searchUsers = (rawSearchTerm: string) => async (dispatch: any) => {
    try {
        const data = await getSearchedUsersFromDB(rawSearchTerm);

        dispatch(setSearchedUsers(data))
    } catch (error) {
        console.error(error);
    }
}

export const clearUsers = () => async (dispatch: any) => {
    try {
        dispatch(clearSearchedUsers())
    } catch (err) {
        console.error(err);
    }
}

export const postMessage = (body: any) => async (dispatch: any) => {
    try {
        const data = await postMessageToDB(body);
        data.isSender = true;

        if (data.newConvo) {
            dispatch(setNewConversation(data))
            socket.emit("new-conversation", data)
        } else {
            dispatch(setNewMessage(data));
            socket.emit("new-message", data)
        }

    } catch (error) {
        console.error(error)
    }
}