"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsByUserId = exports.createBooking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = __importDefault(require("./booking.model"));
const show_model_1 = require("../show/show.model");
const createBooking = async (data) => {
    const { showId, seats } = data;
    const show = await show_model_1.ShowModel.findById(showId);
    if (!show) {
        throw new Error("Show not found");
    }
    // 🔐 Check already booked seats
    const alreadyBooked = [];
    show.seatLayout.forEach((row) => {
        row.seats.forEach((seat) => {
            const seatId = `${row.row}${seat.number}`;
            if (seats.includes(seatId) && seat.status === "BOOKED") {
                alreadyBooked.push(seatId);
            }
        });
    });
    if (alreadyBooked.length > 0) {
        throw new Error(`Seats already booked: ${alreadyBooked.join(", ")}`);
    }
    // ✅ Lock seats
    show.seatLayout.forEach((row) => {
        row.seats.forEach((seat) => {
            const seatId = `${row.row}${seat.number}`;
            if (seats.includes(seatId)) {
                seat.status = "BOOKED";
            }
        });
    });
    await show.save();
    const booking = await booking_model_1.default.create(data);
    return booking;
};
exports.createBooking = createBooking;
const getBookingsByUserId = async (userId) => {
    return booking_model_1.default.find({
        "user.userId": new mongoose_1.default.Types.ObjectId(userId),
    })
        .populate("movie", "title")
        .populate("theater", "name")
        .sort({ createdAt: -1 });
};
exports.getBookingsByUserId = getBookingsByUserId;
