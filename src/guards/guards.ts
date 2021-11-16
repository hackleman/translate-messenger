import { Request, Response, NextFunction } from 'express';
import { authController } from '../controllers';

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
    const result = await authController.checkToken(req);
    
    if (result) {
        console.log(result);
        next();
    } else{
        res.status(403).json({
            msg: 'Invalid Token'
        });
    }
}

