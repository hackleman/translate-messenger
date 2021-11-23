import { Router, Request, Response } from 'express';
import { authController } from '../controllers';
import { validateLogin, validateRegister } from '../middleware';

const router = Router();

const login = async (req: Request, res: Response) => {
    const { status, token, user, msg } = await authController.loginUser(req.body);

    res.status(status).json({ 
        msg,
        token,
        user
    })
}

const register = async (req: Request, res: Response) => {
    const { status, token, msg, user } = await authController.registerUser(req.body);

    res.status(status).json({
        msg,
        token,
        user
    })
}

const checkUser = async (req: any, res: Response) => {
    if (req.user) {
        return res.json({
            id: req.user.id,
            email: req.user.email,
            username: req.user.username
        });
    } else {
        return res.json({
            user: null
        });
    }
}

const logout = (req: any, res: Response) => {
    req.user = undefined;
    return res.status(200).json({
        user: null
    })
}


router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.delete("/logout", logout);
router.get("/user", checkUser)

export default router;
