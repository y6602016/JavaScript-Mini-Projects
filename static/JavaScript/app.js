// Challenge 1

function ageInDays() {
    let year = prompt('What year were you born?');
    let age = (2021 - year) * 365;
    let result = document.createTextNode('You are ' + age +' old.');
    let h1 = document.createElement('h1');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(result);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}


//Challenge 2 

function generateCat() {
    let image = document.createElement('img');
    image.src = "https://images.squarespace-cdn.com/content/v1/55e6c143e4b0bef289280c88/1488563796499-QZAD4EMX7GRN0710UMI8/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIvwpK0aFuhG0GtLLHqvbV4raqY38tdDiF-KTEvoUH9G4/Cat-Turn_1.gif?format=1500w";
    let div = document.getElementById('flex-cat-gen');
    div.appendChild(image);
}


//Challenge 3 
function rpsGame(yourChoice) {
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt());
    console.log(botChoice);

    let result = decideWinner(humanChoice, botChoice);
    console.log(result);

    let message = finalMessage(result);
    console.log(message);
    rpsFrontEnd(humanChoice, botChoice, message)
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(humanChoice, botCoice) {
    let rspDatabase = {
        'rock' : {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper' : {'rock': 1, 'papper': 0.5, 'scissors': 0},
        'scissors' : {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };
    let yourScore = rspDatabase[humanChoice][botCoice];
    let computerScore = rspDatabase[botCoice][humanChoice];
    return[yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    }
    else if (yourScore === 1) {
        return {'message': 'You win!', 'color': 'blue'};
    }
    else {
        return {'message': 'You tied!', 'color': 'yellow'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalmessage) {
    let imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };
    
    // remove all the images
    document.getElementById('paper').remove();
    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();

    let humanImg = document.createElement('div');
    let message = document.createElement('div');
    let botImg = document.createElement('div');


    humanImg.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "'>";
    message.innerHTML = "<h1 style = 'color: " + finalmessage['color'] + "'; font-size: 40px; font-family: 'Gothic A1', sans-serif; padding: 20px; '>" + finalmessage['message'] + "</h1>";
    botImg.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "'>";
    
    document.getElementById('flex-box-rps').appendChild(humanImg);
    document.getElementById('flex-box-rps').appendChild(message);
    document.getElementById('flex-box-rps').appendChild(botImg);
}

//Challenge 4
let allButton = document.getElementsByTagName('button');

let copyAllButton = [];

for (let i = 0; i < allButton.length; i++) {
    copyAllButton.push(allButton[i].classList[1]);
}

function buttonColorChange(buttonThing) {
    if (buttonThing.value === 'red') {
        buttonsRed();
    }
    else if (buttonThing.value === 'green') {
        buttonsGreen();
    }
    else if (buttonThing.value === 'reset') {
        buttonReset();
    }
    else if (buttonThing.value === 'random') {
        buttonRandom();
    }
}

function buttonsRed() {
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-success');
    }
}

function buttonReset() {
    for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(copyAllButton[i]);
    }
}

function buttonRandom() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    for (let i = 0; i < allButton.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(choices[randomNumber]);
    }
}

//Challenge 5
let blackjackGame = {
    'you' : {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer' : {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap' : {'2' : 2, '3': 3, '4': 4, '5' : 5, '6': 6, '7': 7, '8' : 8, '9': 9, '10': 10, 'J' : 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver' : false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const HIT_SOUND = new Audio('static/sounds/swish.m4a');
const WIN_SOUND = new Audio('static/sounds/cash.mp3');
const LOST_SOUND = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        console.log(card);
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        cardImage.style.width = "80px";
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HIT_SOUND.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for(let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for(let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#fff';
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = '#fff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";
        
        blackjackGame['turnsOver'] = false;
    }   
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    // use the setTimeout as the function to call resolve function after ms
    // "resolve => setTimeout(resolve, ms)" is same as "function(resolve) => setTimeout(resolve, ms)"
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000); // await the promise being fullfiled
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else {
            blackjackGame['draws']++;
        }
    }

    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
    }

    else {
        blackjackGame['draws']++;
    }
    
    return winner
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner == YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Win!';
            messageColor = 'green';
            WIN_SOUND.play();
        }
        else if (winner == DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            LOST_SOUND.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
    

}
