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
    try {
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
                token: '',
                msg: "User not found",
                user: null
            }
        } 

        if (!user.checkPassword(password)) {
            return {
                status: 401,
                token: '',
                msg: "Invalid credentials",
                user: null
            }
        }
        const token = jwt.sign(
            {id: user?.id}, 
            process.env.JWT_SECRET as Secret, 
            {expiresIn: 86400}
        );
        
        return {
            status: 200,
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                online: false,
                photoUrl: user.photoUrl
            }
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: 500,
            token: '',
            user: null
        } 
    }
}

export const registerUser = async (body: any): Promise<AuthResult> => { 
    try {
        const UserRepo = getRepository(User);
        const { username, password, email } = body;

        const userExists = await UserRepo.findOne({
            where: {username}
        });
    
        if (userExists?.id) {
            return {
                status: 401,
                msg: 'User already exists',
                token: '',
                user: null
            }
        }
        const user = UserRepo.create({
            username,
            password,
            email,
            photoUrl:"https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
        });
    
        const token = jwt.sign(
            {id: user.id}, 
            process.env.JWT_SECRET as Secret, 
            {expiresIn: 86400});
    
        const result = await UserRepo.save(user);
    
        return {
            status: 200,
            msg: 'success',
            token,
            user: {
                id: result.id,
                email: result.email,
                username: result.username,
                online: false,
                photoUrl: result.photoUrl
            }
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: 500,
            msg: 'Server Error',
            token: '',
            user: null
        }
    }
}

