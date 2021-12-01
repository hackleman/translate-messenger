export const addSearchedUsersToStore = (state: any, users: any) => {
    const currentUsers: any = {};

    state.forEach((convo: any) => {
        currentUsers[convo.otherUser.id] = true;
    })

    const newState = [...state];
    users.forEach((user: any) => {
        if(!currentUsers[user.id]) {
            let fakeConvo = { otherUser: { username: user.username, id: user.id, photoUrl: user.photoUrl}, messages: []};
            newState.push(fakeConvo)
        }
    })

    return newState;
}

export const addMessageToStore = (state: any, payload: any) => {
    const { conversationId, message } = payload;
    return state.map((convo: any) => {
        if (convo.id === conversationId) {
            const messageIds = convo.messages.map((message: any) => message.id);
            if (!messageIds.includes(message.id)) {
                const convoCopy = {...convo}
                convoCopy.messages.push(message);
                convoCopy.latestMessageText = message.text;
                return convoCopy
            }
            return convo;
        } else {
            return convo;
        }
    })
}

export const addConversationToStore = (state: any, payload: any) => {
    const { message, conversationId, isSender } = payload;
    const convoIds = state.map((convo: any) => convo.id);
    
    if (!isSender && !convoIds.includes(conversationId)) {
        const newState = [...state];
        const newConvo = {
            id: conversationId,
            user1Id: message.senderId,
            user2Id: message.recipientId,
            messages: [message],
            latestMessageText: message.text,
            otherUser: {
                id: message.senderId,
                online: true,
                photoUrl: "",
                username: "thomas"
            }
        };
        newState.push(newConvo)
        return newState;
    } else {
        return state.map((convo: any) => {
            if (convo.otherUser.id === message.recipientId) {
                const convoCopy = {...convo }
                const messageIds = convoCopy.messages.map((message: any) => message.id);

                convoCopy.id = conversationId;
                if (!messageIds.includes(message.id)) {
                    convoCopy.messages.push(message);
                    convoCopy.latestMessageText = message.text;
                }
                return convoCopy;
            } else {
                return convo;
            }
        })
    }
}

export const addOnlineUserToStore = (state: any, id: number) => {
    return state.map((convo: any) => {
        if (convo.otherUser.id === id) {
            const convoCopy =  { ...convo };
            convoCopy.otherUser.online = true;
            return convoCopy;
        } else {
            return convo;
        }
    })
}

export const removeOfflineUserFromStore = (state: any, id: number) => {
    return state.map((convo: any) => {
        if (convo.otherUser.id === id) {
            const convoCopy = { ...convo };
            convoCopy.otherUser.online = false;
            return convoCopy;
        } else {
            return convo;
        }
    });
}