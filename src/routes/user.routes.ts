import { Request, Router, Response } from 'express';
import { userController } from '../controllers';

const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userController.getUsers();
        return res.json(users);
    } catch (error) {
        return res.status(402).json({
            msg: "Error getting users"
        })
    }
}

const getUser = async (req: any, res: Response) => {
    try {
        const { username } = req.params;
        const user = await userController.getUser(username);
        return res.json({
            user
        })
    } catch (error) {
        return res.status(402).json({
            msg: "Error getting user"
        })
    }
}

const router = Router();

router.get('/', getUsers);
router.get('/:username', getUser)

export default router;