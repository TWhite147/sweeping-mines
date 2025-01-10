import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../services/leaderboardService";

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [difficulty, setDifficulty] = useState<string>("easy");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(difficulty);
        setLeaderboard(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch leaderboard. Please try again later.");
      }
    };

    fetchLeaderboard();
  }, [difficulty]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Leaderboard</h1>
      <select className="flex justify-center mb-6"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <ul className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
        {leaderboard.map((entry, index) => (
          <li className="py-2 px-4" key={index}>
            {entry.username}: {entry.time} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardPage;
