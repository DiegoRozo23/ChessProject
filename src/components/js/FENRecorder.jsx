import React, { useState } from "react";
import PropTypes from "prop-types";
import { Chessboard } from "react-chessboard";
import SparePieceMenu from "./SparePieceMenu";
import { Chess } from "chess.js";

function FENRecorder(props) {
  const [boardState, setBoardState] = useState({});
  const [game, setGame] = useState(new Chess());

  const updateBoard = (newState) => {
    setBoardState(newState);
  };

  const onDrop = (sourceSquare, targetSquare) => {
    boardState[targetSquare] = boardState[sourceSquare];
    delete boardState[sourceSquare];
    console.log(boardState);

    return true;
  };

  const destroyPiece = (square) => {
    if (Object.keys(boardState).length > 0) {
      Object.keys(boardState).forEach((currSquare) => {
        if (currSquare === square) {
          delete boardState[currSquare];
        }
      });
    }
  };

  const addGameLog = () => {
    const gameLog = document.createElement("li");
    Object.keys(boardState).forEach((square) => {
      gameLog.textContent += `${square}:${boardState[square]} `;
    });
    document.getElementById("gameHistoryLogContainer").appendChild(gameLog);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <SparePieceMenu
          prevBoardState={boardState}
          updateBoard={updateBoard}
          pieceColor="b"
        />
        <Chessboard
          position={boardState}
          onPieceDrop={onDrop}
          onSquareRightClick={destroyPiece}
        />
        <SparePieceMenu
          prevBoardState={boardState}
          updateBoard={updateBoard}
          pieceColor="w"
        />
      </div>
      <div>
        <button
          style={{
            backgroundColor: "#32f900",
            cursor: "pointer",
            marginTop: 75,
            marginLeft: 30,
            width: 100,
            height: 100,
            color: "#ffffff",
          }}
          onClick={addGameLog}>
          Añadir
        </button>
      </div>
      <ul
        id="gameHistoryLogContainer"
        style={{
          marginTop: 75,
          marginLeft: 30,
          height: 100,
        }}></ul>
    </div>
  );
}

FENRecorder.propTypes = {};

export default FENRecorder;
