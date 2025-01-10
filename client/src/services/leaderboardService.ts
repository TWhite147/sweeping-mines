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

export const saveScore = async (data: {
  username: string;
  difficulty: string;
  time: number;
}) => {
  const response = await fetch("http://localhost:3000/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit score");
  }

  return response.json();
};