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
    <div>
      <h1>Leaderboard</h1>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.time} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardPage;
