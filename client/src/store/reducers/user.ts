import { AnyAction } from "redux";
import { User } from '../../types/user';

const UserState: User = {
    id: null,
    email: "",
    username: "",
    online: false,
    photoUrl: ""
}

// ACTION TYPES
const GET_USER = "GET_USER";

export const gotUser = (user: User) => {
    return {
        type: GET_USER,
        user
    }
};

type UserReducer = typeof UserState;

const reducer = (state = UserState, action: AnyAction): UserReducer => {
    switch (action.type) {
        case GET_USER:
            return action.user;
        default:
            return state;
    }
};

export default reducer;