import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../services/leaderboardService";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

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
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <label htmlFor="difficulty" className="block text-lg font-medium mb-2">
            Select Difficulty:
          </label>
          <select
            id="difficulty"
            className="border rounded-lg p-2 w-1/3 bg-white text-gray-800"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-2 text-left font-bold border-b pb-2">
            <span>User</span>
            <span>Time</span>
          </div>
          {leaderboard.map((entry, index) => (
            <div
              key={index}
              className="grid grid-cols-2 text-left py-2 border-b last:border-none"
            >
              <span>{entry.username}</span>
              <span>{formatTime(entry.time)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
