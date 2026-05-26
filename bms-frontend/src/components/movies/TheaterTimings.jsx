import React, { useState } from "react";
import dayjs from "dayjs";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getShowsByMovieAndLocation } from "../../apis";
import { useLocation } from "../../context/LocationContext";
import { useNavigate } from "react-router-dom";

const TheaterTimings = ({ movieId }) => {
  const navigate = useNavigate();
  const { location } = useLocation();

  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today);

  const formattedDate = selectedDate.format("DD-MM-YYYY");

  const next7days = Array.from({ length: 7 }, (_, i) =>
    today.add(i, "day")
  );

  const {
    data: showData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["show", movieId, location, formattedDate],
    queryFn: () =>
      getShowsByMovieAndLocation(movieId, location, formattedDate),
    placeholderData: keepPreviousData,
    enabled: !!movieId && !!location,
    select: (res) => res.data,
  });

  if (isLoading) {
    return <p className="text-center py-6 text-gray-500 animate-pulse">Loading shows...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-6 text-red-500">
        Failed to load shows
      </p>
    );
  }

  return (
    <>
      <hr className="my-2 border-gray-200" />

      {/* Date Selector */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto py-4 px-2">
        {next7days.map((date, i) => {
          const isSelected = selectedDate.isSame(date, "day");

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl min-w-[50px] border transition-all duration-200 ${
                isSelected
                  ? "bg-gradient-to-b from-purple-600 to-pink-500 text-white font-bold shadow-lg shadow-purple-300/30 scale-105"
                  : "text-gray-600 hover:bg-purple-50 hover:border-purple-200 border-gray-200"
              }`}
            >
              <span className="text-sm font-black">{date.format("D")}</span>
              <span className="text-xs">{date.format("ddd")}</span>
              <span className="text-[10px]">
                {date.format("MMM").toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Theater List */}
      <div className="space-y-8 px-4 mb-10">
        {showData?.length === 0 && (
          <div className="text-center text-gray-500">
            No shows available for selected date.
          </div>
        )}

        {showData?.map((curr, i) => (
          <div key={i}>
            {/* Theater Info */}
            <div className="flex items-start gap-3 mb-2">
              <img
                src={curr.theater.theaterDetails.logo}
                alt="logo"
                className="w-8 h-8 object-contain rounded-lg"
              />
              <div>
                <p className="font-bold text-gray-800">
                  {curr.theater.theaterDetails.name}
                </p>
                <p className="text-sm text-gray-500">
                  {curr.theater.theaterDetails.cancellation}
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex flex-wrap gap-3 ml-11">
              {
               curr.theater.shows.map((slot, i) => {
                const theaterId = curr.theater.theaterDetails._id;
                const movieName = curr.movie.title;

                return(
                  <button 
                  onClick = {() => navigate(`/movies/${movieId}/${movieName}/${location}/theater/${theaterId}/show/${slot._id}/seat-layout`)}
                  key={i}
                  className="border hover:bg-purple-50 hover:border-purple-300 border-gray-200 rounded-[16px] px-12 py-2 text-sm flex flex-col items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span className="leading-tight font-semibold text-gray-700">
                    {slot.startTime}
                  </span>
                  <span className="text-[10px] text-gray-400 font-black">
                    {slot.audioType.toUpperCase()}
                  </span>
                </button>
                )
               }

                
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TheaterTimings;
