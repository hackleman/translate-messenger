import { Request } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../db/entity';
import jwt, { Secret } from 'jsonwebtoken';
import { AuthResult } from '../types/auth';

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

export const loginUser = async (body: any): Promise<AuthResult> => {
    const UserRepo = getRepository(User);

    const { username, password } = body;
    const user = await UserRepo.findOne({
        where: {
            username
        }
    })

    if (!user) {
        return {
            status: 401,
            token: undefined,
            msg: "Invalid user"
        }
    } 
    
    if (!user.checkPassword(password)) {
        return {
            status: 401,
            token: undefined,
            msg: "Invalid credentials"
        }
    }

    const token = jwt.sign(
        {id: user?.id}, 
        process.env.JWT_SECRET as Secret, 
        {expiresIn: 86400}
    );
    
    return {
        status: 200,
        msg: 'success',
        token
    }
}

export const registerUser = async (body: any): Promise<AuthResult> => { 
    const UserRepo = getRepository(User);

    const { username, password, email } = body;
    const user = UserRepo.create({
        username,
        password,
        email
    });

    const userExists = await UserRepo.findOne({
        where: {username: user.username}
    });

    if (userExists) {
        return {
            status: 401,
            msg: 'User already exists',
            token: undefined
        }
    }

    const result = await UserRepo.save(user);

    const token = jwt.sign(
        {id: result.id}, 
        process.env.JWT_SECRET as Secret, 
        {expiresIn: 86400});
    
    return {
        status: 200,
        msg: 'success',
        token
    }
}

