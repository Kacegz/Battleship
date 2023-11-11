import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { Dom } from "./DOMController.js";

class GameController {
  static start() {
    Dom.launch();
  }
  static play() {
    const newBoard = new Gameboard();
    const enemyBoard = new Gameboard();
    Player.botPlaceShips(enemyBoard);
    const player1 = new Player("Captain", newBoard, enemyBoard);
    Dom.renderPlacing(player1);
  }
}
export { GameController };
