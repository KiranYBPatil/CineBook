import React from "react";
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
      className={`w-9 h-9 m-[2px] rounded-lg border text-sm
        ${
          isBooked
            ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
            : "hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        }
        ${isSelected ? "bg-purple-600 text-white" : "bg-[var(--bg-card)] text-[var(--text-primary)] border-gray-300 dark:border-gray-600"}
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

  /* ✅ GROUP BY CATEGORY (NO GUESSING) */
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
    return <div className="p-6 text-[var(--text-primary)]">Loading seats...</div>;
  }

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Select at least one seat!");
      return;
    }
    navigate(`/shows/${showId}/${state}/checkout`);
  };

  return (
    <div className="h-screen overflow-hidden bg-[var(--bg-primary)] transition-colors duration-200">
      <div className="fixed top-0 left-0 w-full z-10">
        <Header showData={showData} />
      </div>

      <div className="max-w-7xl mx-auto mt-[210px] px-6 pb-4 h-[calc(100vh-320px)] overflow-y-scroll">
        <div className="flex flex-col items-center">
          {Object.entries(groupedSeats).map(
            ([category, { price, rows }]) => (
              <div key={category} className="mb-12 w-full text-center">
                <h2 className="font-semibold text-lg mb-4 text-[var(--text-primary)]">
                  {category} : ₹{price}
                </h2>

                {rows.map((rowObj) => (
                  <div
                    key={rowObj.row}
                    className="flex items-center justify-center mb-2"
                  >
                    <div className="w-6 mr-2 text-sm text-gray-600 dark:text-gray-400">
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

        <div className="flex justify-center mt-6">
          <img src={screenImg} alt="Screen" className="w-[400px]" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-[100px] bg-[var(--bg-primary)] dark:bg-[#1a1a23] border-t border-[var(--border-color)] px-6 py-4 flex justify-between items-center">
        <p className="font-medium text-gray-700 dark:text-gray-300">
          {selectedSeats.length} Selected
        </p>
        <button
          onClick={handleProceed}
          className="bg-black dark:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Proceed
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default SeatLayout;
