import { Request } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../db/entity/User';
import jwt from 'jsonwebtoken';

export const checkToken = async (req: Request): Promise<User | null> => {
    try {
        const token = req.headers["x-access-token"] as string;
        if (token && process.env.JWT_SECRET) {
            const decoded: any = await jwt.verify(token, process.env.JWT_SECRET);
            const user = await getRepository(User).findOne(decoded.id);
            return user ? user : null;
        }

        return null;
    } catch (err) {
        console.log(err.message);
        return null;
    }
}
