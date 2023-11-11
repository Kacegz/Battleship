class Player {
  constructor(name, playerBoard, enemyBoard) {
    this.name = name;
    this.playerBoard = playerBoard;
    this.enemyBoard = enemyBoard;
  }
  takeTurn(x, y) {
    let checker = this.checkForWinner();
    if (checker !== "Player" && checker !== "Bot")
      if (
        this.enemyBoard.board[x][y] !== "hit" &&
        this.enemyBoard.board[x][y] !== "miss"
      ) {
        this.enemyBoard.receiveAttack(x, y);
        Player.botAttacks(this.playerBoard);
      }
  }
  static botAttacks(targetBoard) {
    let cellX = Math.floor(Math.random() * 10);
    let cellY = Math.floor(Math.random() * 10);
    while (
      targetBoard.board[cellX][cellY] == "miss" ||
      targetBoard.board[cellX][cellY] == "hit"
    ) {
      cellX = Math.floor(Math.random() * 10);
      cellY = Math.floor(Math.random() * 10);
    }
    targetBoard.receiveAttack(cellX, cellY);
  }
  static botPlaceShips(targetBoard) {
    let cellX;
    let cellY;
    let pos;
    for (let i = 2; i <= 5; i++) {
      cellX = Math.floor(Math.random() * 10);
      cellY = Math.floor(Math.random() * 10);
      if (Math.floor(Math.random() * 2) === 1) {
        pos = "horizontal";
      } else {
        pos = "vertical";
      }
      while (!targetBoard.placeShip(cellX, cellY, i, pos)) {
        cellX = Math.floor(Math.random() * 10);
        cellY = Math.floor(Math.random() * 10);
      }
    }
  }
  checkForWinner() {
    if (this.playerBoard.checkShips()) {
      return "Bot";
    }
    if (this.enemyBoard.checkShips()) {
      return "Player";
    }
  }
}
export { Player };
