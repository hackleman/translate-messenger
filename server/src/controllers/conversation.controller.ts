import { getRepository } from 'typeorm';
import { Conversation, User, Message} from '../db/entity';

// export const getAllConversations = (): Promise<Conversation[]> => {
//     const ConvoRepo = getRepository(Conversation);
//     const convos = ConvoRepo.find({});
//     return convos;
// }

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
        if (temp) {
            otherUser = {
                id: temp.id,
                username: temp.username,
                photoUrl: temp.photoUrl
            }
        }
        convo.otherUser = otherUser;
        delete convo.users;
    })

    return convos;
}