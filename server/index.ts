import express , { Express } from "express";
import { join } from 'path';
import logger from 'morgan';
import cors from 'cors';

export const setupDatabase = async (): Promise<void> => {
    try {

    } catch (err) {
        console.log(err);
    }
}

export const setupMiddleware = (app: Express): void => {
    app.use(logger("dev"));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(join(__dirname, "public")));
}