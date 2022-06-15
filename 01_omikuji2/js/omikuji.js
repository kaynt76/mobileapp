"use strict";
window.addEventListener("DOMContentLoaded",
    function(){
        $("header").textillate({
            loop: false, 
            minDisplayTime: 2000, 
            initialDelay: 2000, 
            autoStart: true,
            in: { 
                effect: "fadeInLeftBig", 
                delayScale: 1.5,
                delay: 50,
                sync: false, 
                shuffle: true 
            }
        });
            $(function(){
            ScrollReveal().reveal("#btn1", { duration: 9000 });
            });
        setTimeout(
            function(){
        let popMessage= "いらっしゃい！おみくじを引いてって！";
        window.alert(popMessage);
        },
        "5000"
    );
    },false
);
const btn1=document.getElementById("btn1");
const omikujiText=document.getElementById("omikujiText");
btn1.addEventListener("click",
    function(){
       
        let resultText=["大吉!!!!!","吉!!!!","中吉!!!","小吉!!","末吉!","凶..","大凶....",];
        let resultColor=["#ff0000","#c71585","#ff1493","#ff69b4","#ff8c00","#C0C0C0","#FFFFFF"];
        let resultFontSize=["60px","55px","50px","45px","40px","35px","35px"];
        let n=Math.floor(Math.random()*resultText.length);
        let resultMaxSpeed=[12,10,10,8,8,6,4];
        let resultMaxSize=[150,45,35,40,35,40,100];
        let resultImage=["img/hanabi.png","img/yotsuba.png","img/sakura_hanabira.png","img/momiji.png","img/leaf.png","img/snow.png","img/rain.png"];
        omikujiText.textContent=resultText[n];
        omikujiText.style.color=resultColor[n];
        omikujiText.style.fontSize=resultFontSize[n];

        

        $(document).snowfall("clear");
        $(document).ready(function(){
        $(document).snowfall({
        maxSpeed : resultMaxSpeed[n],
        minSpeed : 1, 
        maxSize : resultMaxSize[n], 
        minSize : 15, 
        image : resultImage[n]
    });
});
},false
);