/* eslint-disable no-underscore-dangle */
import { Router, Response } from 'express';
import { validationResult } from 'express-validator';
import formatValidationMessages from '../helpers/formatValidationMessages';
import Posts from '../models/PostModel';
import { IRequest } from '../types';
import postValidator from '../validators/postValidator';

const router: Router = Router();

router.post('/create', postValidator, async (req: IRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(formatValidationMessages(errors.array()));
  }
  if (req.user) {
    const post = await Posts.create({
      user: req.user._id,
      body: req.body.body,
    });
    return res.json({ message: 'Created Successfully', data: post });
  }
  return res.status(400);
});

router.get('/all', async (req: IRequest, res: Response) => {
  try {
    const data = await Posts.find()
      .limit(50)
      .populate('user', { name: 1 });
    return res.json(data);
  } catch (error) {
    return res.status(500);
  }
});

router.get('/me', async (req: IRequest, res: Response) => {
  try {
    const data = await Posts.find({ user: req.user?._id }).populate('user', {
      password: 0,
    });
    return res.json(data);
  } catch (error) {
    return res.status(500);
  }
});

router.delete('/delete/:postId', async (req: IRequest, res: Response) => {
  try {
    const post = await Posts.findById(req.params.postId);
    if (String(post.user) === String(req.user?._id)) {
      await Posts.findByIdAndDelete(req.params.postId);
      return res.json({ message: 'Post has been deleted' });
    }
    return res
      .status(403)
      .json({ message: 'You are not permitted to delete this post' });
  } catch (error) {
    return res.status(500);
  }
});

export default router;
