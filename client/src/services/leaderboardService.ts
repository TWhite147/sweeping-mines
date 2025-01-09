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

export const saveScore = async (
  username: string,
  time: bigint,
  difficulty: string
): Promise<{ message: string; id: string }> => {
  const response = await fetch("http://localhost:3000/leaderboard/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, time, difficulty}),
  });

  if (!response.ok) {
    throw new Error(`Failed to save puzzle: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};