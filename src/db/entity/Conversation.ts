import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany, 
    ManyToMany, 
    getConnection } from "typeorm";
import User from "./User";
import Message from './Message';

@Entity()
export default class Conversation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user1Id: number;

    @Column()
    user2Id: number;

    @OneToMany(() => Message, message => message.conversation,  { onDelete: 'CASCADE' , eager: true})
    messages: Message[];

    @ManyToMany(() => User,  { onDelete: 'CASCADE' })
    user: User;
    static findConversation: (user1Id: number, user2Id: number) => Promise<Conversation | undefined>;
}

Conversation.findConversation = async (user1Id: number, user2Id: number): Promise<Conversation | undefined> => {
    const convRepo = getConnection().getRepository(Conversation);

    const result = await convRepo.findOne({
        where: [
            {user1Id, user2Id},
            {user1Id: user2Id, user2Id: user1Id}
        ]
    });

    return result;
}