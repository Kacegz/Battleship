import { GameController } from "./gameController";
import { Ship } from "./ship";
class Dom {
  static renderPlayerGameboard(player) {
    const playerText = document.querySelector("#playertext");
    playerText.textContent = "Player";
    const playerBoard = document.querySelector("#playerBoard");
    playerBoard.textContent = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add(i + "," + j);
        cell.classList.add("cell");
        if (player.playerBoard.board[i][j] == "hit") {
          cell.classList.add("hit");
        }
        if (player.playerBoard.board[i][j] == "miss") {
          cell.classList.add("miss");
        }
        if (player.playerBoard.board[i][j] instanceof Ship) {
          cell.classList.add("aliveship");
        }
        playerBoard.appendChild(cell);
      }
    }
  }
  static renderEnemyGameboard(player) {
    const enemyText = document.querySelector("#enemytext");
    enemyText.textContent = "Enemy";
    const enemyBoard = document.querySelector("#enemyBoard");
    enemyBoard.textContent = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add(i + "," + j);
        cell.classList.add("cell");
        if (player.enemyBoard.board[i][j] == "hit") {
          cell.classList.add("hit");
        }
        if (player.enemyBoard.board[i][j] == "miss") {
          cell.classList.add("miss");
        }
        /*if (player.enemyBoard.board[i][j] instanceof Ship) {
          cell.classList.add("aliveship");
        }*/
        cell.addEventListener("click", (e) => {
          this.attack(e, player);
        });
        enemyBoard.appendChild(cell);
      }
    }
  }
  static renderPlacing(player) {
    const dialog = document.querySelector("#placeships");
    const placableBoard = document.querySelector("#placableBoard");
    const drag = document.querySelectorAll(".ship");
    const toggleButton = document.querySelector("#rotate");
    const leftBoard = document.querySelector("#player");
    const rightBoard = document.querySelector("#enemy");
    const shipWrapper = document.querySelector("#ships");
    const ships = document.querySelectorAll(".ship");
    shipWrapper.style.flexDirection = "column";
    leftBoard.style.display = "none";
    rightBoard.style.display = "none";
    let count = 4;
    let dragged = null;
    let rotation = "horizontal";
    dialog.showModal();
    placableBoard.textContent = "";
    drag.forEach((e) => {
      e.addEventListener("drag", (event) => {
        dragged = event.target;
      });
    });
    toggleButton.addEventListener("click", () => {
      if (rotation === "horizontal") {
        rotation = "vertical";
        shipWrapper.style.flexDirection = "row";
        ships.forEach((ship) => {
          ship.style.flexDirection = "column";
        });
      } else {
        rotation = "horizontal";
        ships.forEach((ship) => {
          shipWrapper.style.flexDirection = "column";
          ship.style.flexDirection = "row";
        });
      }
    });
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.id = i + "," + j;
        cell.classList.add("cell");
        cell.addEventListener("dragover", (event) => {
          event.preventDefault();
        });
        cell.addEventListener("drop", (event) => {
          event.preventDefault();
          let coords = event.target.id;
          //validator in gameboard module
          if (
            player.playerBoard.placeShip(
              coords[0],
              coords[2],
              dragged.id,
              rotation,
            )
          ) {
            if (rotation === "horizontal") {
              for (let i = 0; i < dragged.id; i++) {
                const cell = document.getElementById(
                  coords[0] + "," + (+coords[2] + +i),
                );
                cell.classList.add("aliveship");
              }
              const selectedShip = document.getElementById(dragged.id);
              selectedShip.style.display = "none";
              count--;
            } else {
              for (let i = 0; i < dragged.id; i++) {
                const cell = document.getElementById(
                  +coords[0] + +i + "," + coords[2],
                );
                cell.classList.add("aliveship");
              }
              const selectedShip = document.getElementById(dragged.id);
              selectedShip.style.display = "none";
              count--;
            }
          }
          if (count <= 0) {
            dialog.close();
            leftBoard.style.display = "block";
            rightBoard.style.display = "block";
            Dom.renderGameBoards(player);
          }
        });
        placableBoard.appendChild(cell);
      }
    }
  }
  static renderGameBoards(player1) {
    this.renderPlayerGameboard(player1);
    this.renderEnemyGameboard(player1);
  }
  static displayWinner(player) {
    const overlay = document.querySelector("#overlay");
    const text = document.querySelector("#overlaywinner");
    const hiddenShips = document.querySelectorAll(".ship");
    hiddenShips.forEach((ship) => {
      ship.style = "";
    });
    let status = player.checkForWinner();
    if (status === "Player") {
      overlay.style.display = "block";
      overlay.style.backgroundImage =
        "url('https://i.giphy.com/media/b4ab9TBk9Ornvrt9W8/giphy.webp')";
      text.textContent = status + " wins!";
      overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        GameController.play();
      });
    } else if (status === "Bot") {
      overlay.style.display = "block";
      text.textContent = status + " wins!";
      overlay.style.backgroundImage =
        "url('https://media3.giphy.com/media/In0jFGYBR2oIJfb13r/giphy.gif')";
      overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        GameController.play();
      });
    }
  }
  static launch() {
    const overlay = document.querySelector("#start");
    overlay.addEventListener("click", () => {
      overlay.style.display = "none";
      GameController.play();
    });
  }
  static attack(e, player) {
    const cell = e.target.classList[0];
    player.takeTurn(cell[0], cell[2]);
    this.renderGameBoards(player);
    this.displayWinner(player);
  }
}
export { Dom };
