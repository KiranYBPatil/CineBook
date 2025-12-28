import React from "react";
import { useNavigate } from "react-router-dom";
import BannerSlider from "../components/shared/BannerSlider";
import Recommended from "../components/Recommended";
import LiveEvents from "../components/LiveEvents";

const Home = () => {
  const navigate = useNavigate();

  const handleAskAI = () => {
    window.open(
      "https://movie-frontend-3mve.vercel.app/",
      "_blank"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-10">

      {/* TOP RIGHT ACTION BUTTONS */}
      <div className="flex justify-end gap-4">
        
        {/* MY BOOKINGS BUTTON */}
        <button
          onClick={() => navigate("/my-bookings")}
          className="px-6 py-2 bg-purple-700 text-white rounded-lg 
                     hover:bg-purple-800 transition shadow-md"
        >
          My Bookings
        </button>

        {/* ASK AI BUTTON */}
        <button
          onClick={handleAskAI}
          className="flex items-center gap-2 px-6 py-2 
                     bg-gradient-to-r from-purple-700 to-pink-600 
                     text-white font-semibold rounded-full 
                     shadow-lg hover:scale-105 hover:shadow-xl transition"
        >
          🤖 ASK AI
        </button>

      </div>

      {/* BANNER SLIDER */}
      <BannerSlider />

      {/* RECOMMENDED MOVIES */}
      <Recommended />

      {/* LIVE EVENTS */}
      <LiveEvents />

    </div>
  );
};

export default Home;
