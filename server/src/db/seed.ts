import { getConnection } from "typeorm"
import { Conversation, User, Message } from "./entity"

export const resetDatabase = async(): Promise<void> => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.synchronize();
}

export const seedDatabase = async (): Promise<void> => {

    const UserRepo = getConnection().getRepository(User);
    const ConvoRepo = getConnection().getRepository(Conversation);
    const MessageRepo = getConnection().getRepository(Message);

    /**
     *  USERS
     */

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

        const chiumbo = UserRepo.create({
            username: "chiumbo",
            email: "chiumbo@email.com",
            password: "123456"
        })

        const hualing = await UserRepo.create({
            username: "hualing",
            email: "hualing@email.com",
            password: "123456"
        })

        await UserRepo.save(thomas);
        await UserRepo.save(santiago);
        await UserRepo.save(chiumbo);
        await UserRepo.save(hualing);

    /**
     *  CONVOS
     */
        const santiagoConvo = ConvoRepo.create({
            user1Id: thomas.id,
            user2Id: santiago.id
        })

        const chiumboConvo = ConvoRepo.create({
            user1Id: chiumbo.id,
            user2Id: thomas.id
        })

        const hualingConvo = ConvoRepo.create({
            user1Id: hualing.id,
            user2Id: thomas.id
        })

        await ConvoRepo.save(santiagoConvo);
        await ConvoRepo.save(chiumboConvo);
        await ConvoRepo.save(hualingConvo);

    /**
     *  MESSAGES
     */

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
            text: "I'm From New York"
        })
        const message3 = MessageRepo.create({
            conversation: santiagoConvo,
            senderId: thomas.id,
            recipientId: santiago.id,
            text: "please send pics?"
        })

        const message4 = MessageRepo.create({
            conversation: chiumboConvo,
            senderId: chiumbo.id,
            recipientId: thomas.id,
            text: "Sure! What time?"
        })

        await MessageRepo.save(message1)
        await MessageRepo.save(message2)
        await MessageRepo.save(message4);
        await MessageRepo.save(message3)

        for (let i = 0; i < 11; i++) {
            await MessageRepo.save(
                MessageRepo.create({
                    conversation: hualingConvo,
                    senderId: hualing.id,
                    recipientId: thomas.id,
                    text: "😂 😂 😂"
                })
            )
        }
}