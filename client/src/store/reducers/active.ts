import { AnyAction } from "redux";

const activeState: string = "";

const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (username: string) => {
    return {
        type: SET_ACTIVE_CHAT,
        username
    }
}

type ActiveReducer = typeof activeState

const reducer = (state = activeState, action: AnyAction): ActiveReducer => {
    switch (action.type) {
        case SET_ACTIVE_CHAT: {
            return action.username;
        }
        default: 
            return state;
    }
}

export default reducer;