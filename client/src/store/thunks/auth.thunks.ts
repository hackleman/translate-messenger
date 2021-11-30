import socket from "../../socket";
import { gotUser } from "../reducers/user"

export const register = (credentials: any) => async (dispatch: any) => {
    try {
        const res = await fetch("auth/register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })

        const data = await res.json();
        localStorage.setItem("messenger-token", data.token);

        dispatch(gotUser(data.user));

        socket.emit("go-online", data.user.id)

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
        const res = await fetch("auth/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await res.json();
        localStorage.setItem("messenger-token", data.token);

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
        await fetch("/auth/logout", {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
        localStorage.removeItem("messenger-token");

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
