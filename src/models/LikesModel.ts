import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  body: string;
  userId: string;
}

const LikeSchema = new Schema<IPost>({
  user: {
    type: mongoose.Types.ObjectId,
    trim: true,
    ref: 'User',
    required: true,
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
  },
  commentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Comment',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Like', LikeSchema);
