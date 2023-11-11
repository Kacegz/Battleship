import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

test("Player creation", () => {
  const player1 = new Player("Player");
  expect(player1.name).toBe("Player");
});
test("Winnable", () => {
  const newBoard = new Gameboard();
  const enemyBoard = new Gameboard();
  const destroyer = new Ship(1);
  newBoard.placeShip(3, 3, destroyer);
  enemyBoard.placeShip(6, 3, destroyer);
  const player1 = new Player("Captain", newBoard, enemyBoard);
  enemyBoard.receiveAttack(6, 3);
  expect(player1.checkForWinner()).toBe("Player");
});
