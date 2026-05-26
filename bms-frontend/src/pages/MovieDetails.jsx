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
    return <div className="text-white">Loading...</div>;
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex gap-10">
          <img
            src={movieData.posterUrl}
            alt={movieData.title}
            className="w-56 rounded-xl shadow-2xl shadow-purple-900/30 transition-transform duration-300 hover:scale-105"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              {movieData.title}
            </h1>

            <div className="bg-white/10 backdrop-blur-sm inline-flex items-center gap-4 px-4 py-3 rounded-xl mb-4 border border-white/10">
              <span className="text-pink-400 font-bold text-lg">
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
                  className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white/10"
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
            <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
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
