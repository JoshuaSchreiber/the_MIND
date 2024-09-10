import { INVALID_MOVE } from "boardgame.io/core";

export const TicTacToe = {
  setup: function setup(main) {
    let initialRedrawStack = initialRedrawStackDefinition();
    let initialMiddleStack = [];
    let initialLevel = 1;
    let initialLives = main.ctx.playOrder.length;
    let initalThrowingStar = 1;
    let handsOfAllPlayers = [];
    for (let player of main.ctx.playOrder) {
      let handOfOnePlayer = [];
      handOfOnePlayer.push(initialRedrawStack.pop());
      // Karten werden aus dem initialRedrawStack gelöscht, ein Deck muss also später neu erstellt werden
      handsOfAllPlayers.push(handOfOnePlayer);
    }

    let artificialG = {
      initialRedrawStack,
      initialMiddleStack,
      initialLevel,
      initialLives,
      initalThrowingStar,
      handsOfAllPlayers,
    };
    console.log(artificialG);
    return artificialG;
  },

  moves: {},

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  endIf: function endIf(endIf) {},

  ai: {},
};
export function initialRedrawStackDefinition() {
  let array = [];
  for (let i = 1; i < 101; i++) {
    array.push(i);
  }
  return shuffle(array);
}

export function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
