function setup() {
    createCanvas(800, 1200);
    DefineParticle("exp", "particle_props/p1.json");
}

function draw() {
    background(220);
    ParticleHandler();
}

function mousePressed() {
    Instantiate("exp", mouseX, mouseY);
}