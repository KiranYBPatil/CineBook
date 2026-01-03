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
        {/* PROFILE BUTTON */}
  <button
  onClick={() => navigate("/profile")}
  className="
    group relative
    flex items-center gap-2
    px-6 py-2.5
    rounded-full
    font-semibold text-purple-700

    bg-white/80 backdrop-blur
    border border-purple-200

    shadow-sm
    transition-all duration-300 ease-out

    hover:-translate-y-0.5
    hover:shadow-lg
    hover:border-purple-300
    hover:bg-white

    active:translate-y-0
    active:scale-95

    focus:outline-none
    focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
  "
>
  {/* ✨ Gradient glow ring */}
  <span
    className="
      absolute inset-0 rounded-full
      bg-gradient-to-r from-purple-500 to-pink-500
      opacity-0 blur
      group-hover:opacity-20
      transition-opacity duration-300
    "
  />

  {/* 👤 Icon */}
  <span
    className="
      relative text-lg
      transition-transform duration-300
      group-hover:scale-110
    "
  >
    👤
  </span>

  {/* Text */}
  <span className="relative">
    My Bookings
  </span>
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
