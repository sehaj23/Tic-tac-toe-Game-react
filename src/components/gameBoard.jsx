import { useState } from "react";


export default function GameBoard({ onSelectSquare, board }) {
  
  //   const [gameBoard, setGameBoard] = useState(intialGameBoard);

  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((previousGameboard) => {
  //       const updateGameBoard = [...previousGameboard.map((e) => [...e])];
  //       updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updateGameBoard;
  //     });
  //     onSelectSquare()
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol != null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
