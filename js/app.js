let card = document.querySelectorAll(".card");
const deck = document.querySelector("#card-deck");
let timer = document.querySelector(".timer");
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let modal = document.getElementById("popup1")
let starsList = document.querySelectorAll(".stars li");
let closeicon = document.querySelector(".close");
let matchedCards = document.getElementsByClassName("match");


let cards = [...card];
let openedCards = [];
let moves = 0;
let second = 0;
let minute = 0;
let hour = 0;
let interval;

document.body.onload = startGame();



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function startGame(){
    openedCards = [];
    shuffledCards = shuffle(cards);
    shuffledCards.forEach(function(card){
        deck.appendChild(card);
        card.classList.remove("show", "open", "match","disabled");
    });
    moves = 0;
    counter.innerHTML = moves;
    stars.forEach(function(star){
        star.style.color = "#FFD700";
        star.style.visibility = "visible";
    })
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

let displayCard = function(){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}




function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

function unMatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(() => {
        openedCards[0].classList.remove("show","open","no-event","unmatched");
        openedCards[1].classList.remove("show","open","no-event","unmatched");
        enable();
        openedCards = [];
    }, 1100);
    
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCards.length; i++){
            matchedCards[i].classList.add("disabled");
        }
    });
}


function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
        hour = 0;
        minute = 0;
        second = 0;
        startTimer();
    }
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"seconds";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }if(minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}

function congratulations(){
    if(matchedCards.length==16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();    
    };
}

function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

function playAgain(){
    modal.classList.remove("show");
    startGame();
}

function cardOpen(){
    openedCards.push(this);
    let length = openedCards.length;
    if (length === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        }else{
            unMatched()
        }
    }
};


cards.forEach(function(card) {
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
});
