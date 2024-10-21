import { INVALID_MOVE } from "boardgame.io/core";


export const UNO = {
  setup: function setup(main) {
    let initialRedrawStack = initialRedrawStackDefinition();

    let handsOfAllPlayers= [];
    for (let player of main.ctx.playOrder) {
      let handOfOnePlayer = [];
      for (let i = 0; i < 7; i++) {
        handOfOnePlayer.push(initialRedrawStack.pop());
      }

      // Karten werden aus dem initialRedrawStack gelöscht, ein Deck muss also später neu erstellt werden
      handsOfAllPlayers.push(handOfOnePlayer);
    }
    
    let counter = initialRedrawStack.length-1
    while (initialRedrawStack[counter] == "black"){
      counter--
    };
    let initialThrowStack = initialRedrawStack[counter]
    initialRedrawStack=removeElementAtIndex(initialRedrawStack, counter)

    let initialPlayingDirection = "withClock"

    let artificialG = {
      "RedrawStack":initialRedrawStack, 
      handsOfAllPlayers,
      "ThrowStack":initialThrowStack,
      "PlayingDirection":initialPlayingDirection
    };

    console.log(artificialG);
    return artificialG;
  },

  moves: {
    throwCard: ({G, ctx}, cardNumberInHand) => {
      let currentPlayer = ctx.currentPlayer
      let lastThrownCard = G.ThrowStack[G.ThrowStack.length -1]
      let chosenCardOfPlayer = G.handsOfAllPlayers[currentPlayer][cardNumberInHand]
      if (chosenCardOfPlayer[1] != "black") {
        if (chosenCardOfPlayer[1] != lastThrownCard[1]){
          if (chosenCardOfPlayer[0] != lastThrownCard[0]){
            return INVALID_MOVE
          }
        }
      }
      G.ThrowStack.push(chosenCardOfPlayer)
      G.handsOfAllPlayers[currentPlayer] = removeElementAtIndex(G.handsOfAllPlayers[currentPlayer], cardNumberInHand) 
    },
    drawCard: ({G, ctx}) => {
      let currentPlayer = ctx.currentPlayer
      G.handsOfAllPlayers[currentPlayer].push(G.RedrawStack.pop())
    },
  },
  

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  endIf: function endIf(endIf) {},

  ai: {},
};

export function initialRedrawStackDefinition() {
  let array = [];

  for (let i = 0; i < 4; i++) {
    let color = null;
    if(i == 0){
      color = "green"
    } else if(i == 1){
      color = "blue"
    } else if(i == 2){
      color = "red"
    } else {
      color = "yellow"
    }

    for(let y = 0; y < 10; y++){
      let card = [y.toString(), color]
      array.push(card);
    }
array.push(["changeDirection", color])
    array.push(["skipNextPlayer", color])
    array.push(["nextPlayerDrawsTwo", color])

    if(i == 0 || i == 1){
      array.push(["selectColor", "black"])
    } else {
      array.push(["nextPlayerDrawsFourAndSelectColor", "black"])
    }
  }
  console.log(array)

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
export function removeElementAtIndex(array, index) {
  let newArray = [];


  for (let i = 0; i < array.length ; i++) {
      if (index != i) {
        newArray.push(array[i])
      }
  }

  return newArray;
}