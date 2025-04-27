function setup() {
  createCanvas(400, 400);
  loadParticle("exp", "../template.json");
}

function draw() {
  background(220);
  particleHandler();
}

function mousePressed() {
  startParticle("exp", mouseX, mouseY);
}
