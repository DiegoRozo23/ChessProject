import React from "react";
import PropTypes from "prop-types";

function SparePieceButton({ pieceID, updateBoard, prevBoardState }) {
  return (
    <div style={{ display: "inline" }}>
      <img
        src={require(`../../media/img/${pieceID}.png`)}
        width={72}
        style={{ cursor: "pointer" }}
        onClick={() => {
          updateBoard({ ...prevBoardState, ...{ a8: pieceID } });
        }}
      />
    </div>
  );
}

SparePieceButton.propTypes = {
  pieceID: PropTypes.string,
};

export default SparePieceButton;
