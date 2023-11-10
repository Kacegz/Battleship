import { GameController } from "./gameController";
import { Ship } from "./ship";
class Dom {
  static renderPlayerGameboard(player) {
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
        cell.addEventListener("click", (e) => {
          this.attack(e, player);
        });
        enemyBoard.appendChild(cell);
      }
    }
  }
  static renderPlacing(player) {
    let count = 4;
    let dragged = null;
    let rotation = "horizontal";
    const dialog = document.querySelector("#placeships");
    dialog.showModal();
    const placableBoard = document.querySelector("#placableBoard");
    placableBoard.textContent = "";
    const drag = document.querySelectorAll(".ship");
    const toggleButton = document.querySelector("#rotate");
    drag.forEach((e) => {
      e.addEventListener("drag", (event) => {
        dragged = event.target;
      });
    });
    toggleButton.addEventListener("click", () => {
      if (rotation === "horizontal") {
        rotation = "vertical";
      } else {
        rotation = "horizontal";
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
          if (rotation === "horizontal") {
            if (+coords[2] + +dragged.id <= 10) {
              for (let i = 0; i < dragged.id; i++) {
                const cell = document.getElementById(
                  coords[0] + "," + (+coords[2] + +i),
                );
                cell.classList.add("aliveship");
              }
              const selectedShip = document.getElementById(dragged.id);
              selectedShip.style.display = "none";
              count--;
            }
          } else {
            if (+coords[0] + +dragged.id <= 10) {
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
          player.playerBoard.placeShip(
            coords[0],
            coords[2],
            dragged.id,
            rotation,
          );
          if (count <= 0) {
            dialog.close();
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
    const text = document.querySelector("#overlaytext");
    const hiddenShips = document.querySelectorAll(".ship");
    hiddenShips.forEach((ship) => {
      ship.style = "";
    });
    let status = player.checkForWinner();
    if (status === "Player") {
      overlay.style.display = "block";
      text.textContent = status + " wins!";
      overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        GameController.start();
      });
    } else if (status === "Bot") {
      overlay.style.display = "block";
      text.textContent = status + " wins!";
      overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        GameController.start();
      });
    }
  }
  static attack(e, player) {
    const cell = e.target.classList[0];
    player.takeTurn(cell[0], cell[2]);
    this.renderGameBoards(player);
    this.displayWinner(player);
  }
}
export { Dom };
