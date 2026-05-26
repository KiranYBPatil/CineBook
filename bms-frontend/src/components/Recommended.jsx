import React from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRecommendedMovies } from "../apis";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../context/LocationContext";

const Recommended = () => {
  const navigate = useNavigate();
  const { location } = useLocation();

  const handleNavigate = (movie) => {
    const formattedTitle = movie.title
      .replace(/:/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    navigate(
      `/movies/${location}/${formattedTitle}/${movie._id}/ticket`
    );
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["recommendedMovies"],
    queryFn: getRecommendedMovies,
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p className="text-center py-10 text-gray-500 animate-pulse">Loading movies...</p>;
  }

  if (isError) {
    return <p className="text-center py-10 text-red-500">Failed to load movies</p>;
  }

  const movies =
    data?.data?.topMovies ||
    data?.data?.movies ||
    [];

  return (
    <div className="w-full py-6 bg-gradient-to-b from-white to-purple-50/10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            Recommended Movies
          </h2>

          <span
            onClick={() => navigate("/movies")}
            className="text-md text-purple-600 cursor-pointer hover:text-purple-800 font-medium transition-colors"
          >
            See All →
          </span>
        </div>

        {movies.length === 0 ? (
          <p className="text-center text-gray-500">
            No movies available
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {movies.map((movie) => (
              <div
                key={movie._id}
                onClick={() => handleNavigate(movie)}
                className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 shadow-md"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover"
                />

                <div className="bg-gradient-to-r from-purple-700 to-pink-600 text-white text-sm px-2 py-1 flex justify-between">
                  <span>⭐ {movie.rating}/10</span>
                  <span>{movie.votes} Votes</span>
                </div>

                <div className="px-2 py-1 bg-white">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {movie.title}
                  </h3>
                  <p className="text-md text-gray-500">
                    {movie.genre.join(" | ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommended;
