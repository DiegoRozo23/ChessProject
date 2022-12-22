import React from "react";
import PropTypes from "prop-types";
import SparePieceButton from "./SparePieceButton";

function SparePieceMenu({ updateBoard, prevBoardState, pieceColor }) {
  return (
    <div className="sparePieceMenu">
      <SparePieceButton
        pieceID={`${pieceColor}K`}
        updateBoard={updateBoard}
        prevBoardState={prevBoardState}
      />
      <SparePieceButton
        pieceID={`${pieceColor}Q`}
        updateBoard={updateBoard}
        prevBoardState={prevBoardState}
      />
      <SparePieceButton
        pieceID={`${pieceColor}R`}
        updateBoard={updateBoard}
        prevBoardState={prevBoardState}
      />
      <SparePieceButton
        pieceID={`${pieceColor}B`}
        updateBoard={updateBoard}
        prevBoardState={prevBoardState}
      />
      <SparePieceButton
        pieceID={`${pieceColor}N`}
        updateBoard={updateBoard}
        prevBoardState={prevBoardState}
      />
      <SparePieceButton
        pieceID={`${pieceColor}P`}
        updateBoard={updateBoard}
        prevBoardState={prevBoardState}
      />
    </div>
  );
}

SparePieceMenu.propTypes = {
  pieceColor: PropTypes.string,
};

export default SparePieceMenu;
