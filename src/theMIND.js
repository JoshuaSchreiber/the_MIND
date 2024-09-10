import { INVALID_MOVE } from 'boardgame.io/core';

export const TicTacToe = {
  setup: function setup() {
    let initialRedrawStack = initialRedrawStack()
    return {initialRedrawStack}
  },

  moves: {

  },


  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  endIf: function endIf(endIf) {

  },

  ai: {

  },

}
function initialRedrawStack() {
  let array = []
  for (let i=1; i<101; i++) {
    array.push(i)
  }
  return (shuffle(array))
}


function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return (array)
}

