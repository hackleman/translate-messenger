import { gotConversations } from "../reducers/conversations";

export const fetchConversations = () => async (dispatch: any) => {
    try {
        const token = localStorage.getItem("messenger-token") || "";
        
        const result = await fetch("/api/conversations", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
                "pragma": "no-cache"
            },
        });
        const data = await result.json();
        dispatch(gotConversations(data))
    } catch (error) {
        console.error(error);
    }
}