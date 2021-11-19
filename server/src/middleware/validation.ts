import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res:Response, next: NextFunction): void => {
    const { username, password, email }  = req.body;

    if (!username || !password || !email) {
        res.status(400).json({
            error: "Fields are missing"
        });
        return;
    }

    if (password.length < 6) {
        res.status(400).json({
            error: "Password must be at least 6 characters"
        });
        return
    }

    next();
}

export const validateMessage = (req: Request, res: Response, next: NextFunction): void => {
    const { recipientId, text } = req.body;
    if (!recipientId || !text ) {
        res.status(401).json({
            msg: "Invalid Message Body"
        });
        return;
    }
    next();
}

export const validateLogin = (req: Request, res:Response, next: NextFunction): void => {
    const { username, password } = req.body;
    if (!username || !password)
      res.status(400).json({ error: "Username and password required" });
    else
      next();
}