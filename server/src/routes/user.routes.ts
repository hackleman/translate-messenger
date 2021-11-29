import { Request, Router, Response } from 'express';
import { userController } from '../controllers';

const getUser = async (req: any, res: Response) => {
    try {
        const user = userController.getCurrentUser(req.user);
        return res.json(user);
    } catch (error) {
        return res.status(402).json({
            msg: "Error getting user",
            user: null
        });
    }
}

const getUserByName = async (req: any, res: Response) => {
    try {
        const { username } = req.params
        const users = await userController.getUserByName(req.user.id, username);
        return res.json(users);
    } catch (error) {
        return res.status(402).json({
            msg: "Error getting user",
            user: null
        });
    }
}

const router = Router();

router.get('/', getUser)
router.get('/:username', getUserByName)

export default router;