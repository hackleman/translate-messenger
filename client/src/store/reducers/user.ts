import { AnyAction } from "redux";

// ACTION TYPES
const GET_USER = "GET_USER";

export const gotUser = (user: any) => {
    return {
        type: GET_USER,
        user
    }
};

const reducer = (state = {}, action: AnyAction): any => {
    switch (action.type) {
        case GET_USER:
            return action.user;
        default:
            return state;
    }
};

export default reducer;