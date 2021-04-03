import mongoose, { Document, Schema } from 'mongoose';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

interface UserModel extends Omit<User, '_id'>, Document {}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  },
);

export const User = mongoose.model<UserModel>('User', schema);
