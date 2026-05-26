import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  // Hide Header & Footer on Seat Layout page
  const isSeatLayoutPage = useMatch(
    "/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout"
  );

  // Hide Header & Footer on Checkout page
  const isCheckoutPage = useMatch("/shows/:showId/:state/checkout");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {!isSeatLayoutPage && !isCheckoutPage && <Header />}

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/movies"
            element={token ? <Movies /> : <Navigate to="/login" />}
          />

          <Route
            path="/movies/:state/:movieName/:id/ticket"
            element={token ? <MovieDetails /> : <Navigate to="/login" />}
          />

          {/* Seat Layout */}
          <Route
            path="/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout"
            element={token ? <SeatLayout /> : <Navigate to="/login" />}
          />

          {/* Checkout */}
          <Route
            path="/shows/:showId/:state/checkout"
            element={token ? <Checkout /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>

      {/* Footer */}
      {!isSeatLayoutPage && !isCheckoutPage && <Footer />}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
