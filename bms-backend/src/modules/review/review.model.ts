import mongoose from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new mongoose.Schema<IReview>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

// A user should only leave one review per movie
reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

export const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);
