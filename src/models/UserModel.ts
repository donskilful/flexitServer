import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// eslint-disable-next-line func-names
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
