let cols = 8; // Numero di colonne
let rows = 8; // Numero di righe
let spacing = 100; // Spaziatura tra le lettere
let letterTexture; // Texture per il rendering del testo
let letters = []; // Array per memorizzare le lettere attuali
let targetLetters = []; // Array per le lettere di destinazione
let changing = false; //  Flag per indicare se le lettere stanno cambiando
let changeStartTime; // Tempo di inizio del cambio
let changeDuration = 2000; // Durata del cambio (in millisecondi)

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Canvas che si adatta alla finestra

  // Crea una texture per il rendering del testo
  letterTexture = createGraphics(200, 200);
  letterTexture.textSize(100);
  letterTexture.textFont('Arial');
  letterTexture.textAlign(CENTER, CENTER);

  // Genera lettere casuali iniziali
  for (let i = 0; i < cols; i++) {
    letters[i] = [];
    targetLetters[i] = [];
    for (let j = 0; j < rows; j++) {
      letters[i][j] = char(floor(random(65, 91))); // Lettere iniziali (A-Z)
     // targetLetters[i][j] = letters[i][j]; // Stessa lettera come destinazione iniziale
    }
  }
}

function draw() {
  background(25); // Sfondo nero
  rotateX(map(mouseY, 0, height, -PI / 6, PI / 6)); // Rotazione verticale
  rotateY(map(mouseX, 0, width, -PI / 6, PI / 6));  // Rotazione orizzontale

  if (changing) {
    let elapsedTime = millis() - changeStartTime;
    if (elapsedTime < changeDuration) {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Cambia gradualmente le lettere durante il periodo di transizione
          if (random() < 0.5) {
            letters[i][j] = char(floor(random(65, 91))); // Lettere casuali temporanee
          }
        }
      x
      }
    } else {
      // Fine del cambio: assegna le lettere di destinazione
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          letters[i][j] = targetLetters[i][j];
        }
      }
      changing = false; // Ferma il processo di cambio
    }
  }

  for (let i = -cols / 2; i < cols / 2; i++) {
    for (let j = -rows / 2; j < rows / 2; j++) {
      push();
      let x = i * spacing;
      let y = j * spacing;
      let z = sin(frameCount * 0.05 + (i + j) * 0.5) * 100; // Oscillazione sull'asse Z
      translate(x, y, z);
      noStroke();

      // Disegna la lettera sulla texture
      letterTexture.clear();
      letterTexture.fill(255);
      letterTexture.text(letters[i + cols / 2][j + rows / 2], 100, 100);

      // Mappa la texture su un piano
      texture(letterTexture);
      plane(40, 40);
      pop();
    }
  }
}

function mousePressed() {
  // Attiva il cambio delle lettere
  changing = true;
  changeStartTime = millis();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      targetLetters[i][j] = char(floor(random(65, 91))); // Nuove lettere di destinazione
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ridimensiona il canvas dinamicamente
}
