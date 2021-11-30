import { getRepository, Like, Not } from 'typeorm';
import { User } from '../db/entity';
import { UserResult } from '../types/auth';

export const getCurrentUser = (user: User): UserResult | undefined => {
    if (user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            online: true,
            photoUrl: user.photoUrl
        }
    }
    return;
}

export const getUserByName = async (userId: number, username: string): Promise<User[]> => {
    const userRepo = getRepository(User);
    const users = await userRepo.find({
        where: {
            username: Like(`%${username}%`),
            id: Not(userId)
        }

    });
    return users;
}
