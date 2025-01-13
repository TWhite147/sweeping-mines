import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-gray-800">
      <h1 className="text-5xl font-bold mb-8 text-blue-600">Welcome to Minesweeper</h1>
      <p className="text-xl mb-6 text-center">Play the classic game of Minesweeper online!</p>
      <Link
        to="/games"
        className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600 transition"
      >
        Play Now
      </Link>
    </div>
  );
};

export default HomePage;
