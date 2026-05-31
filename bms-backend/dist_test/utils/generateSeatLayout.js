"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSeatLayout = void 0;
const generateSeatLayout = () => {
    const rows = [
        { row: "A", category: "PREMIUM", seatCount: 12 },
        { row: "B", category: "PREMIUM", seatCount: 12 },
        { row: "C", category: "EXECUTIVE", seatCount: 14 },
        { row: "D", category: "EXECUTIVE", seatCount: 14 },
        { row: "E", category: "NORMAL", seatCount: 16 },
        { row: "F", category: "NORMAL", seatCount: 16 },
    ];
    return rows.map((r) => ({
        row: r.row,
        category: r.category,
        seats: Array.from({ length: r.seatCount }, (_, i) => ({
            number: i + 1,
            status: "AVAILABLE",
        })),
    }));
};
exports.generateSeatLayout = generateSeatLayout;
