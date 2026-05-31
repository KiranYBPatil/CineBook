import mongoose from "mongoose";
import { ReviewModel } from "./review.model";
import { MovieModel } from "../movie/movie.model";

export const addReview = async (userId: string, movieId: string, rating: number, comment: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create the review
    const review = await ReviewModel.create([{
      user: userId,
      movie: movieId,
      rating,
      comment
    }], { session });

    // Aggregate average rating and total votes
    const result = await ReviewModel.aggregate([
      { $match: { movie: new mongoose.Types.ObjectId(movieId) } },
      {
        $group: {
          _id: "$movie",
          avgRating: { $avg: "$rating" },
          totalVotes: { $sum: 1 }
        }
      }
    ]).session(session);

    if (result.length > 0) {
      const { avgRating, totalVotes } = result[0];
      
      // Round to 1 decimal place
      const roundedRating = Math.round(avgRating * 10) / 10;
      
      // Update the movie
      await MovieModel.findByIdAndUpdate(movieId, {
        rating: roundedRating,
        votes: totalVotes
      }, { session });
    }

    await session.commitTransaction();
    session.endSession();

    return review[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getReviewsByMovie = async (movieId: string) => {
  return await ReviewModel.find({ movie: movieId })
    .populate("user", "username email")
    .sort({ createdAt: -1 });
};
