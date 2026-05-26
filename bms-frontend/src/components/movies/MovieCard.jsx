import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-40 md:w-52 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/40 rounded-xl">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="rounded-xl shadow-md"
      />

      <p className="mt-2 font-semibold text-gray-800">{movie.title}</p>

      <p className="text-xs text-gray-500">
        ⭐ {movie.rating} | {movie.votes}
      </p>

      <p className="text-sm text-gray-600 font-medium">{movie.certification}</p>

      <p className="text-sm text-gray-500 truncate">
        {movie.languages.join(" | ")}
      </p>
    </div>
  );
};

export default MovieCard
