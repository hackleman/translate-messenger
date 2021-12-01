import { applyMiddleware, combineReducers, createStore } from "redux";
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from "redux-thunk";
import { user, conversations, active } from './reducers';

const CLEAR_STATE = "CLEAR_STATE";

export const clearState = () => {
    return {
        type: CLEAR_STATE
    }
}
const reducers = combineReducers({
    user,
    conversations,
    active
});

const rootReducer = (state: any, action: any) => {
    if (action.type === CLEAR_STATE) {
        state = undefined;
    }
    return reducers(state, action);
}

export const store = createStore(
    rootReducer,
    applyMiddleware(loggerMiddleware, thunkMiddleware));

export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;