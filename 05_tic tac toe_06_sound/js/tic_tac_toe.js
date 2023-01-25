"use strict";
let flag = "choncc-flag"
let counter = 9;

const squares = document.getElementsByClassName("square");
const squaresArray = Array.from(squares);

const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

const line1 = JudgLine(squaresArray,["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray,["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray,["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray,["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray,["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray,["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray,["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray,["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
let winningLine = null;

const msgtxt1 = '<p class="image"><img src="img/choncc.png" width=170px height 170px></p><p class="text">CHONCC Attack!</p>';
const msgtxt2 = '<p class="image"><img src="img/poro.png" width=170px height 170px></p><p class="text">PORO Attack!</p>';
const msgtxt3 = '<p class="image"><img src="img/choncc1.png" width=170px height 170px></p><p class="text animate__animated animate__lightSpeedInRight">CHONCC Win!!!</p>';
const msgtxt4 = '<p class="image"><img src="img/poro1.png" width=170px height 170px></p><p class="text animate__animated animate__lightSpeedInLeft">PORO Win!!!</p>';
const msgtxt5 = '<p class="image"><img src="img/choncc.png" width=170px height 170px><img src="img/poro.png" width=170px height 170px></p><p class="text animate__bounceIn">Draw!!!</p>';

let gameSound =["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

window.addEventListener("DOMContentLoaded",
    function(){
        setMessage("choncc-turn");
    },false
);

function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}
a_1.addEventListener("click",
    function(){
        isSelect(a_1);
    },false
);
a_2.addEventListener("click",()=>{
    isSelect(a_2);
});
a_3.addEventListener("click",()=>{
    isSelect(a_3);
});
b_1.addEventListener("click",()=>{
    isSelect(b_1);
});
b_2.addEventListener("click",()=>{
    isSelect(b_2);
});
b_3.addEventListener("click",()=>{
    isSelect(b_3);
});
c_1.addEventListener("click",()=>{
    isSelect(c_1);
});
c_2.addEventListener("click",()=>{
    isSelect(c_2);
});
c_3.addEventListener("click",()=>{
    isSelect(c_3);
});

function isSelect(selectSquare){
    if( flag === "choncc-flag"){
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();
        selectSquare.classList.add("js-choncc-checked");
        selectSquare.classList.add("js-unclickable");
        if (isWinner("choncc")){
            setMessage("choncc-win");
            gameOver("choncc");
            return;
        }
        setMessage("poro-turn");
        flag = "poro-flag";
    }else{
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();
        selectSquare.classList.add("js-poro-checked");
        selectSquare.classList.add("js-unclickable");
        if (isWinner("poro")){
            setMessage("poro-win");
            gameOver("poro");
            return;
        }
        setMessage("choncc-turn");
        flag = "choncc-flag";
    }
    counter--;
    if (counter === 0){
        setMessage("draw");
        gameOver("draw");
    }
}

function isWinner(symbol){
    const result = lineArray.some(function(line){
        const subResult = line.every(function(square){
            if(symbol === "choncc"){
                return square.classList.contains("js-choncc-checked");
            }
            if(symbol === "poro"){
                return square.classList.contains("js-poro-checked");
            }
        });
        if(subResult){winningLine = line}
        return subResult;
    });
    return result;
}
function setMessage(id){
    switch(id){
        case "choncc-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "poro-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
        case "choncc-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            break;
        case "poro-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML=msgtxt1;
    }
}
function gameOver(status){
    let w_sound
    switch (status) {
        case "choncc":
            w_sound = gameSound[2];
            break;
        case "poro":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }
    let music = new Audio(w_sound);
    music.currentTime =0;
    music.play();
    
    squaresArray.forEach(function(square){
        square.classList.add("js-unclickable");
    });

    newgamebtn_display.classList.remove("js-hidden");

    if(status  === "choncc"){
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-choncc_highLight");
            });
        }

        $(document).snowfall({
            image: "img/winner1.png",
            maxSpeed: 5,
            minSpeed: 1,
            maxSize: 80,
            minSize: 30,
            round: true
        });
    }else if(status === "poro"){
        if (winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-poro_highLight");
            });
        }

        $(document).snowfall({
            image: "img/winner2.png",
            maxSpeed: 5,
            minSpeed: 1,
            maxSize: 80,
            minSize: 30,
            round: true
        });
    }
}

newgamebtn.addEventListener("click", function(){
    flag = "choncc-flag";
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function (square){
        square.classList.remove("js-choncc-checked");
        square.classList.remove("js-poro-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-choncc_highLight");
        square.classList.remove("js-poro_highLight");
    });
    setMessage("choncc-tuurn");
    newgamebtn_display.classList.add("js-hidden");
    $(document).snowfall("clear");
});