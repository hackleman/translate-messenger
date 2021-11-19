import { getRepository } from 'typeorm';
import { Conversation, User, Message} from '../db/entity';

export const getAllConversations = (): Promise<Conversation[]> => {
    const ConvoRepo = getRepository(Conversation);
    const convos = ConvoRepo.find({});
    return convos;
}

export const getUserConversations = (user: User): Promise<Conversation[]> => {
    const ConvoRepo = getRepository(Conversation);
    const convos = ConvoRepo.find({
        where: [
            {user1Id: user.id},
            {user2Id: user.id}
        ]
    });
    return convos;
}