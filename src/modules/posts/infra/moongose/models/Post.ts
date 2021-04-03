import mongoose, { Document, Schema } from 'mongoose';

export interface Post {
  _id?: string;
  message: string;
  likes: number;
  userId: string;
}

interface PostModel extends Omit<Post, '_id'>, Document {}

const schema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },

    likes: {
      type: Number,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export const Post = mongoose.model<PostModel>('Post', schema);
