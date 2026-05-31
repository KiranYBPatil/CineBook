"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopMovieByVotes = exports.getMovieById = exports.getAllMovies = exports.createMovie = void 0;
const movie_model_1 = require("./movie.model");
// 1. Create a movie
const createMovie = async (movie) => {
    return await movie_model_1.MovieModel.create(movie);
};
exports.createMovie = createMovie;
// 2. Get all movies (no limit, sorted by release date descending)
const getAllMovies = async () => {
    return await movie_model_1.MovieModel.find().sort({ releaseDate: -1 });
};
exports.getAllMovies = getAllMovies;
// 3. Get movie by ID
const getMovieById = async (id) => {
    return await movie_model_1.MovieModel.findById(id);
};
exports.getMovieById = getMovieById;
// 4. Get top movies by votes (optional limit)
const getTopMovieByVotes = async (limit) => {
    return await movie_model_1.MovieModel.find()
        .sort({ votes: -1 })
        .limit(limit);
};
exports.getTopMovieByVotes = getTopMovieByVotes;
