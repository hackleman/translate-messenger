import { setActiveChat } from "../reducers/active";

export const setActiveConversation = (username: string) => async (dispatch: any) => {
    try {
        dispatch(setActiveChat(username))
    } catch (error) {
        console.error(error);
    }
}