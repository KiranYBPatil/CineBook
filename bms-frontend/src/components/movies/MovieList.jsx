import React from "react";
import { languages } from "../../utils/constants";
import MovieCard from "./MovieCard";

const MovieList = ({ allMovies = [] }) => {
  // Safety check (in case backend sends wrong data)
  const movies = Array.isArray(allMovies) ? allMovies : [];

  return (
    <div className="w-full md:w-3/4 p-4">
      {/* Language Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {languages.map((lang, i) => (
          <span
            key={i}
            className="bg-white dark:bg-[var(--bg-card)] border border-gray-200 dark:border-gray-600 text-[#f74362] py-1 px-3 rounded-[24px] text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {lang}
          </span>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="flex justify-between items-center bg-white dark:bg-[var(--bg-card)] px-6 py-6 rounded mb-6 border border-[var(--border-color)]">
        <h3 className="font-semibold text-xl text-[var(--text-primary)]">Coming Soon</h3>
        <a
          href="#"
          className="text-red-500 text-sm font-medium flex items-center"
        >
          Explore Upcoming Movies <span className="ml-1">→</span>
        </a>
      </div>

      {/* Movie Cards */}
      <div className="flex flex-wrap gap-6">
        {movies.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No movies available</p>
        ) : (
          movies.map((movie, i) => (
            <MovieCard key={movie._id || i} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
