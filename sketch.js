let gameState;
function setup() {
	createCanvas(windowWidth, windowHeight);
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
function draw() {
	if(gameState == 0){
		console.log("hoi")
		drawTable();
	}else if(gameState == 1){
		
	}
	
}

