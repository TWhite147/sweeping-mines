import { Link } from "react-router-dom";

function Navbar(): JSX.Element {
  return (
    <div className="flex justify-end items-center border-b-2 border-gray-300 py-4 px-6 bg-white">
      <Link
        to="/"
        className="mx-4 text-gray-700 hover:text-blue-500 font-medium transition"
      >
        Home
      </Link>
      <Link
        to="/games"
        className="mx-4 text-gray-700 hover:text-blue-500 font-medium transition"
      >
        Games
      </Link>
      <Link
        to="/leaderboard"
        className="mx-4 text-gray-700 hover:text-blue-500 font-medium transition"
      >
        Leaderboard
      </Link>
    </div>
  );
}

export default Navbar;
