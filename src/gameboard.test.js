import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
const ship1 = new Ship(3);
const gameboard1 = new Gameboard();
gameboard1.createBoard();
test("Board works", () => {
  expect(gameboard1.board).toBeInstanceOf(Array);
});
test("Ship placement", () => {
  gameboard1.placeShip(1, 1, ship1);
  expect(gameboard1.board[1][1]).toBe(ship1);
});
test("Places ship on 3 fields", () => {
  gameboard1.placeShip(1, 1, ship1);
  expect(gameboard1.board[1][1]).toBe(ship1);
  expect(gameboard1.board[1][2]).toBe(ship1);
  expect(gameboard1.board[1][3]).toBe(ship1);
});
test("Hit target", () => {
  gameboard1.receiveAttack(1, 1);
  expect(gameboard1.board[1][1].hits == 1);
  expect(gameboard1.board[1][1].sunk == false);
  expect(gameboard1.board[1][1]).toBe("hit");
});
test("Miss target", () => {
  gameboard1.receiveAttack(1, 1);
  expect(ship1.hits == 0);
  expect(gameboard1.board[1][1]).toBe("miss");
});
test("Vertical placement works", () => {
  gameboard1.placeShip(1, 1, ship1, "vertical");
  expect(gameboard1.board[1][1]).toBe(ship1);
  expect(gameboard1.board[2][1]).toBe(ship1);
  expect(gameboard1.board[3][1]).toBe(ship1);
});
test.skip("Rejects wrong horizontal placement", () => {
  expect(() => {
    gameboard1.placeShip(9, 9, ship1, "horizontal");
  }).toThrow("Overflowing value");
});
