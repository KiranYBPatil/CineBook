import React, { useEffect, useState } from "react";
import { getMovieReviews } from "../../../apis";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReviewModal from "./ReviewModal";

const ReviewSection = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const res = await getMovieReviews(movieId);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const handleWriteReview = () => {
    if (!token) {
      navigate("/login");
    } else {
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-gray-500 dark:text-gray-400 animate-pulse">Loading reviews...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      <hr className="my-6 border-gray-200 dark:border-gray-700" />
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          User Reviews <span className="text-purple-600 dark:text-purple-400">({reviews.length})</span>
        </h2>
        
        <button
          onClick={handleWriteReview}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full font-semibold shadow-md shadow-purple-200/50 dark:shadow-purple-900/50 transition-all duration-300 hover:scale-105"
        >
          ✍️ Write a Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-10 text-center border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No reviews yet.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {review.user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{review.user?.username || "Anonymous User"}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                  <span className="text-pink-500 mr-1">★</span>
                  <span className="font-bold text-purple-700 dark:text-purple-300">{review.rating}</span>
                  <span className="text-xs text-purple-400 dark:text-purple-500 ml-1">/10</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        movieId={movieId} 
        onReviewAdded={fetchReviews} 
      />
    </div>
  );
};

export default ReviewSection;
