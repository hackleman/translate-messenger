import { Router, Request, Response, NextFunction } from 'express';
import { authController } from '../controllers';
import { validateLogin, validateRegister } from '../middleware';

const router = Router();

const login = async (req: Request, res: Response) => {
    const { status, token, msg } = await authController.loginUser(req.body);

    res.status(status).json({ 
        msg,
        token 
    })
}

const register = async (req: Request, res: Response) => {
    const { status, token, msg } = await authController.registerUser(req.body);

    res.status(status).json({
        msg,
        token
    })
}

const logout = () => {

}


router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.delete("/logout", logout);

export default router;
