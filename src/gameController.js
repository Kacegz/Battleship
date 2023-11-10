import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { Dom } from "./DOMController.js";
import { Ship } from "./ship.js";

class GameController {
  static start() {
    //animation?
    const newBoard = new Gameboard();
    const enemyBoard = new Gameboard();
    enemyBoard.placeShip(6, 3, 3, "horizontal");
    enemyBoard.placeShip(5, 2, 2, "horizontal");
    const player1 = new Player("Captain", newBoard, enemyBoard);
    Dom.renderPlacing(player1);
    //this.play();
    //show win screen
  }
  static play() {
    /*const destroyer = new Ship(3);
    const cruiser = new Ship(2);
    newBoard.placeShip(3, 3, destroyer);
    newBoard.placeShip(1, 2, cruiser);
    enemyBoard.placeShip(6, 3, cruiser);
    enemyBoard.placeShip(5, 2, destroyer);
    player1.takeTurn(6, 3);
    Dom.renderGameBoards(player1);*/
  }
}
export { GameController };
