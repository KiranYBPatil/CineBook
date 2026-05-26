import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSeat } from "../context/SeatContext";
import { createBooking } from "../apis";

const Checkout = () => {
  const { selectedSeats, clearSeats } = useSeat();
  const navigate = useNavigate();

  // ✅ ONLY phone & upi
  const [user, setUser] = useState({
    phone: "",
    upi: "",
  });

  const totalAmount = selectedSeats.reduce(
    (sum, seat) => sum + seat.price,
    0
  );

  // ✅ Phone validation
  const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const handlePayment = async () => {
    // 🔴 Empty check
    if (!user.phone || !user.upi) {
      toast.error("Please enter mobile number and UPI ID");
      return;
    }

    // 🔴 Phone validation
    if (!isValidPhone(user.phone)) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }

    // 🔴 Seat check
    if (selectedSeats.length === 0) {
      toast.error("Select at least one seat");
      return;
    }

    try {
      const firstSeat = selectedSeats[0];

      // ✅ FINAL PAYLOAD (user comes from JWT in backend)
      const payload = {
        phone: user.phone,
        upi: user.upi,

        movie: firstSeat.movieId,
        theater: firstSeat.theaterId,
        showId: firstSeat.showId,

        showDate: firstSeat.date,
        showTime: firstSeat.time,

        seats: selectedSeats.map(
          (seat) => `${seat.row}${seat.number}`
        ),

        amount: totalAmount,
      };

      await createBooking(payload);

      clearSeats();
      toast.success("🎉 Booking Successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || error.message || "Booking failed";
      toast.error(`Booking failed: ${errorMsg}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white p-6">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-[0_20px_60px_rgba(139,92,246,0.15)] space-y-4 border border-purple-100">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
          Payment Details
        </h2>

        {/* MOBILE NUMBER */}
        <input
          placeholder="Mobile Number (10 digits)"
          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
          value={user.phone}
          onChange={(e) =>
            setUser({
              ...user,
              phone: e.target.value.replace(/\D/g, ""),
            })
          }
          maxLength={10}
        />

        {/* UPI ID */}
        <input
          placeholder="UPI ID (eg: name@upi)"
          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200"
          value={user.upi}
          onChange={(e) =>
            setUser({ ...user, upi: e.target.value })
          }
        />

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-400/50 hover:scale-[1.02] transition-all duration-300"
        >
          Pay ₹{totalAmount}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
