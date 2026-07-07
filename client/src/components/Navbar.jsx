import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        {/* Logo */}

        <Link to={user ? "/dashboard" : "/"}>
          <h1 className="text-3xl font-bold text-blue-600">CareerForge</h1>
        </Link>

        {/* Navigation */}

        {!user ? (
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </Link>

            <Link
              to="/resume-builder"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Resume Builder
            </Link>

            <Link
              to="/my-resumes"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              My Resumes
            </Link>

            <Link
              to="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
