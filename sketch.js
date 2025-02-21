//1-13 hearts
//14-26 diamonds
//27-39 spades
//40-52 clubs

// Function to return the suit symbol based on the suit name
function getSuitSymbol(suit) {
	switch (suit) {
	  case 'Hearts':
		return '♥';
	  case 'Diamonds':
		return '♦';
	  case 'Clubs':
		return '♣';
	  case 'Spades':
		return '♠';
	  default:
		return '';
	}
  }
  
  function drawCard(x, y, width, height, value, suit, color) {
	// Draw the card rectangle
	stroke(0);
	fill(255);
	rect(x, y, width, height);
  
	// Determine the card value text
	let cardText = '';
	if (value === 1) {
	  cardText = 'A'; // Ace
	} else if (value === 11) {
	  cardText = 'J'; // Jack
	} else if (value === 12) {
	  cardText = 'Q'; // Queen
	} else if (value === 13) {
	  cardText = 'K'; // King
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
	text(suitSymbol, x + width / 2, y + height * 2 / 3);
  }
  
  let gameState;
  // Define card suits and their colors
	const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
	const suitColors = ['#FF0000', '#FF0000', '#000000', '#000000']; // Hearts & Diamonds: Red, Clubs & Spades: Black
  
	// Card dimensions and spacing
	const cardWidth = 60;
	const cardHeight = 90;
	const horizontalSpacing = 70;
	const verticalSpacing = 120;
  
	// Starting position for the first card
	let startX = 50;
	let startY = 50;
  function setup() {
	  createCanvas(960, 640);
	  gameState = 0;
   
  }
  function drawTable(){
	  fill(0,153,0)
	  ellipse(500,500,5000,5000)
	  fill(161, 102, 47)
	  ellipse(1000,500,1000,500)
	  fill(0,153,0)
	  ellipse(1000,500,800,400)
  }
  
  function rateSelf(){
	  // Loop through each suit
	for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
	  let currentY = startY + suitIndex * verticalSpacing; // Adjust Y position for each row
  
	  for (let cardValue = 1; cardValue <= 10; cardValue++) {
		let currentX = startX + (cardValue - 1) * horizontalSpacing; // Adjust X position for each card
  
		// Draw the card using the drawCard function
		drawCard(currentX, currentY, cardWidth, cardHeight, cardValue, suits[suitIndex], suitColors[suitIndex]);
	  }
	}
  }
  
  function draw() {
	  if(gameState == 0){
		  drawTable();
		  rateSelf()
	  }else if(gameState == 1){
		  
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
			break; // Exit the inner loop once a card is clicked
		  }
		}
	  }
	}
  }
  