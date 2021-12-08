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
    const { conversationId, message, isSender } = payload;

    return state.map((convo: any) => {
        if (convo.id === conversationId) {
            const messageIds = convo.messages.map((message: any) => message.id);
            if (!messageIds.includes(message.id)) {
                const convoCopy = {...convo}
                convoCopy.messages.push(message);
                convoCopy.latestMessageText = message.text;
                
                if(isSender) {
                    convoCopy.latestReadMessage = latestReadMessage(convoCopy.messages, message.senderId)
                } 
                
                if(!isSender) {
                    convoCopy.unreadCount = unreadCount(convoCopy.messages, message.recipientId);
                }

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

export const updateConversationInStore = (state: any, payload: any) => {
    const { conversationId, otherUser, userId } = payload;

    return state.map((convo: any) => {
        if (convo.id === conversationId) {
            const convoCopy = {...convo};
            convoCopy.messages.map((message: any) => {
                if (message.senderId === otherUser.id) {
                    message.read = true;
                }

                return message;
            });

            if (otherUser.id !== userId) {
                convoCopy.unreadCount = unreadCount(convoCopy.messages, userId);
            } 

            if (otherUser.id === userId) {
                convoCopy.latestReadMessage = latestReadMessage(convoCopy.messages, otherUser.id);
            }

            return convoCopy
        }
        return convo;
    })
}

const unreadCount = (messages: any, userId: number) => {
    const messagesCopy = [...messages];
    messagesCopy.reverse();

    let unread = 0;
    console.log(messagesCopy);
    for (let message of messagesCopy) {
        if (!message.read && message.senderId !== userId) {
            unread += 1
        } else {
            break;
        }
    }

    return unread;
}

const latestReadMessage = (messages: any, userId: number) => {
    const userMessages = messages.filter((message: any) => message.senderId === userId);
    userMessages.reverse();

    for (let message of userMessages) {
        if (message.read) {
            return message.id
        }
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