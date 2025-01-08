export const getLeaderboard = async (difficulty: string): Promise<any[]> => {
  const response = await fetch(`http://localhost:3000/leaderboard?difficulty=${difficulty}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
