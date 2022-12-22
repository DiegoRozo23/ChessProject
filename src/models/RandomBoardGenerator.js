export class RandomBoardGenerator {
  constructor() {
    this.pieces = ["r", "n", "b", "q", "k", "p", "R", "N", "B", "Q", "K", "P"];
  }

  generate = () => {
    // Esta función retorna un tablero aleatorio en notación FEN.

    let remainingPieces = {
      r: 2,
      n: 2,
      b: 2,
      q: 1,
      k: 1,
      p: 8,
      R: 2,
      N: 2,
      B: 2,
      Q: 1,
      K: 1,
      P: 8,
    };

    let boardArray = [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ];

    // Se escoge un número aleatorio del intervalo [2,64] para establecer cuantas
    // fichas habrá en el tablero.

    let amountPieces = Math.floor(Math.random() * (64 - 2 + 1) + 2);

    for (let i = 0; i < amountPieces; i++) {
      let piece = this.pieces.slice(Math.random() * this.pieces.length)[0];
      let cell = Math.floor(Math.random() * 57);
      boardArray[Math.floor(cell / 8)][cell % 8] = piece;
    }

    return this.boardArrayToFEN(boardArray);
  };

  boardArrayToFEN = (board) => {
    // Inicializar una cadena vacía para almacenar el código FEN
    let fen = "";

    // Recorrer el tablero fila por fila
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        let emptySquares = 0;
        while (board[row][col] === "" && col < board[row].length) {
          emptySquares++;
          col++;
        }
        // Si hay casillas vacías, añadirlas al código FEN
        if (emptySquares > 0) {
          fen += emptySquares;
        }
        // Si la casilla no está vacía, añadir la pieza al código FEN
        if (board[row][col] !== "" && board[row][col] !== undefined) {
          fen += board[row][col];
        }
      }

      // Si no hemos llegado al final del tablero, añadir una barra vertical al código FEN
      if (row < board.length - 1) {
        fen += "/";
      }
    }

    return fen;
  };
}
