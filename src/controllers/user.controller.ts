import { getRepository, DeleteResult } from 'typeorm';
import { User } from '../db/entity/User';

export const getUsers = (): Promise<User[]> => {
    const userRepo = getRepository(User);

    const users = userRepo.find();
    return users;
}

export const getUser = (id: number): Promise<User | undefined> => {
    const userRepo = getRepository(User);

    const user = userRepo.findOne(id);
    return user;
}

export const createUser = async (user: User): Promise<User> => {
    const userRepo = getRepository(User);

    const newUser = await userRepo.create(user);
    const result = await userRepo.save(newUser);
    return result;
}

export const updateUser = async (id: number, body: User): Promise<User> => {
    const userRepo = getRepository(User);

    const user = await userRepo.findOne(id);
    if (user) {
        userRepo.merge(user, body);
        const result = await userRepo.save(user);
        return result;
    }

    return body;
}

export const deleteUser = async (id: number): Promise<DeleteResult> => {
    const userRepo = getRepository(User);
    console.log(id)
    const result = await userRepo.delete(id);
    return result;
}