import { Player } from "../player.js";

test("Player creation", () => {
  const player1 = new Player("Player");
  expect(player1.name).toBe("Player");
});
