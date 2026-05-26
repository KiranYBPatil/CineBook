import React from "react";
import { languages } from "../../utils/constants";

const MovieFilters = () => {
  return (
    <div className="w-full md:w-1/4 p-4 space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">Filters</h2>

      {/* Language */}
      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">Languages</span>
          <button className="text-purple-600 text-sm hover:text-purple-800 transition-colors">Clear</button>
        </div>

        <div className="flex flex-wrap gap-2">
          {languages.map((lang, i) => (
            <span
              key={i}
              className="border border-gray-200 text-purple-600 px-3 py-1 text-sm rounded-full hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-all duration-200"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Genres Block */}
<div className="bg-white/80 backdrop-blur-sm mt-3 p-4 rounded-xl shadow-sm border border-gray-100">
  <div className="flex justify-between items-center mb-2">
    <span className="font-semibold text-gray-700">Genres</span>
    <button className="text-purple-600 text-sm hover:text-purple-800 transition-colors">Clear</button>
  </div>
</div>

{/* Format Block */}
<div className="bg-white/80 backdrop-blur-sm -mt-3 p-4 rounded-xl shadow-sm border border-gray-100">
  <div className="flex justify-between items-center mb-2">
    <span className="font-semibold text-gray-700">Format</span>
    <button className="text-purple-600 text-sm hover:text-purple-800 transition-colors">Clear</button>
  </div>
</div>

   <button
  className="
    w-full
    border-2 border-purple-500
    cursor-pointer
    py-2
    rounded-xl
    text-purple-600 font-semibold
    hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500
    hover:text-white
    transition-all duration-300
  "
>
  Browse by Cinemas
</button>


    </div>
  );
};

export default MovieFilters;
