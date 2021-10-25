import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  body: string;
  userId: string;
}

const PostSchema = new Schema<IPost>({
  body: {
    type: String,
    trim: true,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Post', PostSchema);
