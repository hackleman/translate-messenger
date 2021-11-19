import { Router, Response } from 'express';
import { userController } from '../controllers';

const index = async (_req: any, res: Response) => {
    try {
        const users = await userController.getUsers();
        return res.json(users);
    } catch (error) {
        return res.status(402).json({
            msg: "Error getting users"
        })
    }
}

const router = Router();

router.get('/', index);

export default router;