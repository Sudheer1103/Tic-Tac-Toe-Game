let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newGame = document.querySelector("#newGame-btn");
let undoBtn = document.querySelector("#undo-btn"); // new button
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let flagWinner = true;
let count = 0;
let turnO = true;
let moves = []; //  stack for moves

const winning_pattern = [
  [0,1,2],[0,3,6],[0,4,8],
  [1,4,7],[2,5,8],[2,4,6],
  [3,4,5],[6,7,8]
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;
    moves.push(index); //  record the move
    checkwinner();
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`;
  msgContainer.classList.remove("hide");
  disableBtns();
};

const checkwinner = () => {
  for (let pattern of winning_pattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        flagWinner = false;
        return;
      }
    }
  }

  if (count === 9 && flagWinner) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBtns();
  }
};

const resetGame = () => {
  turnO = true;
  count = 0;
  flagWinner = true;
  moves = []; //  clear move history
  enableBtns();
  msgContainer.classList.add("hide");
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

const disableBtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBtns = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Undo function
undoBtn.addEventListener("click", () => {
  if (moves.length > 0 && flagWinner) { 
    let lastMove = moves.pop(); // get last index
    boxes[lastMove].innerText = ""; 
    boxes[lastMove].disabled = false;
    turnO = !turnO; // switch turn back
    count--;
  }
});
