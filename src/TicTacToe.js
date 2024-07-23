export const TicTacToe = {
  setup: function setup() {
    return { cells: [null, null, null, null, null, null, null, null, null] }
  },

  moves: {
    clickCell: function clickCell(move, cellIndex) {
      // cells is the array we setup in the setup function and we simply assign the playerID to the cellIndex
      // to indicate which player has placed their mark there.
      move.G.cells[cellIndex] = move.playerID;
    },
  },
}