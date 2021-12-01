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
            password: "123456",
            photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/6c4faa7d65bc24221c3d369a8889928158daede4_vk5tyg.png",
        });

        const santiago = UserRepo.create({
            username: "santiago",
            email: "santiago@gmail.com",
            password: "123456",
            photoUrl:
                "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/8bc2e13b8ab74765fd57f0880f318eed1c3fb001_fownwt.png",
        })

        const chiumbo = UserRepo.create({
            username: "chiumbo",
            email: "chiumbo@email.com",
            password: "123456",
            photoUrl:
                "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png",
        })

        const hualing = UserRepo.create({
            username: "hualing",
            email: "hualing@email.com",
            password: "123456",
            photoUrl:
                "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
        })

        const ashanti = UserRepo.create({
            username: "ashanti",
            email: "ashanti@email.com",
            password: "123456",
            photoUrl:
              "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/68f55f7799df6c8078a874cfe0a61a5e6e9e1687_e3kxp2.png",
        })

        const julia = UserRepo.create({
            username: "julia",
            email: "julia@email.com",
            password: "123456",
            photoUrl:
                "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/d9fc84a0d1d545d77e78aaad39c20c11d3355074_ed5gvz.png",
        })

        const cheng = UserRepo.create({
            username: "cheng",
            email: "cheng@email.com",
            password: "123456",
            photoUrl:
                "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/9e2972c07afac45a8b03f5be3d0a796abe2e566e_ttq23y.png",
        })

        await UserRepo.save(thomas);
        await UserRepo.save(santiago);
        await UserRepo.save(chiumbo);
        await UserRepo.save(hualing);
        await UserRepo.save(cheng);
        await UserRepo.save(julia);
        await UserRepo.save(ashanti);

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

        santiagoConvo.users = [thomas, santiago];
        chiumboConvo.users = [chiumbo, thomas];
        hualingConvo.users = [hualing, thomas];

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
            text: "Where are you from?",
            read: true
        })
        const message2 = MessageRepo.create({
            conversation: santiagoConvo,
            senderId: santiago.id,
            recipientId: thomas.id,
            text: "I'm From New York",
            read: true
        })
        const message3 = MessageRepo.create({
            conversation: santiagoConvo,
            senderId: thomas.id,
            recipientId: santiago.id,
            text: "please send pics?",
            read: true
        })

        const message4 = MessageRepo.create({
            conversation: chiumboConvo,
            senderId: chiumbo.id,
            recipientId: thomas.id,
            text: "Sure! What time?",
            read: false
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
                    text: "😂 😂 😂",
                    read: false
                })
            )
        }
}