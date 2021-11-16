import { Router, Response } from 'express';
import { postController } from '../controllers';

// const index = async (_req: any, res: Response) => {
//     const users = await userController.getUsers();
//     res.json(users);
// }

// const create = async (_req: any, res: Response) => {
//     const result = await userController.createUser();
//     res.send(result);
// }

// const update = async (_req: any, res: Response) => {
//     const result = await userController.updateUser();
//     res.send(result);
// }

// const remove = async (_req: any, res: Response) => {
//     const result = await userController.deleteUser();
//     res.send(result);
// }

const router = Router();

// router.get('/', index);
// router.post('/', create);
// router.put('/', update);
// router.delete('/', remove);

export default router;