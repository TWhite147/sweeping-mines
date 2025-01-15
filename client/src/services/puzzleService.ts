export const generatePuzzle = async (rows: number, cols: number, mines: number): Promise<number[][]> => {
  const response = await fetch("http://localhost:3000/puzzles/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rows, cols, mines }),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate puzzle: ${response.statusText}`);
  }

  const data = await response.json();
  return data.grid;
};

export const savePuzzle = async (
  userId: string,
  state: any,
  difficulty: string,
  timeSpent: number
): Promise<{ message: string; id: string }> => {
  const response = await fetch("http://localhost:3000/puzzles/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, state, difficulty, timeSpent }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save puzzle: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
