import { gotUser } from "../reducers/user"
import { clearSearchedUsers, setSearchedUsers } from '../reducers/conversations';
import socket from "../../socket";

export const fetchUser = () => async(dispatch: any) => {
    const token = localStorage.getItem("messenger-token") || "";

    try {
        const res = await fetch("/api/users", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const data = await res.json();
        dispatch(gotUser(data));
        if (data.id) {
            socket.emit("go-online", data.id)
        }
    } catch (err) {
        console.log(err);
    }
}

export const searchUsers = (rawSearchTerm: string) => async (dispatch: any) => {
    try {
        const token = localStorage.getItem("messenger-token") || "";
        const searchTerm = rawSearchTerm.replace(/[^a-z]/gi, '');
        if (searchTerm.length > 0) {
            const result = await fetch(`/api/users/${searchTerm}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
            });
            const data = await result.json();
            dispatch(setSearchedUsers(data))
        }
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