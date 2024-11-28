let buttonPosition;
let targetPosition;
let displayText = "congratulations you won a free vacation!"; // Testo iniziale

function setup() {
  createCanvas(windowWidth, windowHeight); 
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  // Posizione iniziale del bottone
  buttonPosition = createVector(width / 2, height / 2 + 100);
  targetPosition = buttonPosition.copy();
}

function draw() {
  background(255);

  // Testo principale
  fill(0);
  textSize(24);
  text(displayText, width / 2, height / 2 - 50);

  // Disegna il bottone
  drawButton(buttonPosition.x, buttonPosition.y, "Claim Prize");

  
  buttonPosition.lerp(targetPosition, 0.1);

  
  let d = dist(mouseX, mouseY, buttonPosition.x, buttonPosition.y);
  if (d < 75) {
    moveButton(); 
  }
}


function drawButton(x, y, label) {
  fill(100, 200, 255);
  stroke(0);
  rect(x, y, 150, 50, 10);
  fill(0);
  textSize(16);
  text(label, x, y);
}

// Cambia la posizione del bottone 
function moveButton() {
  targetPosition.x = random(100, width - 100);
  targetPosition.y = random(100, height - 100);
}

// Controlla se il mouse clicca sul bottone
function mousePressed() {
  
  let d = dist(mouseX, mouseY, buttonPosition.x, buttonPosition.y);
  if (d < 75) {
    displayText = "BEWARE OF SCAM!"; // Cambia il testo
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ridimensiona il canvas dinamicamente
}
