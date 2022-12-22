import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import "./css/GameBoard.css";

export default function GameBoard() {
  const [game, setGame] = useState(new Chess());
  const [moveSuccessful, setMoveSuccessful] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [customSquareStyles, setCustomSquareStyles] = useState({});
  const moves = game.history({ verbose: true });

  function makeAMove(move) {
    const result = game.move(move);
    setGame(game);
    setMoveSuccessful(true);
    return result;
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
    });

    if (move === null) {
      console.log("error");
      return false;
    }
    setCustomSquareStyles({});
    return true;
  }

  function onSquareClick(square) {
    const legalMoves = game.moves({ square: square, verbose: true });

    if (Object.keys(customSquareStyles).length === 0) {
      if (legalMoves.length > 0) {
        const targetSquares = legalMoves.map((move) => move.to);
        targetSquares.forEach((targetSquare) => {
          customSquareStyles[targetSquare] = {
            backgroundColor: "rgba(255, 255, 0, 0.5)",
          };
        });
        customSquareStyles[square] = {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        };
        setCustomSquareStyles(customSquareStyles);
        setSelectedSquare(square);
      }
    } else setCustomSquareStyles({});

    if (selectedSquare) {
      if (makeAMove({ from: selectedSquare, to: square }))
        setSelectedSquare(null);
      else setSelectedSquare(square);
    }
  }

  function rightClick() {
    setCustomSquareStyles({});
    setSelectedSquare(null);
  }

  function handleUndoClick() {
    game.undo();
    setMoveSuccessful(true);
  }

  function updateMovesList() {
    document.getElementById("move-list").innerHTML = "";
    moves.forEach((move) => {
      const moveElement = document.createElement("div");
      moveElement.textContent = `${move.from}-${move.to}`;
      document.getElementById("move-list").appendChild(moveElement);
    });
  }

  useEffect(() => {
    setMoveSuccessful(false);
    updateMovesList();
  }, [moveSuccessful]);

  return (
    <div className="Main">
      <div className="chess-app">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          onSquareClick={onSquareClick}
          customSquareStyles={customSquareStyles}
          onSquareRightClick={rightClick}
          customDarkSquareStyle={{ backgroundColor: "#6c809a" }}
          customLightSquareStyle={{ backgroundColor: "#edeed1" }}
        />
        <div id="move-list"></div>
      </div>
      <button onClick={handleUndoClick}>Undo</button>
    </div>
  );
}
