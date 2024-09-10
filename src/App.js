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

  }

  createBoard() {

  }

  attachListeners() {

  }
}

const appElement = document.getElementById("app");
let app = new GameClient(appElement);
