/* eslint-disable no-underscore-dangle */
import { Router, Response } from 'express';
import { validationResult } from 'express-validator';
import formatValidationMessages from '../helpers/formatValidationMessages';
import Likes from '../models/LikesModel';
import Comments from '../models/CommentModel';
import Posts from '../models/PostModel';
import { IRequest } from '../types';

const router: Router = Router();

router.post('/like', async (req: IRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(formatValidationMessages(errors.array()));
  }
  if (req.user) {
    const data: any = {
      user: req.user._id,
    };
    if (req.body.commentId) {
      const comment = await Comments.findById(req.body.commentId);
      data.commentId = req.body.commentId;
      if (!comment) {
        return res.status(404).json({
          message: 'This comment may have been deleted by the author',
        });
      }
    }
    if (req.body.postId) {
      const post = await Posts.findById(req.body.postId);
      data.postId = req.body.postId;
      if (!post) {
        return res.status(404).json({
          message: 'This post may have been deleted by the author',
        });
      }
    }
    const isLiked = await Likes.findOne(data);
    if (isLiked) {
      await Likes.findByIdAndDelete(isLiked._id);
      return res.status(200).json({ message: 'Unliked Sucessfully' });
    }
    await Likes.create(data);
    return res.status(200).json({ message: 'Liked Sucessfully' });
  }
  return res.status(400);
});

router.get('/count/:postId', async (req: IRequest, res: Response) => {
  try {
    const [data, count] = await Promise.all([
      Likes.find({ postId: req.params.postId }).limit(50),
      Likes.find({ postId: req.params.postId }).count(),
    ]);
    return res.json({ data, count });
  } catch (error) {
    return res.status(500);
  }
});

export default router;
