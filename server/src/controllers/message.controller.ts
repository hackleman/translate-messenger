import { getConnection } from 'typeorm';
import { User, Message, Conversation } from '../db/entity';

export const postMessage = async (user: User, body: any): Promise<Message | undefined> => {
    const MessageRepo = getConnection().getRepository(Message);
    const ConvoRepo = getConnection().getRepository(Conversation);

    const senderId = user.id;
    const { recipientId, text } = body;

    const conversation = await Conversation.findConversation(senderId, recipientId);
    if (conversation) {
        const message = MessageRepo.create({
            senderId,
            recipientId,
            text,
            conversation
        });

        await MessageRepo.save(message);

        return message;
    }

    const newConvo = ConvoRepo.create({
        user1Id: senderId,
        user2Id: recipientId
    });
    await ConvoRepo.save(newConvo);

    const message = MessageRepo.create({
        senderId,
        recipientId,
        text,
        conversation: newConvo
    })
    await MessageRepo.save(message);

    return message;
}