import { Gameboard } from "../gameboard.js";
import { Ship } from "../ship.js";
const gameboard1 = new Gameboard();
gameboard1.createBoard();
test("Board works", () => {
  expect(gameboard1.board).toBeInstanceOf(Array);
});
test("Ship placement", () => {
  gameboard1.placeShip(1, 1, 1, "vertical");
  expect(gameboard1.board[1][1]).toBeInstanceOf(Ship);
});
test("Places ship on 3 fields", () => {
  gameboard1.placeShip(5, 1, 3, "horizontal");
  expect(gameboard1.board[5][1]).toBeInstanceOf(Ship);
  expect(gameboard1.board[5][2]).toBeInstanceOf(Ship);
  expect(gameboard1.board[5][3]).toBeInstanceOf(Ship);
});
test("Hit target", () => {
  gameboard1.placeShip(1, 1, 1, "vertical");
  gameboard1.receiveAttack(1, 1);
  expect(gameboard1.board[1][1].hits == 1);
  expect(gameboard1.board[1][1].sunk == false);
  expect(gameboard1.board[1][1]).toBe("hit");
});
test("Miss target", () => {
  gameboard1.receiveAttack(1, 1);
  expect(gameboard1.board[1][1]).toBe("miss");
});
test("Vertical placement works", () => {
  gameboard1.placeShip(1, 1, 3, "vertical");
  expect(gameboard1.board[1][1]).toBeInstanceOf(Ship);
  expect(gameboard1.board[2][1]).toBeInstanceOf(Ship);
  expect(gameboard1.board[3][1]).toBeInstanceOf(Ship);
});
test.skip("Rejects wrong horizontal placement", () => {
  expect(() => {
    gameboard1.placeShip(9, 9, 3, "horizontal");
  }).toThrow("Overflowing value");
});
