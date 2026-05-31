"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBookings = exports.createBooking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookingService = __importStar(require("./booking.service"));
const createBooking = async (req, res, _next) => {
    try {
        const authReq = req;
        if (!authReq.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { movie, theater, showId, showDate, showTime, seats, amount, } = req.body;
        if (!movie ||
            !theater ||
            !showId ||
            !showDate ||
            !showTime ||
            !seats?.length ||
            !amount) {
            res.status(400).json({
                success: false,
                message: "Missing required booking details",
            });
            return;
        }
        const formattedSeats = seats.map((seat) => typeof seat === "string" ? seat : `${seat.row}${seat.number}`);
        const bookingPayload = {
            user: {
                userId: new mongoose_1.default.Types.ObjectId(authReq.user.id),
                email: authReq.user.email,
                username: authReq.user.username, // ✅ FROM JWT
            },
            movie: new mongoose_1.default.Types.ObjectId(movie),
            theater: new mongoose_1.default.Types.ObjectId(theater),
            showId: new mongoose_1.default.Types.ObjectId(showId),
            showDate,
            showTime,
            seats: formattedSeats,
            amount,
        };
        const booking = await BookingService.createBooking(bookingPayload);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Booking failed",
        });
    }
};
exports.createBooking = createBooking;
const getUserBookings = async (req, res) => {
    const authReq = req;
    if (!authReq.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const bookings = await BookingService.getBookingsByUserId(authReq.user.id);
    res.status(200).json({
        success: true,
        data: bookings,
    });
};
exports.getUserBookings = getUserBookings;
