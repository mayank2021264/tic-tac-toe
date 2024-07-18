let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset-game');
let newGamebtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turn0 = true; //playerX, playerO
let count =0;

const winPatterns = [[0,1,2], [0,3,6], 
[0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("box was clicked");
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();

        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const gameDraw = () => {
    msg.innerText = "It's a Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `congratulations ${winner} is the winner`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "" && pos1Val == pos2Val && pos2Val == pos3Val){
            console.log("winner", pos1Val);
            showWinner(pos1Val);
            boxes[pattern[0]].style.backgroundColor = "green";
            boxes[pattern[1]].style.backgroundColor = "green";
            boxes[pattern[2]].style.backgroundColor = "green";
            boxes.forEach((box) => {
                box.disabled = true;
            });
            return true;
        }
    }
    //return false;
};

resetbtn.addEventListener('click', resetGame);

