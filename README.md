# p5.particle
A simple Particle Library

This library is basically for creating explosion-like effects and using them in your p5 sketches to "juice" them up. This library was mainly made for those who are aiming to create games with p5, but with it's extreme simplicity, anyone can easily use it.

The source file is under `libraries/p5.particle.js`

## General overview
You have to have a JSON file (example provided) for every particle system you want to use in your sketch. This JSON file provides information about the look, and the behaviour of every particle as well as telling the system to emit it's particles in the given way. To put it simply, the thing that matters is the JSON file.

Steps for using this library: 
1. Make sure that you have all your JSON files in your program it is suggested to put them all in a seperate folder to avoid keeping your coding environment clean.
2. For every JSON file you have, you must call the function `DefineParticle(name, directory)` in your sketches `setup` function. You can give any name to it, this is used later to instantiate your particle system. The directory should be where you put your JSON file in the first step. Ex: my JSON files name is `particle_system_1.json` and it is located under the folder `particle_properties` and I want to name the system "explosion". In the sketches `setup` function, I should call `DefineParticle("explosion", "particle_properties/particle_system_1.json")`
3. Type `ParticleHandler()` in your sketches `draw` function. 
4. This is the step where you'll actually make particle systems appear on your screen. You should type `Instantiate(name, x, y)` in the `setup` or any other non-continuous function.
    - x: x position of the particle system object
    - y: y position of the particle system object
    - name: name that you gave to the system at the start of your sketch 

Your particle system should start appearing on your screen.

**Note:** Calling the function Instantiate() in the function `draw` could cause your sketch to crash, make sure to use it in non-continuous functions such as `mousePressed` or `keyPressed`








