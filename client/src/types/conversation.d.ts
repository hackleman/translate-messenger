import { User } from "./user";

export interface Conversation {
    id: number,
    user1Id: number,
    user2Id: number,
    otherUser: User,
    messages: any[]
}