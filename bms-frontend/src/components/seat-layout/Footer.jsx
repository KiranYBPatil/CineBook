import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSeat } from "../../context/SeatContext";

const Footer = () => {
  const navigate = useNavigate();
  const { showId, state } = useParams();
  const { selectedSeats } = useSeat();

  /* ---------- NO SEATS SELECTED : LEGEND ---------- */
  if (!selectedSeats || selectedSeats.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-xs font-bold text-purple-600 tracking-wider">
          SCREEN THIS WAY
        </p>

        <div className="flex gap-4 text-xs mt-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border border-gray-400 rounded-[4px]" />
            <span className="text-gray-600">Available</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded-[4px] flex items-center justify-center">
              <small className="-mt-1">×</small>
            </div>
            <span className="text-gray-600">Occupied</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-[4px]" />
            <span className="text-gray-600">Selected</span>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- SEATS SELECTED : PROCEED BAR ---------- */
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-200 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="text-gray-700 font-semibold text-base">
          {selectedSeats.length} Selected
        </p>

        <button
          onClick={() =>
            navigate(`/shows/${showId}/${state || "KA"}/checkout`)
          }
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Footer;
