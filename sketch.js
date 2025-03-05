//1-13 hearts
//14-26 diamonds
//27-39 spades
//40-52 clubs
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
// Define card suits and their colors
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const suitColors = ["#FF0000", "#FF0000", "#000000", "#000000"]; // Hearts & Diamonds: Red, Clubs & Spades: Black

// Card dimensions and spacing
const cardWidth = 60;
const cardHeight = 90;
const horizontalSpacing = 70;
const verticalSpacing = 120;

// Starting position for the first card
let startX = 50;
let startY = 50;
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
    text("You've sat down at the table!", width / 2, height * 0.8);
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

function setup() {
  createCanvas(960, 640);
  gameState = 0;
}
function drawTable() {
  fill(0, 153, 0);
  ellipse(500, 500, 5000, 5000);
  fill(161, 102, 47);
  ellipse(1000, 500, 1000, 500);
  fill(0, 153, 0);
  ellipse(1000, 500, 800, 400);
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
  }
}

function draw() {
  if (gameState == 0) {
    drawTable();
    rateSelf();

    if (
      chosenCards[0] != null &&
      chosenCards[1] != null &&
      chosenCards[2] != null &&
      chosenCards[3] != null
    ) {
      gameState = 1;
    }
  } else if (gameState == 1) {
    background(0);
    readyToDraw();
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
