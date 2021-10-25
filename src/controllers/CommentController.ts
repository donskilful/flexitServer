/* eslint-disable no-underscore-dangle */
import { Router, Response } from 'express';
import { validationResult } from 'express-validator';
import formatValidationMessages from '../helpers/formatValidationMessages';
import Comment from '../models/CommentModel';
import Posts from '../models/PostModel';
import { IRequest } from '../types';
import commentValidator from '../validators/commentValidator';

const router: Router = Router();

router.post(
  '/create',
  commentValidator,
  async (req: IRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(formatValidationMessages(errors.array()));
    }
    if (req.user) {
      const postExist = await Posts.findById(req.body.postId);
      if (postExist) {
        const data = await Comment.create({
          user: req.user._id,
          body: req.body.body,
          postId: req.body.postId,
        });
        return res.json({ message: 'Created Successfully', data });
      }
      return res
        .status(404)
        .json({ message: 'This post may have been deleted by the author' });
    }
    return res.status(400);
  },
);

router.get('/get/:postId', async (req: IRequest, res: Response) => {
  try {
    const data = await Comment.find({ postId: req.params.postId })
      .limit(50)
      .populate('user', { password: 0 });
    return res.json(data);
  } catch (error) {
    return res.status(500);
  }
});

router.delete('/delete/:commentId', async (req: IRequest, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (String(comment.user) === String(req.user?._id)) {
      await Comment.findByIdAndDelete(req.params.commentId);
      return res.json({ message: 'Comment has been deleted' });
    }
    return res
      .status(403)
      .json({ message: 'You are not permitted to delete this comment' });
  } catch (error) {
    return res.status(500);
  }
});

export default router;
