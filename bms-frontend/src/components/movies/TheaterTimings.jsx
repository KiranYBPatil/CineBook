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
    return <p className="text-center py-6 text-[var(--text-primary)]">Loading shows...</p>;
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
      <hr className="my-2 border-gray-200 dark:border-gray-700" />

      {/* Date Selector */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto py-4 px-2">
        {next7days.map((date, i) => {
          const isSelected = selectedDate.isSame(date, "day");

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg min-w-[50px] border border-gray-200 dark:border-gray-600 ${
                isSelected
                  ? "bg-black dark:bg-gray-700 text-white font-semibold"
                  : "text-black dark:text-[var(--text-primary)] hover:bg-gray-100 dark:hover:bg-gray-800"
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
          <div className="text-center text-gray-500 dark:text-gray-400">
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
                className="w-8 h-8 object-contain"
              />
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  {curr.theater.theaterDetails.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
                  className="border hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-[16px] px-12 py-2 text-sm flex flex-col items-center justify-center bg-[var(--bg-card)]"
                >
                  <span className="leading-tight font-semibold text-[var(--text-primary)]">
                    {slot.startTime}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black">
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
