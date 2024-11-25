let x = 0;
let y = 0;
let y2 = 600 
let dia = 0;
let gap = 100 

function setup() {
  createCanvas(600, 600);
	background(0);
	// noStroke();	
}

function draw() {
	background(0, 50);

 for (let i = 0; i <= width - gap; i += gap) {

    if (i % (gap * 2) == 0) {
      noFill()
      stroke(255)
      circle(i+ dia/2 + 15, y, dia);
    } else {
      fill(255)
      circle(i+ dia/2 + 15, y2, dia);
    }

    if (frameCount % 10 == 0 && dia <= 70) {
      dia++
    }

  }

  y+=3
  y2-=3
	
	y = (y + height) % height;
  if ((y + height)% height == 0) {
    dia = 0
  }
  y2 = (y2 + height) % height;
}
