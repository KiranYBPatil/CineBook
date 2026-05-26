import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../apis/axiosWrapper";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      login(res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-[#0f0f13] dark:via-[#1a1a23] dark:to-[#0f0f13]">
      <form
        onSubmit={submit}
        className="w-96 bg-white dark:bg-[#1e1e2d] p-8 rounded-2xl space-y-5
                   border border-gray-200 dark:border-gray-700
                   shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                   hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]
                   transition"
      >
        {/* Movie accent strip */}
        <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 
                        rounded-full mx-auto"></div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Continue booking your favourites
        </p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl
                     focus:outline-none focus:ring-2 
                     focus:ring-purple-400 focus:border-purple-400
                     bg-[var(--bg-primary)] text-[var(--text-primary)]"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl
                     focus:outline-none focus:ring-2 
                     focus:ring-purple-400 focus:border-purple-400
                     bg-[var(--bg-primary)] text-[var(--text-primary)]"
        />

        <button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500
                     hover:from-purple-700 hover:to-pink-600
                     text-white py-3 rounded-xl font-semibold
                     transition transform hover:-translate-y-0.5"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          New user?{" "}
          <Link to="/signup" className="text-purple-600 dark:text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
