import { Router, Response } from 'express';
import { convoController } from '../controllers';

const getUserConversations = async (req: any, res: Response) => {
    try {
        const result = await convoController.getUserConversations(req.user);
        return res.json(result);

    } catch (error) {
        return res.status(402).json({
            msg: "Error fetching users convos"
        })
    }
}

const router = Router();

router.get('/', getUserConversations);

export default router;