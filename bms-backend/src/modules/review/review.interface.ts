import mongoose from "mongoose";

export interface IReview {
  _id?: string;
  user: mongoose.Types.ObjectId;
  movie: mongoose.Types.ObjectId;
  rating: number; // 1 to 10
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
