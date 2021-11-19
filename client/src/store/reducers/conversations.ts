import { AnyAction } from "redux";

const conversationState: any[] = [];




type ConversationReducer = typeof conversationState

const reducer = (state = conversationState, action: AnyAction): ConversationReducer => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;