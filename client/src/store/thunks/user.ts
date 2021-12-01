import socket from "../../socket";
import { gotUser } from "../reducers/user"
import { 
    getCurrentUserFromDB,
    postLoginToDB, 
    postLogoutToDB, 
    postRegistrationToDB,
 } from "./utils";

export const fetchUser = () => async(dispatch: any) => {
    try {
        const data = await getCurrentUserFromDB();

        dispatch(gotUser(data));
        if (data.id) {
            socket.emit("go-online", data.id)
        }
    } catch (err) {
        console.log(err);
    }
}

export const register = (credentials: any) => async (dispatch: any) => {
    try {
        const data = await postRegistrationToDB(credentials);

        dispatch(gotUser(data.user));
        socket.emit("go-online", data.user.id);

    } catch (err: any) {
        dispatch(gotUser({
            email: '',
            photoUrl: '',
            online: false,
            id: null,
            username: '',
            error: "User already exists"
        }))
    }
}

export const login = (credentials: any) => async (dispatch: any) => {
    try {
        const data = await postLoginToDB(credentials);

        dispatch(gotUser(data.user));
        socket.emit("go-online", data.user.id);

    } catch (err: any) {
        dispatch(gotUser({
            email: '',
            photoUrl: '',
            online: false,
            id: null,
            username: '',
            error: "Invalid Credentials"
        }))
    }
}

export const logout = (id: number) => async (dispatch: any) => {
    try {
        postLogoutToDB();

        dispatch(gotUser({
            email: '',
            photoUrl: '',
            online: false,
            id: null,
            username: ''
        }));

        socket.emit("logout", id);

    } catch (err) {
        console.error(err);
    }
}

