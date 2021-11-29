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
    } catch (err: any) {
        console.error(err);
        dispatch(gotUser({
            error: err.response.data.error || "Server Error"
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
    } catch (err: any) {
        dispatch(gotUser({
            error: err.response.data.error || "Server Error"
        }))
    }
}

export const logout = (_id: number) => async (dispatch: any) => {
    try {
        await fetch("/auth/logout", {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
        localStorage.removeItem("messenger-token");

        dispatch(gotUser({}));
    } catch (err) {
        console.error(err);
    }
}
