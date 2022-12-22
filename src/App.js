import { Chessboard } from "react-chessboard";
import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import { Chess } from "chess.js";
import { RandomBoardGenerator } from "./models/RandomBoardGenerator";

function App() {
  let rbgtor = new RandomBoardGenerator();
  let ChessEngine = new Chess();

  let mates = [];
  let i = 0;

  const [fen, setFen] = useState("start");
  const [mate, setMate] = useState(false);

  const updateFen = () => {
    setInterval(() => {
      i++;
      setFen(rbgtor.generate());
      ChessEngine.load(fen);
      setMate(ChessEngine.isCheckmate());
      if (ChessEngine.isCheckmate()) {
        mates.push(fen);
      }
      console.clear();
      console.log(mates);
      console.log(`TESTED ${i} POSITIONS`);
    }, 0.00001);
  };

  return (
    <div>
      <Chessboard position={fen} />
      <h1>
        Mate:{" "}
        <span style={mate ? { color: "#40f90b" } : { color: "#f40006" }}>
          {mate ? " Si" : " No"}
        </span>
      </h1>
      <h3>Fen: {fen}</h3>
      <button onClick={updateFen}>Start</button>
    </div>
  );
}

export default App;
