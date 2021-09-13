document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  // now i create a board for play

  const block = 4;
  let squares = [];
  let score = 0;

  function playingBoard() {
    for (let i = 0; i < block * block; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }
  playingBoard();
  // now we genrate a new number  random

  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkForGameOver();

    } else generate();
  }

  // when we swipe right

  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);

        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);

        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // swipe for left

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);

        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);

        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // swipe down

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + block].innerHTHL;
      let totalThree = squares[i + block * 2].innerHTML;
      let totalFour = squares[i + block * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let fileredColumn = column.filter(num => num);
      let missing = 4 - fileredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(fileredColumn);

      squares[i].innerHTHL = newColumn[0];
      squares[i + block].innerHTHL = newColumn[1];
      squares[i + block * 2].innerHTHL = newColumn[2];
      squares[i + block * 3].innerHTHL = newColumn[3];
    }
  }

  // swipe up

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + block].innerHTHL;
      let totalThree = squares[i + block * 2].innerHTML;
      let totalFour = squares[i + block * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let fileredColumn = column.filter((num) => num);
      let missing = 4 - fileredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = fileredColumn.concat(zeros);

      squares[i].innerHTHL = newColumn[0];
      squares[i + block].innerHTHL = newColumn[1];
      squares[i + block * 2].innerHTHL = newColumn[2];
      squares[i + block * 3].innerHTHL = newColumn[3];
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML == squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML == squares[i + block].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + block].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + block].innerHTML = 0;

        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  //assign keycodes
  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }

  document.addEventListener("keyup", control);

  function keyRight() {
    moveRight();
    moveLeft();
    moveRight();
    generate();
  }

  function keyLeft() {
    moveLeft();
    moveLeft();
    combineRow();
    generate();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
  }

  // now we check  2048 in the div
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTHL == 2048) {
        resultDisplay.innerHTHL = ('you win');
        document.addEventListener("keyup", control);
      }
    }
  }

  //check for looose the game

  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTHL == 0) {
        zeros++
      }
    }
    if (zeros ===0) {
      resultDisplay.innerHTML = ('you lose');
      document.removeEventListener("keyup", control);
    }
  }
});
