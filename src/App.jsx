import Player from "./components/player";
import GameBoard from "./components/gameBoard";
import { useState } from "react";
import Log from "./components/log";
import { WINNING_COMBINATIONS } from "./winningCombination";
import GameOver from "./components/gameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  0: "Player 2",
};

function derivedActivePlayer(gameTurns) {
  let playerName = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    playerName = "0";
  }
  return playerName;
}

function deriveGamboard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((e) => [...e])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, playerNames) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerNames[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);

  const currentActivePlayer = derivedActivePlayer(gameTurns);
  let gameBoard = deriveGamboard(gameTurns);
  let winner = deriveWinner(gameBoard, playerNames);

  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGame) => {
      let playerName = derivedActivePlayer(prevGame);
      const updateGame = [
        { square: { row: rowIndex, col: colIndex }, player: playerName },
        ...prevGame,
      ];
      return updateGame;
    });
  }
  function restartGame() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames((prevName) => {
      return {
        ...prevName,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={currentActivePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS[0]}
            symbol="0"
            isActive={currentActivePlayer === "0"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} handleRematch={restartGame} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
