import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSeat } from "../context/SeatContext";
import { useQuery } from "@tanstack/react-query";
import { getShowById } from "../apis";
import Header from "../components/seat-layout/Header";
import Footer from "../components/seat-layout/Footer";
import screenImg from "../assets/screen.png";

/* ---------------- Seat Button ---------------- */
const Seat = ({
  seat,
  row,
  price,
  toggleSeat,
  selectedSeats,
  bookedSeats,
  showData,
}) => {
  const seatId = `${row}${seat.number}`;

  const isSelected = selectedSeats.some((s) => s.id === seatId);
  const isBooked = bookedSeats.includes(seatId);

  return (
    <button
      disabled={isBooked}
      onClick={() => {
        if (isBooked) {
          alert("This seat is already booked ❌");
          return;
        }

        toggleSeat({
          id: seatId,
          row,
          number: seat.number,
          price,

          movieId: showData.movie._id,
          showId: showData._id,
          theaterId: showData.theater._id,

          movieName: showData.movie.title,
          theater: showData.theater.name,
          date: showData.date,
          time: showData.startTime,
        });
      }}
      className={`w-9 h-9 m-[2px] rounded-lg border text-sm font-medium transition-all duration-150
        ${isBooked
          ? "bg-gray-300 text-white cursor-not-allowed border-gray-300"
          : "hover:bg-purple-100 hover:border-purple-400 cursor-pointer bg-white border-gray-300 text-gray-700"
        }
        ${isSelected
          ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white border-purple-600 shadow-md shadow-purple-300/40 scale-105"
          : ""
        }
      `}
      title={isBooked ? "Seat already booked" : "Available"}
    >
      {isBooked ? "X" : seat.number}
    </button>
  );
};

/* ---------------- Seat Layout Page ---------------- */
const SeatLayout = () => {
  const { showId, state } = useParams();
  const navigate = useNavigate();
  const { selectedSeats, toggleSeat } = useSeat();

  /* 🍿 POPCORN STATE */
  const [popcorn, setPopcorn] = useState(false);
  const popcornPrice = 150;

  const { data: showData, isLoading } = useQuery({
    queryKey: ["show", showId],
    queryFn: async () => (await getShowById(showId)).data,
    enabled: !!showId,
  });

  /* ✅ BOOKED SEATS */
  const bookedSeats = [];
  showData?.seatLayout.forEach((row) => {
    row.seats.forEach((seat) => {
      if (seat.status === "BOOKED") {
        bookedSeats.push(`${row.row}${seat.number}`);
      }
    });
  });

  /* ✅ GROUP BY CATEGORY */
  const groupedSeats = {};
  showData?.seatLayout.forEach((rowObj) => {
    const category = rowObj.category;
    const price = showData.priceMap[category];

    if (!groupedSeats[category]) {
      groupedSeats[category] = {
        price,
        rows: [],
      };
    }

    groupedSeats[category].rows.push(rowObj);
  });

  if (isLoading) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading seats...
      </div>
    );
  }

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Select at least one seat!");
      return;
    }

    navigate(`/shows/${showId}/${state}/checkout`, {
      state: {
        popcorn,
        popcornPrice: popcorn ? popcornPrice : 0,
      },
    });
  };

  const totalSeatsPrice = selectedSeats.reduce(
    (sum, seat) => sum + seat.price,
    0
  );

  const totalAmount =
    totalSeatsPrice + (popcorn ? popcornPrice : 0);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="fixed top-0 left-0 w-full z-10">
        <Header showData={showData} />
      </div>

      <div className="max-w-7xl mx-auto mt-[210px] px-6 pb-4 h-[calc(100vh-320px)] overflow-y-scroll">
        <div className="flex flex-col items-center">
          {Object.entries(groupedSeats).map(
            ([category, { price, rows }]) => (
              <div key={category} className="mb-12 w-full text-center">
                <h2 className="font-bold text-lg mb-4 text-gray-700">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    {category}
                  </span>{" "}
                  : ₹{price}
                </h2>

                {rows.map((rowObj) => (
                  <div
                    key={rowObj.row}
                    className="flex items-center justify-center mb-2"
                  >
                    <div className="w-6 mr-2 text-sm font-semibold text-gray-500">
                      {rowObj.row}
                    </div>

                    <div className="flex gap-1">
                      {rowObj.seats.map((seat) => (
                        <Seat
                          key={seat.number}
                          seat={seat}
                          row={rowObj.row}
                          price={price}
                          toggleSeat={toggleSeat}
                          selectedSeats={selectedSeats}
                          bookedSeats={bookedSeats}
                          showData={showData}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* SCREEN */}
        <div className="flex justify-center mt-6">
          <img
            src={screenImg}
            alt="Screen"
            className="w-[400px] opacity-80"
          />
        </div>
      </div>

      {/* 🍿 POPCORN OPTION BAR */}
      <div className="fixed bottom-[100px] left-0 w-full bg-yellow-50 border-t border-yellow-200 px-6 py-3 flex justify-center items-center gap-6">
        <label className="flex items-center gap-2 font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={popcorn}
            onChange={() => setPopcorn(!popcorn)}
            className="w-4 h-4"
          />
          Add Popcorn 🍿 (+₹{popcornPrice})
        </label>
      </div>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 w-full h-[100px] bg-white/90 backdrop-blur-sm border-t border-gray-200 px-6 py-4 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="text-sm text-gray-700">
          <p className="font-semibold">
            Seats: ₹{totalSeatsPrice}
          </p>
          {popcorn && (
            <p className="text-yellow-600 font-medium">
              Popcorn: ₹{popcornPrice}
            </p>
          )}
          <p className="font-bold mt-1">
            Total: ₹{totalAmount}
          </p>
        </div>

        <button
          onClick={handleProceed}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300"
        >
          Proceed
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default SeatLayout;