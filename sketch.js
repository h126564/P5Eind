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
      if(gameState <6){
         break;
      }
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
  }if(gameState > 1){
    background(0)
    drawTable();
    drawCardsOnTable();
  }
  
  if(gameState ==2){
    
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
    playerCards[0] = new Card(SuitType.HEARTS, Math.abs(CPU.ageDifferenceWithPartner - playerObject.ageDifferenceWithPartner) +4)
    playerCards[1] = new Card(SuitType.DIAMONDS, Math.abs(CPU.health - playerObject.health)+4)

    GetBaseCards();
  }if(gameState == 3){
    if(matchCard == 0){
      //door de ingevulde vragen gaan en kijken hoe goed ze matchen
      
    }
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
      takeASeatButtonIsClicked = true;
    }
  }
}


function keyPressed() {
  if (key === 'r') {
    gameState = 2;
  }
}