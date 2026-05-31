import axiosInstance from "./axiosWrapper";
import api from "./axiosWrapper";

/* =======================
   MOVIES
======================= */

export const getRecommendedMovies = () =>
  axiosInstance.get("/movies/recommended");

export const getAllMovies = () =>
  axiosInstance.get("/movies");

export const getMovieById = (id) =>
  axiosInstance.get(`/movies/${id}`);

/* =======================
   SHOWS
======================= */

export const getShowsByMovieAndLocation = (movieId, location, date) =>
  axiosInstance.get("/shows", {
    params: {
      movieId,
      location,
      date,
    },
  });

export const getShowById = (id) =>
  axiosInstance.get(`/shows/${id}`);

/* =======================
   BOOKINGS
======================= */

export const createBooking = (payload) =>
  axiosInstance.post("/bookings", payload);


export const getMyBookings = () => {
  return api.get("/bookings/me");
};

/* =======================
   REVIEWS
======================= */

export const getMovieReviews = (movieId) =>
  axiosInstance.get(`/reviews/movie/${movieId}`);

export const addReview = (payload) =>
  axiosInstance.post("/reviews", payload);