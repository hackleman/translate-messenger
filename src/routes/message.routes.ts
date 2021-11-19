import { Router, Response } from 'express';
import { messageController } from '../controllers';
import { validateMessage, checkUser } from '../middleware';

const postMessage = async (req: any, res: Response) => {
    try {
        const result = await messageController.postMessage(req.user, req.body);
        return res.json(result);

    } catch (error) {
        return res.status(402).json({
            msg: "Error fetching conversaitons"
        })
    }
}

const router = Router();

router.post('/', validateMessage, checkUser, postMessage);

export default router;