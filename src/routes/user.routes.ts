import { Router, Response } from 'express';
import { userController } from '../controllers';

const index = async (_req: any, res: Response) => {
    const users = await userController.getUsers();
    res.json(users);
}

const create = async (req: any, res: Response) => {
    const result = await userController.createUser(req.body);
    res.send(result);
}

const update = async (req: any, res: Response) => {
    const result = await userController.updateUser(req.params.id, req.body);
    res.send(result);
}

const remove = async (req: any, res: Response) => {
    const result = await userController.deleteUser(req.params.id);
    res.send(result);
}

const router = Router();

router.get('/', index);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;