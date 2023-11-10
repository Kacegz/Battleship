import { Ship } from "./ship.js";
class Gameboard {
  constructor() {
    this.createBoard();
  }
  board = [];
  shipList = [];
  createBoard() {
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = [i, j];
      }
    }
  }
  placeShip(x, y, length, pos) {
    const ship = new Ship(length);
    if (pos === "horizontal") {
      if (+y + +length <= 10) {
        this.shipList.push(ship);
        for (let i = 0; i < length; i++) {
          this.board[x][+y + +i] = ship;
        }
      } else {
        //throw new Error("Overflowing value");
      }
    } else if (pos === "vertical") {
      if (+x + +length <= 10) {
        this.shipList.push(ship);
        for (let i = 0; i <= length; i++) {
          this.board[+x + +i][y] = ship;
        }
      } else {
        //throw new Error("Overflowing value");
      }
    }
  }
  receiveAttack(x, y) {
    if (this.board[x][y] instanceof Ship) {
      this.board[x][y].hits++;
      if (this.board[x][y].isSunk()) {
        this.shipList = this.shipList.filter((ship) => {
          return ship !== this.board[x][y];
        });
      }
      this.board[x][y] = "hit";
      return "hit";
    } else {
      this.board[x][y] = "miss";
      return "miss";
    }
  }
  checkShips() {
    if (this.shipList.length <= 0) {
      return true;
    } else {
      return false;
    }
  }
}
export { Gameboard };
