import { Client } from "boardgame.io/client";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import { resetOnClicks } from "./canvas";
import { TicTacToe } from "./theMIND.js";
import {drawPicture, onClick} from "./canvas.js";

const isMultiplayer = import.meta.env.VITE_REMOTE === "true";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const multiplayer = isMultiplayer
  ? SocketIO({ server: "localhost:8000" })
  : Local();

class GameClient {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.createBoard();

    this.client = Client({
      game: TicTacToe,
    });

    this.client.subscribe((state) => this.update(state));
    this.client.start();
    this.attachListeners();
  }


  update(state) {
    let allEmpty = true;
    for(let i = 0; i < state.G.length; i++){
      if(state.G[i] != null){
        allEmpty = false;
      }
    }
    if(allEmpty){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.createBoard()
    }
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "20px serif";
    let id = 0;
    for(let i = 0; i < 3; i++){
      for(let b = 0; b < 3; b++){
        if(state.G.cells[id] == null){
          ctx.fillText(" ", 100+b*50, 100+i*50, 50)
        } else{
          ctx.fillText(state.G.cells[id], 100+b*50, 100+i*50, 50)
        }
        id++;
      }
    }


    if (state.ctx.gameover) {
      if (state.ctx.gameover.winner !== undefined) {
        setTimeout(() => alert("Winner: " + String(state.ctx.gameover.winner)), 0);
      } else {
        setTimeout(() => alert("Draw!"), 0);
      }
    }
  }

  createBoard() {
    ctx.fillStyle = 'black'
    ctx.fillRect(50, 50, 200, 200);
    let change = true;
    for(let i = 0; i < 3; i++){
      for(let b = 0; b < 3; b++){
        if(change){
          ctx.fillStyle = '#F5F5DC'
        } else {
          ctx.fillStyle = "#D2B48C"
        }
        change = !change
        ctx.fillRect(75+i*50, 75+b*50, 50, 50);
      }
    }
  }

  attachListeners() {
    onClick (75, 75, 50, 50, () => { this.client.moves.clickCell(0)} )
    onClick (75+50, 75, 50, 50, () => { this.client.moves.clickCell(1)} )
    onClick (75+100, 75, 50, 50, () => { this.client.moves.clickCell(2)} )
    onClick (75, 75+50, 50, 50, () => { this.client.moves.clickCell(3)} )
    onClick (75+50, 75+50, 50, 50, () => { this.client.moves.clickCell(4)} )
    onClick (75+100, 75+50, 50, 50, () => { this.client.moves.clickCell(5)} )
    onClick (75, 75+100, 50, 50, () => { this.client.moves.clickCell(6)} )
    onClick (75+50, 75+100, 50, 50, () => { this.client.moves.clickCell(7)} )
    onClick (75+100, 75+100, 50, 50, () => { this.client.moves.clickCell(8)} )
  }
}

const appElement = document.getElementById("app");
let app = new GameClient(appElement);
