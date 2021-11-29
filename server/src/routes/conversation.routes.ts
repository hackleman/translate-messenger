import { Router, Response } from 'express';
import { convoController } from '../controllers';
import { checkUser } from '../middleware';

// const getConversations = async (_req: any, res: Response) => {
//     try {
//         const result = await convoController.getAllConversations();
//         return res.json(result);

//     } catch (error) {
//         return res.status(402).json({
//             msg: "Error fetching conversaitons"
//         })
//     }
// }

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

// router.get('/', checkUser, getConversations);
router.get('/', checkUser, getUserConversations);

export default router;