import { INVALID_MOVE } from 'boardgame.io/core';

export const TicTacToe = {
  setup: function setup() {
    return { cells: [null, null, null, null, null, null, null, null, null] }
  },

  moves: {
    clickCell: function clickCell(move, cellIndex) {
      if (move.G.cells[cellIndex] !== null) {
        return INVALID_MOVE;
      }
      move.G.cells[cellIndex] = move.playerID;
    },
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  endIf: function endIf(endIf) {
    const winner = isVictory(endIf.G.cells);
    if (winner != null) {
      return { winner: winner };
    }
    if (isDraw(endIf.G.cells)) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: function enumerate(G)  {
      return [
        {move: 'clickCell', args: [0]},
        {move: 'clickCell', args: [1]},
        {move: 'clickCell', args: [2]},
        {move: 'clickCell', args: [3]},
        {move: 'clickCell', args: [4]},
        {move: 'clickCell', args: [5]},
        {move: 'clickCell', args: [6]},
        {move: 'clickCell', args: [7]},
        {move: 'clickCell', args: [8]},
      ];
    },
  },
}

function isVictory(cells){
  for(let i = 0; i < 3; i++ ){
    if(cells[3*i] == cells[i*3+1] && cells[i*3+1] == cells[i*3+2] && cells[3*i] != null){
      return cells[i*3]
    }
  }
  for(let i = 0; i < 3; i++ ){
    if(cells[i] == cells[i+3] && cells[i+3] == cells[i+6] && cells[i] != null){
      return cells[i]
    }
  }
  if((cells[2] == cells[4] && cells[4] == cells[6])||(cells[0] == cells[4] && cells[4] == cells[8]) && cells[4] != null) {
    return cells[4]
  }

  return null
  

}

function isDraw(cells) {
  for(let i = 0; i < cells.length; i++){
    if(cells[i] == null){
      return false;
    }
  }
  return true;
}