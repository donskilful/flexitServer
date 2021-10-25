import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  body: string;
  userId: string;
}

const CommentSchema = new Schema<IComment>({
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
  body: {
    type: String,
    ref: 'Comment',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Comment', CommentSchema);
