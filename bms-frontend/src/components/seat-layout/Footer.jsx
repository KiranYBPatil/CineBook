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
        <p className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-wider">
          SCREEN THIS WAY
        </p>

        <div className="flex gap-4 text-xs mt-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border rounded-[4px] border-gray-400 dark:border-gray-500" />
            <span className="text-[var(--text-primary)]">Available</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-200 dark:bg-gray-600 border rounded-[4px] flex items-center justify-center">
              <small className="-mt-1">×</small>
            </div>
            <span className="text-[var(--text-primary)]">Occupied</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-600 rounded-[4px]" />
            <span className="text-[var(--text-primary)]">Selected</span>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- SEATS SELECTED : PROCEED BAR ---------- */
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[var(--bg-primary)] dark:bg-[#1a1a23] border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="text-gray-700 dark:text-gray-300 font-medium text-base">
          {selectedSeats.length} Selected
        </p>

        <button
          onClick={() =>
            navigate(`/shows/${showId}/${state || "KA"}/checkout`)
          }
          className="bg-black dark:bg-purple-700 text-white px-10 py-3 rounded-xl font-semibold text-sm md:text-base"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Footer;
