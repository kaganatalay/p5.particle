function setup() {
  createCanvas(400, 400);
  loadParticle("template", "../template.json");
}

function draw() {
  background(220);
  particleHandler();
}

function mousePressed() {
  startParticle("template", mouseX, mouseY);
}
