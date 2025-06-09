import React, { useState } from "react";
import "./BT3+4.css";

const MarioGame = () => {
  const grid = [
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];
  const [position, setPosition] = useState({ row: 7, col: 3 });

  const move = (dr, dc) => {
    const newRow = position.row + dr;
    const newCol = position.col + dc;
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length &&
      grid[newRow][newCol] !== 1
    ) {
      setPosition({ row: newRow, col: newCol });
    }
  };

  const renderCell = (rowIdx, colIdx) => {
    const value = grid[rowIdx][colIdx];
    let className = "cell";
    if (position.row === rowIdx && position.col === colIdx) {
      return <div className={`${className} mario`}></div>;
    }
    if (value === 1) className += " wall";
    if (value === 3) className += " diamond";

    return <div className={className}></div>;
  };

  const findPathBFS = (grid, start, targetValue = 3) => {
    const rows = grid.length;
    const cols = grid[0].length;

    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

    const queue = [];
    queue.push(start);
    visited[start.row][start.col] = true;

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    while (queue.length > 0) {
      const { row, col } = queue.shift();

      if (grid[row][col] === targetValue) {
        const path = [];
        let curr = { row, col };
        while (curr) {
          path.push(curr);
          curr = parent[curr.row][curr.col];
        }
        path.reverse();
        return path;
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          !visited[newRow][newCol] &&
          grid[newRow][newCol] !== 1
        ) {
          visited[newRow][newCol] = true;
          parent[newRow][newCol] = { row, col };
          queue.push({ row: newRow, col: newCol });
        }
      }
    }
    return null;
  };

  const runAuto = () => {
    const path = findPathBFS(grid, position);
    if (!path || path.length < 2) return;

    let i = 1;
    const interval = setInterval(() => {
      setPosition(path[i]);
      i++;
      if (i >= path.length) clearInterval(interval);
    }, 300);
  };

  return (
    <div className="container">
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((_, colIdx) => renderCell(rowIdx, colIdx))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button className="buttondirection" onClick={() => move(-1, 0)}>
          Move Up
        </button>
        <button className="buttondirection" onClick={() => move(1, 0)}>
          Move Down
        </button>
        <button className="buttondirection" onClick={() => move(0, -1)}>
          Move Left
        </button>
        <button className="buttondirection" onClick={() => move(0, 1)}>
          Move Right
        </button>
        <button onClick={runAuto} className="buttonrun">
          Run
        </button>
      </div>
    </div>
  );
};

export default MarioGame;
