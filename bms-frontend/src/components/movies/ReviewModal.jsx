import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../../apis";

const ReviewModal = ({ movieId, isOpen, onClose, onReviewAdded }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }

    if (rating < 1 || rating > 10) {
      setError("Rating must be between 1 and 10.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await addReview({ movieId, rating, comment });
      onReviewAdded();
      setComment("");
      setRating(10);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-[90%] max-w-md shadow-2xl transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Write a Review</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-xl font-bold">
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Rating (1-10)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <span className="font-bold text-purple-700 dark:text-purple-400 text-lg w-6 text-center">
                {rating}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Your Review
            </label>
            <textarea
              required
              rows="4"
              placeholder="What did you think about the movie?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-purple-300/40 dark:shadow-purple-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
