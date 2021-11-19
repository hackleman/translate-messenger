import { getConnection } from "typeorm"
import { Conversation, User, Message } from "./entity"

const resetDatabase = async(): Promise<void> => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.synchronize();
}

export const seedDatabase = async (): Promise<void> => {
    await resetDatabase()
    // Thomas Santiago Convo

    const UserRepo = getConnection().getRepository(User);
    const ConvoRepo = getConnection().getRepository(Conversation);
    const MessageRepo = getConnection().getRepository(Message);

    const thomas = UserRepo.create({
        username: "thomas",
        email: "thomas@email.com",
        password: "123456"
    });

    const santiago = UserRepo.create({
        username: "santiago",
        email: "santiago@gmail.com",
        password: "123456"
    })

    await UserRepo.save(thomas);
    await UserRepo.save(santiago);

    const santiagoConvo = ConvoRepo.create({
        user1Id: thomas.id,
        user2Id: santiago.id
    })

    await ConvoRepo.save(santiagoConvo);

    const message1 = MessageRepo.create({
        conversation: santiagoConvo,
        senderId: santiago.id,
        recipientId: thomas.id,
        text: "Where are you from?"
    })
    const message2 = MessageRepo.create({
        conversation: santiagoConvo,
        senderId: santiago.id,
        recipientId: thomas.id,
        text: "New York?"
    })
    const message3 = MessageRepo.create({
        conversation: santiagoConvo,
        senderId: thomas.id,
        recipientId: santiago.id,
        text: "please send pics?"
    })

    await MessageRepo.save(message1)
    await MessageRepo.save(message2)
    await MessageRepo.save(message3)
}