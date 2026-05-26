import React from "react";
import TheaterTimings from "../components/movies/TheaterTimings";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMovieById } from "../apis";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();

  const { data: movie, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => await getMovieById(id),
    placeholderData: keepPreviousData,
  });

  const movieData = movie?.data?.movie;

  if (isError) {
    return <div className="text-red-500">Something went wrong</div>;
  }

  if (!movieData) {
    return <div className="text-[var(--text-primary)]">Loading...</div>;
  }

  return (
    <>
      <div
        className="relative text-white font-sans"
        style={{
          backgroundImage: `url(${movieData.posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex gap-10">
          <img
            src={movieData.posterUrl}
            alt={movieData.title}
            className="w-56 rounded-xl shadow-2xl"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              {movieData.title}
            </h1>

            <div className="bg-[#2b2b2b] inline-flex items-center gap-4 px-4 py-3 rounded-md mb-4">
              <span className="text-pink-500 font-bold">
                ★ {movieData.rating}/10
              </span>
              <span className="text-gray-300">
                {movieData.votes} Votes
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {movieData.format.map((f, i) => (
                <span
                  key={i}
                  className="bg-[#404040] px-3 py-1 rounded text-sm"
                >
                  {f}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-300 mb-2">
              {movieData.languages.join(", ")}
            </p>

            <p className="text-sm text-gray-400 mb-6">
              {movieData.duration} •{" "}
              {movieData.genre.join(", ")} •{" "}
              {movieData.certification} •{" "}
              {movieData.releaseDate}
            </p>

            <h2 className="text-xl font-bold mb-2">About the movie</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {movieData.description}
            </p>
          </div>
        </div>
      </div>

      {/* TheaterTimings and Timings */}
        <TheaterTimings movieId={id}  />
    </>
  );
};

export default MovieDetails;