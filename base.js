const types=["vegetable","panda"];

const moves=document.getElementById("moves");
const timer=document.getElementById("time");
const startBtn=document.querySelector(".start");
const stopBtn=document.getElementById("stop");
const gameContainer=document.querySelector(".game-container");
const result=document.getElementById("result");
const controlsContainer=document.querySelector(".controls-container");
const btns=document.querySelectorAll(".btn");
const startdiv=document.querySelector(".startdiv");
const starth2=document.querySelector(".starth2");

let cards;
let firstCard=false;
let secondCard=false;
let interval;
let list;

const items1=[
    { name: "5ass", image: "images/vegetables/5ass.png" },
    { name: "9ra3", image: "images/vegetables/9ra3.png" },
    { name: "batata", image: "images/vegetables/batata.png" },
    { name: "bsal", image: "images/vegetables/bsal.png" },
    { name: "caroote", image: "images/vegetables/caroote.png" },
    { name: "chapinion", image: "images/vegetables/chapinion.png" },
    { name: "fa9ous", image: "images/vegetables/fa9ous.png" },
    { name: "felfel", image: "images/vegetables/felfel.png" },
    { name: "felfela5dhar", image: "images/vegetables/felfela5dhar.png" },
    { name: "fje", image: "images/vegetables/fje.png" },
    { name: "krom", image: "images/vegetables/krom.png" },
    { name: "tmatem", image: "images/vegetables/tmatem.png" },
]

const items = [
    { name: "bee", image: "images/animals/bee.png" },
    { name: "crocodile", image: "images/animals/crocodile.png" },
    { name: "macaw", image: "images/animals/macaw.png" },
    { name: "gorilla", image: "images/animals/gorilla.png" },
    { name: "tiger", image: "images/animals/tiger.png" },
    { name: "monkey", image: "images/animals/monkey.png" },
    { name: "chameleon", image: "images/animals/chameleon.png" },
    { name: "piranha", image: "images/animals/piranha.png" },
    { name: "anaconda", image: "images/animals/anaconda.png" },
    { name: "sloth", image: "images/animals/sloth.png" },
    { name: "cockatoo", image: "images/animals/cockatoo.png" },
    { name: "toucan", image: "images/animals/toucan.png" },
];


//Initial Time
let seconds=0;
let minutes=0;

//Initial moves
let movesCount=0;
let winCount=0;

//Timer
function timeGenerator(){
    seconds+=1;
    if(seconds>=60){
        minutes+=1;
        seconds=0;
    }
    //Format Time
    let secondsValue=seconds < 10? `0${seconds}` : seconds;
    let minutesValue=minutes < 10? `0${minutes}` : minutes;
    timer.innerHTML=`<span>Time:</span>${minutesValue}:${secondsValue}`;
}

//Calculating Moves
function MovesGenerator(){
    movesCount+=1;
    moves.innerHTML=`<span>Moves:</span>${movesCount}`;
}

//Pick random objects from the items array
const generateRandom = (list,size=4) =>{
    //Temporary Array
    let tempArray=[...list];
    //cardValues array
    let cardValues=[];
    //Size should be double (4*4 matrix)/2 since pairs of objects would appear
    size=(size*size)/2;
    //Random objects selection
    for(let i=0;i<size;i++){
        const randomIndex=Math.floor(Math.random()*tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        //once selected remove item from the tempArray
        tempArray.splice(randomIndex,1);
    }
    return cardValues;
}

//Matrix generator
const matrixGenerator = (cardValues, size=4) =>{
    gameContainer.innerHTML="";
    cardValues=[...cardValues,...cardValues];
    //Shuffle
    cardValues.sort(()=>Math.random() - 0.5);
    for(let i=0;i<size*size;i++){
        gameContainer.innerHTML+=`
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after">
                <img src="${cardValues[i].image}" class="image"/>
            </div>
        </div>`;
    }
    //Grid
    gameContainer.style.gridTemplateColumns=`repeat(${size},auto)`;
    
    //Cards
    cards=document.querySelectorAll(".card-container");
    cards.forEach((card)=>{
        card.addEventListener("click",()=>{
            if(!card.classList.contains("matched")){
                //flip the clicked card
                card.classList.add("flipped");
                //if it is the firstcard
                if(!firstCard){
                    //Current card become the first card
                    firstCard=card;
                    //current card value becomes firstCardValue
                    firstCardValue=card.getAttribute("data-card-value");
                }
                else{
                    //increment moves
                    MovesGenerator();
                    //secondCard and value
                    secondCard=card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if(firstCardValue==secondCardValue){
                        //if both cards match add matched class so these cards would be ignored next time
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        //set firstCard to false since next card would be the first
                        firstCard=false;
                        winCount+=1;
                        if(winCount==Math.floor(cardValues.length/2)){
                            result.innerHTML=`<h2>You Won</h2>
                            <h4>Moves: ${movesCount}</h4>
                            <button id="restart">Restart Game</button>`;
                            stopGame();
                            console.log(startBtn);
                            result.classList.remove("hide");
                            startdiv.classList.add("hide");
                            starth2.classList.add("hide");
                            const restartbtn=document.getElementById("restart");
                            restartbtn.addEventListener("click",()=>{
                                controlsContainer.classList.remove("hide");
                                result.classList.add("hide");
                                startdiv.classList.remove("hide");
                                starth2.classList.remove("hide");
                                clearInterval(interval)
                            });
                        }
                    }
                    else{
                        //if the cards dont match
                        //flip the cards back to normal
                        let[tempFirst, tempSecond]=[firstCard, secondCard];
                        firstCard=false;
                        secondCard=false;
                        let delay=setTimeout(()=>{
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        },550);
                    }
                }
            }
        });
    });
};

btns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        movesCount=0;
        seconds=0;
        minutes=0;
        //controls and buttons visibility
        controlsContainer.classList.add("hide");
        stopBtn.classList.remove("hide");
        startBtn.classList.add("hide");
        //start Timer
        interval=setInterval(timeGenerator,1000);
        //initial moves
        moves.innerHTML=`<span>Moves:</span>${movesCount}`;
        if(btn.classList.contains("vegetable")){
            list=items1;
        }
        else{
            list=items;
        }
        intialiser(list);
    })
})

stopBtn.addEventListener("click",(stopGame = ()=>{
        controlsContainer.classList.remove("hide");
        stopBtn.classList.add("hide");
        clearInterval(interval)
    })
);

/*function endGame(){
    controlsContainer.classList.remove("hide");
    startBtn.classList.add("hide");
    result.classList.remove("hide");
}*/

function intialiser(list){
    result.innerText="";
    winCount=0;
    let cardValues=generateRandom(list);
    //console.log(cardValues);
    matrixGenerator(cardValues);
}