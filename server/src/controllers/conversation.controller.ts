import { getRepository } from 'typeorm';
import { Conversation, User } from '../db/entity';

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
    })

    return convos;
}