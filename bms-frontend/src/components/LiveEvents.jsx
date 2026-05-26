import React from "react";
import { events } from "../utils/constants";

const LiveEvents = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
        The Best Of Live Events
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {events.map((event, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden relative group shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/40"
          >
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-56 object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveEvents;
