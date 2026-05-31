"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.auth, booking_controller_1.createBooking);
router.get("/me", auth_middleware_1.auth, booking_controller_1.getUserBookings);
exports.default = router;
