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
    //validation if ship isnt placed on another
    const ship = new Ship(length);
    if (pos === "horizontal") {
      if (+y + +length <= 10) {
        for (let i = 0; i < length; i++) {
          if (!(this.board[x][+y + +i] instanceof Ship)) {
            this.board[x][+y + +i] = ship;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    } else if (pos === "vertical") {
      if (+x + +length <= 10) {
        for (let i = 0; i < length; i++) {
          if (!(this.board[+x + +i][y] instanceof Ship)) {
            this.board[+x + +i][y] = ship;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    }
    this.shipList.push(ship);
    console.log(this.shipList);
    return true;
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
