import { Router, Request, Response } from 'express';

import AuthController from '../controllers/AuthController';
import PostController from '../controllers/PostController';
import CommentController from '../controllers/CommentController';
import LikeController from '../controllers/LikeController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to flexit APIs' });
});

router.use('/auth', AuthController);
router.use('/post', authMiddleware, PostController);
router.use('/comment', authMiddleware, CommentController);
router.use('/like', authMiddleware, LikeController);

export default router;
