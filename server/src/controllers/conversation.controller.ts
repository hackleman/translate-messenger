import { getRepository } from 'typeorm';
import { Conversation, User, Message } from '../db/entity';

const onlineUsers = require('../onlineUsers');

export const getUserConversations = async (user: User): Promise<Conversation[]> => {
    const ConvoRepo = getRepository(Conversation);
    const convos = await ConvoRepo.find({
        where: [
            {user1Id: user.id},
            {user2Id: user.id}
        ]
    })

    convos.forEach(convo => {
        const temp = convo.users?.find(convouser => convouser.id !== user.id);
        let otherUser = undefined;
        let userOnline = false;
        if (temp) {

            if (onlineUsers.includes(temp.id)) {
                userOnline = true;
            }
            otherUser = {
                id: temp.id,
                online: userOnline,
                username: temp.username,
                photoUrl: temp.photoUrl
            }
        }
        convo.otherUser = otherUser;
        delete convo.users;

        const messages = [...convo.messages];
        messages.reverse();

        if (messages.length > 0) {
            convo.latestMessageText = messages[0].text;
            
            let unread = 0;
            let latestReadMessage = -1;

            for (let message of messages) {
                if (!message.read && message.senderId !== user.id) {
                    unread += 1;
                } else {
                    break;
                }
            }

            for (let message of messages) {
                if(message.senderId === user.id && message.read) {
                    latestReadMessage = message.id;
                    break;
                }
            }

            convo.unreadCount = unread;
            convo.latestReadMessage = latestReadMessage;
        }
    })

    return convos;
}

export const updateUserConversations = async (conversationId: number, userId: number): Promise<void> => {
    const ConvoRepo = getRepository(Conversation);
    const MessageRepo = getRepository(Message);

    const convo = await ConvoRepo.findOne({
        where: {id: conversationId}
    })
    
    if (convo) {
        convo.messages.forEach((message: Message) => {
            if(message.senderId !== userId) {
                message.read = true;
            }
            convo.unreadCount = 0;
            MessageRepo.save(message);
        })
        ConvoRepo.save(convo)
    }
}