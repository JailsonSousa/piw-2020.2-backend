import mongoose, { Document, Schema } from 'mongoose';

export interface Comment {
  _id?: string;
  message: string;
  postId: string;
  userId: string;
}

interface CommentModel extends Omit<Comment, '_id'>, Document {}

const schema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
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

export const Comment = mongoose.model<CommentModel>('Comment', schema);
