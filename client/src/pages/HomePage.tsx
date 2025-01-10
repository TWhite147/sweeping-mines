import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-gray-800">
      <h1 className="text-5xl font-bold mb-8 text-blue-600">Welcome to Minesweeper</h1>
      <p className="text-xl mb-6 text-center">Play the classic game of Minesweeper online!</p>
    </div>
  );
};

export default HomePage;
