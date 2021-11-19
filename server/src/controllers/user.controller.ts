import { getRepository, DeleteResult } from 'typeorm';
import { User } from '../db/entity';

export const getUsers = (): Promise<User[]> => {
    const userRepo = getRepository(User);

    const users = userRepo.find();
    return users;
}

export const getUser = (username: string): Promise<User | undefined> => {
    const userRepo = getRepository(User);

    const user = userRepo.findOne({
        where: {
            username: username
        }
    });
    return user;
}