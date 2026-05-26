import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../apis/axiosWrapper";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/signup", form);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-purple-100 via-pink-50 to-white">
      <form
        onSubmit={submit}
        className="w-96 bg-white/90 backdrop-blur-sm p-8 rounded-2xl space-y-5
                   border border-purple-100
                   shadow-[0_20px_60px_rgba(139,92,246,0.15)]
                   hover:shadow-[0_25px_80px_rgba(139,92,246,0.2)]
                   transition-all duration-300"
      >
        <div className="h-1.5 w-20 bg-gradient-to-r from-purple-500 to-pink-500 
                        rounded-full mx-auto"></div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500">
          Movies • Events • Shows
        </p>

        <input
          type="text"
          placeholder="Username"
          required
          className="w-full p-3 border border-gray-200 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                     transition-all duration-200 bg-white"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 border border-gray-200 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                     transition-all duration-200 bg-white"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border border-gray-200 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                     transition-all duration-200 bg-white"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500
                     hover:from-purple-700 hover:to-pink-600
                     text-white py-3 rounded-xl font-bold
                     transition-all duration-300 transform hover:-translate-y-0.5
                     shadow-lg shadow-purple-300/40 hover:shadow-xl hover:shadow-purple-400/50"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-800 hover:underline transition-colors">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
