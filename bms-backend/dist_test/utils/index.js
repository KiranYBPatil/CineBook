"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupShowsByTheaterAndMovie = exports.generateSeatLayout = exports.isValidEmail = void 0;
/* =========================================================
   VALIDATIONS
========================================================= */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
/* =========================================================
   EXPORTS
========================================================= */
var generateSeatLayout_1 = require("./generateSeatLayout");
Object.defineProperty(exports, "generateSeatLayout", { enumerable: true, get: function () { return generateSeatLayout_1.generateSeatLayout; } });
/* =========================================================
   GROUP SHOWS BY THEATER & MOVIE
========================================================= */
const groupShowsByTheaterAndMovie = (shows) => {
    const grouped = {};
    shows.forEach((show) => {
        const movieId = typeof show.movie === "object" ? show.movie._id : show.movie;
        const theaterId = typeof show.theater === "object" ? show.theater._id : show.theater;
        const key = `${movieId}_${theaterId}`;
        if (!grouped[key]) {
            grouped[key] = {
                movie: show.movie,
                theater: {
                    theaterDetails: show.theater,
                    shows: [],
                },
            };
        }
        grouped[key].theater.shows.push({
            _id: show._id?.toString() || "",
            date: show.date || "",
            startTime: show.startTime || "",
            format: show.format || "",
            audioType: show.audioType || "",
        });
    });
    return Object.values(grouped);
};
exports.groupShowsByTheaterAndMovie = groupShowsByTheaterAndMovie;
