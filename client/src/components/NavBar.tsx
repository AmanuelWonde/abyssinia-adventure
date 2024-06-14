import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

interface NavProps {
  color?: string;
}
const Navbar = ({ color }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navColor, setNavColor] = useState(false);

  const getUserId = Cookies.get("user_id");
  useEffect(() => {
    // Check if the user is logged in based on the presence of a cookie
    const userId = Cookies.get("user_id");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", changeNavColor);
    return () => window.removeEventListener("scroll", changeNavColor);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear the cookies
      Cookies.remove("user_id");
      Cookies.remove("username");
      // Set the logged-in state to false
      setIsLoggedIn(false);
    }
  };

  const changeNavColor = () => {
    window.scrollY >= 90 ? setNavColor(true) : setNavColor(false);
  };

  return (
    <nav
      className={`shadow-lg fixed w-full opacity-65 top-0 right-0 z-50 ${
        color ? color : `bg-black/10`
      } ${navColor ? "bg-gray-900" : ""} backdrop-blur-lg py-4 sm:py-0 `}
      data-aos="fade-down"
    >
      <div className="max-w-8xl mx-auto px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            {/* Logo or Title */}
            <Link to="/" className="flex items-center py-4 px-1">
              <span className="font-bold text-blue-500 text-3xl hover:text-blue-600 transition-all duration-300">
                <span className=" text-green-400">ABYSS</span>
                <span className=" text-yellow-400">INIA ADVEN</span>
                <span className=" text-red-400">TURES</span>
              </span>
            </Link>
          </div>
          {/* Primary Navbar items */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="py-2 px-4 text-white text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="py-2 px-4 text-white text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
            >
              About
            </Link>
            <Link
              to={getUserId ? "/post-place" : "/auth/login"}
              className="py-2 px-4 text-white text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
            >
              Post place
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="py-2 px-4 text-white text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 text-white text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="py-2 px-4 text-white text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="py-2 px-4 text-white text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none mobile-menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-700 hover:text-blue-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <Link
          to="/"
          className="block text-sm px-4 py-2 text-white font-semibold hover:text-blue-600 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="block text-sm px-4 py-2 text-white font-semibold hover:text-blue-600 transition-colors duration-300"
        >
          About
        </Link>
        <Link
          to="/posts"
          className="block text-sm px-4 py-2 text-white font-semibold hover:text-blue-600 transition-colors duration-300"
        >
          Posts
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className="block text-sm px-4 py-2 text-white font-semibold hover:text-blue-600 transition-colors duration-300"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block text-sm px-4 py-2 text-white font-semibold hover:text-blue-600 transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth/login"
              className="block text-sm px-4 py-2 text-white font-semibold hover:text-blue-600 transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="block text-sm px-4 py-2 text-white font-semibold hover:text-blue-600 transition-colors duration-300"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
