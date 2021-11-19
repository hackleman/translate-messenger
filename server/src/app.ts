import express , { Express } from "express";
import { join } from 'path';
import logger from 'morgan';
import cors from 'cors';
import "reflect-metadata";
import { userRouter, authRouter, convoRouter, messageRouter } from './routes';
import { authGuard } from './middleware';

export const init = (app: Express): void => {
    app.use(logger("dev"));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(join(__dirname, "public")));
    
    app.use('/auth', authRouter);

    app.use(authGuard);

    app.use('/api/conversations', convoRouter)
    app.use('/api/users', userRouter);
    app.use('/api/messages', messageRouter);
}