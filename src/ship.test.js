import { Ship } from "./ship.js";
test("Getting hit", () => {
  const ship1 = new Ship(5);
  ship1.hit();
  expect(ship1.hits).toBe(1);
});
test("destroyed if hits>length", () => {
  const ship1 = new Ship(1);
  ship1.hit();
  ship1.isSunk();
  expect(ship1.sunk).toBeTruthy();
});
