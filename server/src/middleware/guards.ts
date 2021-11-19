import { Response, NextFunction } from 'express';
import { authController } from '../controllers';

export const authGuard = async (req: any, res: Response, next: NextFunction) => {
    const result = await authController.checkToken(req);
    
    if (result) {
        req.user = result;
        next();
    } else{
        res.status(403).json({
            msg: 'Invalid Token'
        });
    }
}

export const checkUser = async (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
        res.status(401).json({
            err: "Invalid user"
        })
    }

    next();
}

