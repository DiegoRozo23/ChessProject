import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import "./style.css";

export default function LegalMoves() {



  const [game, setGame] = useState(new Chess());
  const [moveSuccessful, setMoveSuccessful] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [customSquareStyles, setCustomSquareStyles] = useState({});
  const moves = game.history({ verbose: true });
  const [darkSquareColor, setDarkSquareColor] = useState('#6c809a');
  const [ligthSquareColor, setLigthSquareColor] = useState('#edeed1');
  const [selectedOpening, setSelectedOpening] = useState("");
  const openings = {
    "italian": ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Nc3", "Bc5", "d3", "Qe7"]
  };
  const [playingOpening, setPlayingOpening] = useState(false)
  const [movesPlayedOpening, setMovesPlayedOpening] = useState(0);

  const [increment, setIncrement] = useState(1)

  function handleChange(event) {
    console.log("seleccion")
    setSelectedOpening(event.target.value);
    setPlayingOpening(true)
  }

  function changeDarkSquareColor(color) {
    setDarkSquareColor(color);
  }
  
  function changeLigthSquareColor(color){
    setLigthSquareColor(color);
  }
  
  function makeAMove(move) {
    
    const result = game.move(move);
    setGame(game);
    setMoveSuccessful(true)
    return result;
  }


  function onDrop(sourceSquare, targetSquare) {
 
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,

    });

    if (move === null) {
      console.log("error")
      return false;
    }

    if(playingOpening) openingPractice()

    setCustomSquareStyles({});
    return true;
  }

  function onSquareClick(square) {


    const legalMoves = game.moves({ square: square, verbose: true });

    if (Object.keys(customSquareStyles).length === 0) {
      if (legalMoves.length > 0 ) {
        const targetSquares = legalMoves.map(move => move.to);
        targetSquares.forEach(targetSquare => {
          customSquareStyles[targetSquare] = {
            backgroundColor: "rgba(255, 255, 0, 0.5)"
          };
        });
        customSquareStyles[square] = {
          backgroundColor: "rgba(0, 0, 0, 0.2)"
        };
        setCustomSquareStyles(customSquareStyles);
        setSelectedSquare(square);
    }
    }

    else setCustomSquareStyles({});


    
    if (selectedSquare && Object.keys(customSquareStyles).length !== 0) {
      if (makeAMove({ from: selectedSquare, to: square })) {
        setSelectedSquare(null)
        if(playingOpening) openingPractice()
      }
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

  function openingPractice(){
    //si se sesta jugando la apertura y se jugó el movimiento correcto: 
    if(game.history()[movesPlayedOpening+increment-1] === openings[selectedOpening][movesPlayedOpening+increment-1]){
      setIncrement(increment+1)
      setMovesPlayedOpening(movesPlayedOpening+1)
      game.move(openings[selectedOpening][movesPlayedOpening+increment]);
      setGame(game);
      setMoveSuccessful(true)
    }
    //reinicie el contador si no
    else{
      setIncrement(1)
    }
  }

  function test(){

  document.getElementById("move-list").innerHTML = "";
  moves.forEach(move => {
    const moveElement = document.createElement("div");
    moveElement.textContent = `${move.from}-${move.to}`;
    document.getElementById("move-list").appendChild(moveElement);
  });
  }

  useEffect(() => {
    setMoveSuccessful(false)
    test()
  }, [moveSuccessful]);



  return <div className="Main">
          <div className="chess-app"> 
            <Chessboard position={game.fen()} onPieceDrop={onDrop} onSquareClick={onSquareClick} customSquareStyles={customSquareStyles} onSquareRightClick={rightClick} customDarkSquareStyle={{ backgroundColor: darkSquareColor }}
        customLightSquareStyle={{ backgroundColor: ligthSquareColor }}/>
            <div id="move-list">
            
            </div>
            
          </div>
          <form>
  <label>
    Dark square color:
    <input type="color" value={darkSquareColor} onChange={e => changeDarkSquareColor(e.target.value)} />
    Ligth square color: 
    <input type="color" value={ligthSquareColor} onChange={e => changeLigthSquareColor(e.target.value)} />

  </label>
</form>




<div className="opening-dropdown">
      <label>
        Select opening:
        <select value={selectedOpening} onChange={handleChange}>
        <option value=""></option>
          <option value="italian">Italian</option>
          <option value="sicilian">Sicilian</option>
          <option value="french">French</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
        </select>
      </label>
    </div>
          <button onClick={handleUndoClick}>Undo</button>

        </div> 
  
}
