import { combineReducers, createStore } from "redux";
import { user, conversations } from './reducers';

const reducers = combineReducers({
    user,
    conversations
});

export const store = createStore(reducers);

export type ReduxState = ReturnType<typeof store.getState>;