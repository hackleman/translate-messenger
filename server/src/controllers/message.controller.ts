import { getConnection } from 'typeorm';
import { User, Message, Conversation } from '../db/entity';
const activeUsers = require('../activeUsers');

export const postMessage = async (user: User, body: any): Promise<any> => {
    const MessageRepo = getConnection().getRepository(Message);
    const ConvoRepo = getConnection().getRepository(Conversation);
    const UserRepo = getConnection().getRepository(User);

    const senderId = user.id;
    const { recipientId, text } = body;

    const conversation = await Conversation.findConversation(senderId, recipientId);
    if (conversation) {
        let read = false;

        if (activeUsers.hasOwnProperty(recipientId)) {
            read = activeUsers[recipientId].includes(user.id)
        }

        const message = MessageRepo.create({
            senderId,
            recipientId,
            text,
            conversation,
            read
        });

        await MessageRepo.save(message);

        return {
            message: {
                id: message.id,
                recipientId: message.recipientId,
                senderId: message.senderId,
                text: message.text,
                read: message.read
            },
            newConvo: false,
            conversationId: conversation.id
        };
    }

    const newConvo = ConvoRepo.create({
        user1Id: senderId,
        user2Id: recipientId
    });

    const users = await UserRepo.find({
        where: [
            {id: senderId},
            {id: recipientId}
        ]
    })

    newConvo.users = users
    await ConvoRepo.save(newConvo);

    const message = MessageRepo.create({
        senderId,
        recipientId,
        text,
        conversation: newConvo,
        read: false
    })
    await MessageRepo.save(message);

    return {
        message: {
            id: message.id,
            recipientId: message.recipientId,
            senderId: message.senderId,
            text: message.text,
            read: message.read
        },
        newConvo: true,
        conversationId: newConvo.id
    };
}