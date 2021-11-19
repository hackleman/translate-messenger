import { AnyAction } from "redux";

const userState = {
    isFetching: true
}

// ACTION TYPES
const GET_USER = "GET_USER";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";

export const gotUser = (user: any) => {
    return {
        type: GET_USER,
        user
    }
};

export const setFetchingStatus = (isFetching: Boolean) => ({
    type: SET_FETCHING_STATUS,
    isFetching
});

type UserReducer = typeof userState;

const reducer = (state = userState, action: AnyAction): UserReducer => {
    switch (action.type) {
        case GET_USER:
            return action.user;
        case SET_FETCHING_STATUS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
};

export default reducer;