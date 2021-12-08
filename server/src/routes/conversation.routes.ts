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

const updateUserConversations = async (req: any, res: any) => {
    try {
        const { user, body } = req;
        await convoController.updateUserConversations(body.conversationId, user.id);
        return res.status(204).json({
            msg: "success"
        });
    } catch (error) {
        return res.status(402).json({
            msg: "Error updating TABLE CONVERSATIONS"
        })
    }
}
const router = Router();

router.get('/', getUserConversations);
router.put('/', updateUserConversations);

export default router;