export const generatePuzzle = (rows, cols, mines) => {
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  let mineCount = 0;

  while (mineCount < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);

    if (grid[r][c] === 0) {
      grid[r][c] = -1;
      mineCount++;

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] !== -1) {
            grid[nr][nc]++;
          }
        }
      }
    }
  }

  return grid;
};
