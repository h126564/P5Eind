class SuitType {
  static get HEARTS () {
      return "Hearts";
  }

  static get DIAMONDS () {
      return "Diamonds";
  }

  static get SPADES () {
      return "Spades";
  }

  static get CLUBS () {
    return "Clubs";
  }

  
  
}
let roundpassed = false;
let allowmusic = 0;
let img;
let music;
let yay;
let yayhasplayed = false;
let playerCardValue= 0;
let eenkaartje;
let kaartenshuffle;
let allin;
let stand;
let gamesPlayed = 0;
let gamesWon = 0;
let win;
let lose;

function calculateHandValue(cards) {
  let total = 0;
  let aces = 0;
  for (let card of cards) {
    let value = card.card;
    if (value >= 10) {
      total += 10;
    } else if (value === 1) {
      total += 11;
      aces++;
    } else {
      total += value;
    }
  }
  // Adjust for Aces if total exceeds 21
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

function preload() {
  img = loadImage('thispersondoesnotexisttitled.png');
  yay = loadSound('yay.mp3')
  eenkaartje = loadSound('card-sounds-35956.mp3')
  kaartenshuffle = loadSound('card-mixing-48088.mp3')
  
  allin = loadSound('allinpushchips-96121.mp3')
  stand = loadSound('nice-simple-knock-on-door-85867.mp3')
  win = loadSound('win.mp3')
  lose = loadSound('lose.mp3')
}
  

function getColorBySuit(suit){
  if(suit == SuitType.CLUBS || suit == SuitType.SPADES){
    return "#000000";
  }else{
    return "#FF0000"
  }
}
function getRandomCard(){
  let cardNr = Math.round(Math.random() * 51 +1);
  let suit;
  if(cardNr <= 13){
    suit = SuitType.HEARTS;
    cardNr = cardNr;
  }else if (cardNr <= 26){
    suit = SuitType.DIAMONDS;
    cardNr = cardNr - 13;
  }else if(cardNr <= 39){
    suit = SuitType.SPADES;
    cardNr = cardNr-26;;
  }else {
    suit = SuitType.CLUBS;
    cardNr = cardNr-39;;
  }
  let card = new Card(suit, cardNr)
  return card;
    
  }


class Card{
  constructor(suit, card){
    this.suit = suit // kijk naar suit type ^
    this.card = card //1 tot 13
  }
};

class Person {
  // Constructor to initialize the properties
  constructor() {
    this.age = -1; // Age of the person
    this.ageDifferenceWithPartner = -1; // Age difference with their partner
    this.health = -1; // Health status (could be a string or numerical value)
    this.timeForHobbies = -1; // Time allocated for hobbies (e.g., in hours per week)
    this.petImportance = -1; // Importance of pets (e.g., scale from 1 to 10)
  }
}
function musicPlay(){

  if(allowmusic > 999){
    music.setVolume(0.1)
  if(!music.isPlaying()){
    music.play();
  }
}
}
//1-13 hearts
//14-26 diamonds
//27-39 spades
//40-52 clubs
let CPU = null;
let takeASeatButtonX,
  takeASeatButtonY,
  takeASeatButtonWidth,
  takeASeatButtonHeight;
let takeASeatButtonIsHovered = false;
let takeASeatButtonIsClicked = false;
let buttonX, buttonY, buttonWidth, buttonHeight;
let isHovered = false;
let isClicked = false;
let gameState;
let playerObject;
let matchCard = 0
let dealerCards = []
let playerCards = []
let currentlyDrawnCards = [0]
// Define card suits and their colors
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const suitColors = ["#FF0000", "#FF0000", "#000000", "#000000"]; // Hearts & Diamonds: Red, Clubs & Spades: Black

// Card dimensions and spacing
const cardWidth = 60;
const cardHeight = 90;
const horizontalSpacing = 70;
const verticalSpacing = 120;

// Starting position for the first card
let startX = 225;
let startY = 100;
let chosenCards = [null, null, null, null];

function drawTakeASeatButton() {
  // Button colors
  let bgColor = takeASeatButtonIsHovered ? color(0, 100, 0) : color(0, 50, 0); // Dark green, lighter on hover
  let textColor = color(255, 215, 0); // Gold text

  // Draw the button background
  fill(bgColor);
  rect(
    takeASeatButtonX,
    takeASeatButtonY,
    takeASeatButtonWidth,
    takeASeatButtonHeight,
    20
  ); // Rounded corners

  // Draw the button text
  fill(textColor);
  text(
    "Sit Down at the Table",
    takeASeatButtonX + takeASeatButtonWidth / 2,
    takeASeatButtonY + takeASeatButtonHeight / 2
  );
}

// Function to return the suit symbol based on the suit name
function getSuitSymbol(suit) {
  switch (suit) {
    case "Hearts":
      return "♥";
    case "Diamonds":
      return "♦";
    case "Clubs":
      return "♣";
    case "Spades":
      return "♠";
    default:
      return "";
  }
}

function readyToDraw() {
  drawTable();

  // Button dimensions and position
  takeASeatButtonWidth = width * 0.6; // 60% of the canvas width
  takeASeatButtonHeight = height * 0.15; // 15% of the canvas height
  takeASeatButtonX = (width - takeASeatButtonWidth) / 2; // Center horizontally
  takeASeatButtonY = (height - takeASeatButtonHeight) / 2; // Center vertically
  textSize(32); // Set text size for the button label
  textAlign(CENTER, CENTER); // Center-align text
  noStroke(); // No border around shapes

  // Check if the mouse is hovering over the button
  takeASeatButtonIsHovered =
    mouseX > takeASeatButtonX &&
    mouseX < takeASeatButtonX + takeASeatButtonWidth &&
    mouseY > takeASeatButtonY &&
    mouseY < takeASeatButtonY + takeASeatButtonHeight;

  // Draw the button
  drawTakeASeatButton();

  // Display a message if the button is clicked
  if (takeASeatButtonIsClicked) {
    fill(255, 215, 0); // Gold color for the message
    textSize(48);
    gameState = 2;
    kaartenshuffle.play()
  }
}

function drawCard(x, y, width, height, value, suit, color) {
  // Draw the card rectangle
  stroke(0);
  fill(255);
  rect(x, y, width, height);

  // Determine the card value text
  let cardText = "";
  if (value === 1) {
    cardText = "A"; // Ace
  } else if (value === 11) {
    cardText = "J"; // Jack
  } else if (value === 12) {
    cardText = "Q"; // Queen
  } else if (value === 13) {
    cardText = "K"; // King
  } else {
    cardText = value.toString(); // Numbers 2-10
  }

  // Draw the card value
  fill(color);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(cardText, x + width / 2, y + height / 3);

  // Draw the suit symbol
  let suitSymbol = getSuitSymbol(suit);
  textSize(24);
  text(suitSymbol, x + width / 2, y + (height * 2) / 3);
}

function GetBaseCards(){
    console.log(CPU)

    if(dealerCards[0] == null || dealerCards.length ==0){
        dealerCards[0] = getRandomCard();
        dealerCards[1] = getRandomCard();
        while(dealerCards[0].card ==1){
          dealerCards[0] = getRandomCard();
        }
        while(dealerCards[1].card ==1){
          dealerCards[1] = getRandomCard();
        }
        while(dealerCards[0] + dealerCards[1] == 20){
          dealerCards[Math.round(Math.random())] = getRandomCard();
        }
    }
    if(playerCards[0]==null||playerCards.length ==0){
        playerCards[0] = getRandomCard();
        playerCards[1] = getRandomCard();
        
        
    }

}


function setup() {
  createCanvas(960, 640);
  gameState = 0;
  playerObject = new Person();
  music = loadSound('lala.mp3')

}
function drawTable(){
  stroke('black')
	fill(34,49,29)            //achtergrond donker groen
	rect(0,0,960,640)
	fill(161, 102, 47)        //bruine rand
	strokeWeight(1)
	ellipse(480,120,1200,900)
	fill(0,153,0)             //groene binnencirkel
	ellipse(480,120,1150,850)
    strokeWeight(1)
  fill(0,153,0)
  stroke('white')
  rect(443,410,74,100) //midden

  push()
  translate(120,300)
  rotate(QUARTER_PI/2+0.2)
  rect(0,0,74,100)
  pop()
  
  push()
  translate(780,340)
  rotate(-QUARTER_PI/2-0.2)
  rect(0,0,74,100)
  pop()
}

function rateSelf() {
  // Loop through each suit
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    let currentY = startY + suitIndex * verticalSpacing; // Adjust Y position for each row

    for (let cardValue = 1; cardValue <= 10; cardValue++) {
      let currentX = startX + (cardValue - 1) * horizontalSpacing; // Adjust X position for each card

      // Draw the card using the drawCard function
      drawCard(
        currentX,
        currentY,
        cardWidth,
        cardHeight,
        cardValue,
        suits[suitIndex],
        suitColors[suitIndex]
      );
    }
    text("How important is a", 110, 130);
    text("similar age to you?", 110, 150);

    text("How important is a", 110, 250);
    text("a sporty life to you?", 110, 280);

    text("How busy are you", 110, 370);
    text("with your hobbies?", 110, 400);

    text("How important are", 110, 490);
    text("family and friends", 110, 520);
    text("to you?", 110, 550);
  }
}
function drawCardsOnTable(){
  if(dealerCards[0] != null&& dealerCards.length != 0){
    for(let i = 0; i < dealerCards.length; i++){
      
      let card = dealerCards[i]
      drawCard(300 +i*80, 100,cardWidth,cardHeight,card.card, card.suit, getColorBySuit(card.suit))
      /*if(gameState <6){
         break;
      }*/
    }
    
  }
  if(playerCards[0] != null && playerCards.length != 0){
    for(let i = 0; i < playerCards.length; i++){
      
      let card = playerCards[i]
      drawCard(450 +i*44, 415,cardWidth,cardHeight,card.card, card.suit, getColorBySuit(card.suit))
    }
  }
}
function draw() {
  musicPlay();
  if(allowmusic < 1000){
    allowmusic++;
  }
  
  if (gameState == 0) {
    drawTable();
    rateSelf();

    if(
      chosenCards[0] != null &&
      chosenCards[1] != null &&
      chosenCards[2] != null &&
      chosenCards[3] != null
    ) {
      gameState = 1;
    }
  }if (gameState == 1) {
    background(0);
    readyToDraw();
    gamesPlayed = 0;
    gamesWon = 0;
  }if(gameState > 1 && gameState < 7){
    background(0)
    drawTable();
    drawCardsOnTable();
  }
  
  if(gameState ==2){
    roundpassed = false;
    dealerCards = []
    CPU = new Person();
    CPU.age = Math.round(18 + Math.random() * 25)
    CPU.ageDifferenceWithPartner = Math.round(Math.random() * 10);
    CPU.health = Math.round(Math.random() * 10);
    CPU.timeForHobbies = Math.round(Math.random() * 10);
    CPU.petImportance = Math.round(Math.random() * 10);
    gameState = 3;
    matchCard = 0
    playerCards = []
    let agediff = Math.abs(CPU.age - playerObject.age)
    agediffFactor = agediff/((10 -CPU.ageDifferenceWithPartner) +(10-playerObject.ageDifferenceWithPartner))
    agediffFactor = 13- Math.floor(agediffFactor) 
    GetBaseCards();
    playerCards[0] = getRandomCard();
    playerCards[0] = new Card(SuitType.HEARTS, agediffFactor)
    if(playerCards[0].card == 14){
      playerCards[0].card = 13
    }else if(playerCards[0].card <1){
      playerCards[0].card = Math.random*6 +1;
    }
    
    playerCards[1] = new Card(SuitType.DIAMONDS, Math.abs(CPU.health - playerObject.health)+4)

    
  }if(gameState == 3){
    // Draw the "Hit" button
  fill(0, 255, 0); // Green color
  rect(100, 500, 100, 50); // x, y, width, height
  fill(0); // Black text
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Hit", 150, 525); // Centered text inside the "Hit" button

  // Draw the "Stand" button
  fill(255, 0, 0); // Red color
  rect(250, 500, 100, 50); // x, y, width, height
  fill(0); // Black text
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Stand", 300, 525); // Centered text inside the "Stand" button
  }if(gameState == 4){
    let dealerTotal = calculateHandValue(dealerCards);
  
  // Dealer draws until total > 16
  while (dealerTotal <= 16) {
    dealerCards.push(getRandomCard());
    dealerTotal = calculateHandValue(dealerCards);
  }
  
  // Compare hands and determine outcome
  let playerTotal = calculateHandValue(playerCards);
  let resultMessage;
  
  if (dealerTotal > 21) {
    resultMessage = "Dealer busts! You win!";
    if(!roundpassed){
      gamesWon++;
      setTimeout(function(){   
        win.play();
      }, 800)
    }
  }else if(playerTotal > dealerTotal){
    if(!roundpassed){
    setTimeout(function(){   
      lose.play();
    }, 800)
  }
  }else if (playerTotal > dealerTotal) {
    resultMessage = "You win!";
    if(!roundpassed){
      gamesWon++;
      setTimeout(function(){   
        win.play();
      }, 800)
    }
  } else if (playerTotal < dealerTotal) {
    resultMessage = "Dealer wins!";
    
    if(!roundpassed){
      setTimeout(function(){   
        lose.play();
      }, 800)
    }
    
  } else {
    resultMessage = "It's a tie!";
  }
  
  // Transition to result state (e.g., gameState 9)
   // Update to your desired result state
   if(!roundpassed){
    gamesPlayed++;
    setTimeout(function(){   
      if(gamesPlayed <5){
        gameState = 2;
        
      }else{
        gameState = 9;
      }
      
      
    }, 2000)
    roundpassed=true;
   }
  
  console.log(resultMessage); // Replace with UI updates as needed
    
  }
  if(gameState ==9){
    console.log(gamesWon + "/" + gamesPlayed)
    drawTable();
    image(img, 150,200, 200,200)
    fill(0)
    textSize(50)
    text("Berta, 27", 480, 230)
    fill(255); // White background
  stroke(0); // Black border
  rectMode(CENTER);
  textSize(16);
  textAlign(CENTER, CENTER);
  
  // First button at (200, 600)
  rect(200, 600, 120, 50);
  fill(0);
  text("ALL IN", 200, 600);
  fill(255);
  
  // Second button at (600, 600)
  rect(600, 600, 140, 50);
  fill(0);
  text("GIVE UP HAND", 600, 600)
  rectMode(CORNER);
  }
  if(gameState == 10){
      drawTable();
      if(!yay.isPlaying() && !yayhasplayed){
        yay.play()
        yayhasplayed = true;
      }
      // Chat box styling
  fill(255); // White background for the chat box
  stroke(0); // Black border
  strokeWeight(2); // Thicker border
  rectMode(CORNER); // Default rectangle mode
  textSize(16);
  textAlign(LEFT, TOP); // Align text to the top-left corner
  textStyle(NORMAL);

  // Draw the chat box
  let chatBoxX = 200; // 200px from the left
  let chatBoxY = 200; // 200px from the top
  let chatBoxWidth = 400;
  let chatBoxHeight = 400;

  rect(chatBoxX, chatBoxY, chatBoxWidth, chatBoxHeight);

  // Add a title bar to the chat box
  fill(0, 100, 200); // Blue color for the title bar
  rect(chatBoxX, chatBoxY, chatBoxWidth, 30); // Title bar height = 30px

  // Add text to the title bar
  fill(255); // White text
  noStroke();
  text("Berta", chatBoxX + 10, chatBoxY + 5);

  // Add some sample chat messages inside the box
  fill(0); // Black text
  text("No message has been sent yet", chatBoxX + 10, chatBoxY + 40);

  // Add a simple input area at the bottom of the chat box
  fill(240); // Light gray background for the input area
  rect(chatBoxX, chatBoxY + chatBoxHeight - 40, chatBoxWidth, 40); // Input area height = 40px

  // Add placeholder text in the input area
  fill(150); // Gray text for placeholder
  text("Type your message here...", chatBoxX + 10, chatBoxY + chatBoxHeight - 35);
  
  }
}

function mouseClicked() {
  if (gameState === 0) {
    // Check if a card was clicked
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      let currentY = startY + suitIndex * verticalSpacing; // Adjust Y position for each row
      for (let cardValue = 1; cardValue <= 10; cardValue++) {
        let currentX = startX + (cardValue - 1) * horizontalSpacing; // Adjust X position for each card

        // Check if the mouse click is inside the card's bounds
        if (
          mouseX >= currentX &&
          mouseX <= currentX + cardWidth &&
          mouseY >= currentY &&
          mouseY <= currentY + cardHeight
        ) {
          console.log(`You clicked: ${cardValue} of ${suits[suitIndex]}`);
          chosenCards[suitIndex] = cardValue;
          eenkaartje.play()
          if (suitIndex == 0) {
            playerObject.ageDifferenceWithPartner =cardValue;
          }
          if (suitIndex == 1) {
            playerObject.health = cardValue;
          }
          if (suitIndex == 2) {
            playerObject.timeForHobbies = cardValue;
          }
          if (suitIndex == 3) {
            playerObject.petImportance = cardValue;
          }
          /*
          this.health = health; // Health status (could be a string or numerical value)
    this.timeForHobbies = timeForHobbies; // Time allocated for hobbies (e.g., in hours per week)
    this.petImportance
          */
          break; // Exit the inner loop once a card is clicked
        }
      }
    }
  } else if (gameState === 1) {
    // Check if the button was clicked
    if (takeASeatButtonIsHovered) {
      yayhasplayed = false;
      takeASeatButtonIsClicked = true;
    }
  }else if(gameState ==3){
    // Check if the "Hit" button is clicked
  if (mouseX > 100 && mouseX < 200 && mouseY > 500 && mouseY < 550) {
    console.log("Hit button pressed!");
    playerCards[playerCards.length] = getRandomCard();
    eenkaartje.play()
  }

  // Check if the "Stand" button is clicked
  if (mouseX > 250 && mouseX < 350 && mouseY > 500 && mouseY < 550) {
    stand.play()
    gameState=4;
    
    // Add your "Stand" functionality here
  }
  }else if (gameState === 9) {
    // ALL IN button (200,600) - 120x50
    if (mouseX > 140 && mouseX < 260 && mouseY > 575 && mouseY < 625) {
      allin.play(); // Play sound effect
      gameState = 10;
    }
    // GIVE UP HAND button (600,600) - 140x50
    else if (mouseX > 530 && mouseX < 670 && mouseY > 575 && mouseY < 625) {
      gameState = 1;
    }
  }
}


function keyPressed() {
  if (key === 'r') {
    gameState = 2;
  }
  if(key ==='n'){
    gameState = 9;
  }
  if(key === 'm'){
    gameState = 10;
  }
}

/*

console.log("skibidi")
    playerCardValue = 0;
    console.log("cards: "+playerCards.length)
    for(let cardNr = 0; cardNr < playerCards.length; cardNr++){
      console.log("ski")
      if(playerCards[cardNr].card >=10){
        playerCardValue += 10
        console.log("added 10")
      }else if(playerCards[cardNr].card != 1){
        console.log("added number: " + playerCards[cardNr].card)
        playerCardValue += playerCards[cardNr].card;
      }else if(playerCards[cardNr].card == 1){
        if(playerCardValue + 11 <22){
          console.log("added 11")
          playerCardValue += 11;
        }else{
          console.log("added 1")
          playerCardValue++;
        }
      }
    }
      console.log(playerCardValue)
    if(playerCardValue > 21){

      gameState =2;
      console.log("break")
    }else{
      gameState = 2;
    }

    */