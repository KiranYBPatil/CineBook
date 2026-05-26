import React from "react";
import BannerSlider from "../components/shared/BannerSlider";
import MovieFilters from "../components/movies/MovieFilters";
import MovieList from "../components/movies/MovieList";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAllMovies } from "../apis";

const Movies = () => {
  const {
    data: allMovies,
    isError,
  } = useQuery({
    queryKey: ["allMovies"],
    queryFn: async()=> {

      return await getAllMovies();
    },
    placeholderData: keepPreviousData,
    select : (res) => res.data.movies
  });

  if (isError) {
    toast.error("Something went wrong!");
  }

  

  return (
    <div>
      <BannerSlider />

      <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 min-h-screen md:px-[100px] pb-10 pt-8">
        <MovieFilters />
        <MovieList allMovies={allMovies} />
      </div>
    </div>
  );
};

export default Movies;
