import React from "react";
import mainLogo from "../../assets/main-icon.png";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const Header = ({ showData, type }) => {
  const navigate = useNavigate();

  // Parse DD-MM-YYYY correctly
  const formattedDate =
    showData?.date
      ? dayjs(showData.date, "DD-MM-YYYY").format("D MMM YYYY")
      : "";

  return (
    <>
    <div className="border-b border-gray-200 shadow-sm bg-white/90 backdrop-blur-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={mainLogo}
          alt="booklyScreen"
          className="h-6 md:h-8 object-contain cursor-pointer transition-transform hover:scale-105"
        />

        {
          type === "checkout" ? (
            <div>
              <h2 className="font-bold text-gray-800 text-lg md:text-xl">Review your booking</h2>
            </div>
          ) : (
             <div className="text-center">
          <h2 className="font-bold text-lg md:text-xl text-gray-800">
            {showData?.movie?.title}
          </h2>

          <p className="text-xs text-gray-500 font-medium">
            {formattedDate}
            {showData?.startTime && ` · ${showData.startTime} at `}
            {showData?.theater?.name &&
              `${showData.theater.name}, ${showData.theater.city}, ${showData.theater.state}`}
          </p>
        </div>

          )
        }

        

        <button className="bg-gradient-to-r from-purple-600 to-pink-500 cursor-pointer text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300">
          Sign in
        </button>
      </div>
    </div>
    {/* Show Timings */}
    {
      type !== "checkout" &&(
         <div className="bg-white/90 backdrop-blur-sm pt-4">
  <div className="mx-auto px-6 pb-4 flex items-center gap-4 max-w-7xl">
    <div className="text-sm text-gray-600">
      <p className="text-xs text-gray-500 font-medium">
        {dayjs(showData?.date, "DD-MM-YYYY").format("ddd")}
      </p>

      <p className="text-sm font-bold text-gray-700">
        {dayjs(showData?.date, "DD-MM-YYYY").format("DD MMM")}
      </p>
    </div>
  



    {/* Show Time Button */}
    <button className="border cursor-pointer rounded-[14px] px-8 py-3 text-sm border-gray-300 font-medium bg-purple-50 text-gray-700 flex flex-col items-center hover:bg-purple-100 hover:border-purple-400 transition-all duration-200 shadow-sm hover:shadow-md">
      <span>{showData?.startTime}</span>
      <span className="text-[10px] text-gray-500 font-semibold">
        {showData?.audioType?.toUpperCase()}
      </span>
    </button>

  </div>
</div>

      )
    }

   
<hr className="my-2 border-gray-200 max-w-7x1 mx-auto" />


    </>
  );
};

export default Header;
