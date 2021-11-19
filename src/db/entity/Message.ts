import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Conversation from './Conversation';

@Entity()
export default class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    senderId: number;
    
    @Column()
    recipientId: number;

    @Column()
    text: string;

    @ManyToOne(() => Conversation, conversation => conversation.messages,  { onDelete: 'CASCADE' })
    @JoinColumn({name: 'conversationId'})
    conversation: Conversation;
}