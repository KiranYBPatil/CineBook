"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_route_1 = __importDefault(require("../modules/movie/movie.route"));
const show_routes_1 = __importDefault(require("../modules/show/show.routes"));
const theater_routes_1 = __importDefault(require("../modules/theater/theater.routes"));
const booking_routes_1 = __importDefault(require("../modules/booking/booking.routes")); // ✅ default import
const user_routes_1 = __importDefault(require("../modules/user/user.routes")); // here i got red underline error for "../modules/user/user.routes"
const router = (0, express_1.Router)();
router.use("/movies", movie_route_1.default);
router.use("/shows", show_routes_1.default);
router.use("/theaters", theater_routes_1.default);
router.use("/bookings", booking_routes_1.default);
router.use("/user", user_routes_1.default); // ✅ ADD THIS
exports.default = router;
