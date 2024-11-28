let cols = 10; // Numero di colonne
let rows = 10; // Numero di righe
let spacing = 100; // Spaziatura tra le lettere
let letterTexture; // Texture per il rendering del testo
let letters = []; // Array per memorizzare le lettere attuali
let targetLetters = []; // Array per le lettere di destinazione
let specialPositions = []; // Posizioni delle lettere "ZHDK"
let changing = false; // Flag per indicare se le lettere stanno cambiando
let changeStartTime; // Tempo di inizio del cambio
let changeDuration = 2000; // Durata del cambio (in millisecondi)

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Canvas che si adatta alla finestra

  // Crea una texture per il rendering del testo
  letterTexture = createGraphics(200, 200);
  letterTexture.textSize(80);
  letterTexture.textFont('Arial');
  letterTexture.textAlign(CENTER, CENTER);

  // Genera lettere casuali iniziali
  for (let i = 0; i < cols; i++) {
    letters[i] = [];
    targetLetters[i] = [];
    for (let j = 0; j < rows; j++) {
      letters[i][j] = char(floor(random(65, 91))); // Lettere iniziali (A-Z)
      targetLetters[i][j] = letters[i][j]; // Stessa lettera come destinazione iniziale
    }
  }

  assignZHDP();
}

function draw() {
  background(25); // Sfondo nero
  rotateX(map(mouseY, 0, height, -PI / 6, PI / 6)); //  verticale
  rotateY(map(mouseX, 0, width, -PI / 6, PI / 6));  //  orizzontale

  if (changing) {
    let elapsedTime = millis() - changeStartTime;
    if (elapsedTime < changeDuration) {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Cambia gradualmente le lettere durante il periodo di transizione
          if (random() < 0.1) {
            letters[i][j] = char(floor(random(65, 91))); // Lettere casuali 
          }
        }
      }
    } else {
      // Fine del cambio: assegna le lettere di destinazione
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          letters[i][j] = targetLetters[i][j];
        }
      }
      changing = false; // ARRESTA CAMBIO
    }
  }

  for (let i = -cols / 2; i < cols / 2; i++) {
    for (let j = -rows / 2; j < rows / 2; j++) {
      push();
      let x = i * spacing;
      let y = j * spacing;
      let z = sin(frameCount * 0.05 + (i + j) * 0.5) * 50; // Oscillazione sull'asse Z
      translate(x, y, z);
      noStroke();

      // Determina se questa posizione fa parte di "ZHDK"
      let isSpecial = specialPositions.some(
        (pos) => pos.x === i + cols / 2 && pos.y === j + rows / 2
      );

      // Disegna la lettera sulla texture
      letterTexture.clear();
      letterTexture.fill(isSpecial ? color(255, 0, 0) : color(255)); // Rosso "ZHDK", bianco altro
      letterTexture.text(letters[i + cols / 2][j + rows / 2], 100, 100);

      // Mappa la texture su un piano
      texture(letterTexture);
      plane(40, 40);
      pop();
    }
  }
}

function mousePressed() {
  // STARRT CAMBIO LETTERE
  changing = true;
  changeStartTime = millis();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      targetLetters[i][j] = char(floor(random(65, 91))); // Nuove lettere di destinazione
    }
  }
  assignZHDP(); // Reimposta la parola "ZHDK"
}

function assignZHDP() {
  let positions = []; // POSIZIONI USATE  
  specialPositions = []; // Resetta le posizioni speciali

  function getRandomPosition() {
    let x, y;
    do {
      x = floor(random(cols));
      y = floor(random(rows));
    } while (positions.some((p) => p.x === x && p.y === y)); // POSIZIONE UNICA
    positions.push({ x, y });
    return { x, y };
  }

  let word = "ZHDK";
  for (let k = 0; k < word.length; k++) {
    let pos = getRandomPosition();
    targetLetters[pos.x][pos.y] = word[k];
    specialPositions.push(pos); // Registra le posizioni speciali
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ridimensiona il canvas dinamicamente
}
