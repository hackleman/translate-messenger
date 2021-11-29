import { applyMiddleware, combineReducers, createStore } from "redux";
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from "redux-thunk";
import { user, conversations, active } from './reducers';

const CLEAR_ON_LOGOUT = "CLEAR_ON_LOGOUT";

export const clearOnLogout = () => {
    return {
        type: CLEAR_ON_LOGOUT
    }
}
const reducers = combineReducers({
    user,
    conversations,
    active
});

const rootReducer = (state: any, action: any) => {
    if (action.type === CLEAR_ON_LOGOUT) {
        state = undefined;
    }
    return reducers(state, action);
}

export const store = createStore(
    rootReducer,
    applyMiddleware(loggerMiddleware, thunkMiddleware));

export type ReduxState = ReturnType<typeof store.getState>;