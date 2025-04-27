# 🎇 p5.particle

This is a lightweight particle system built for [p5.js](https://p5js.org/).  
You can create fountains, bursts, and explosion-like effects using JSON configurations.

<br>

![particles_demo](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXN4NDYxem43dGc2dDJubnltYmliczV5aGZvN2luMnJmYjdmNXRmaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L2abDzvo0l3994KFwO/giphy.gif)

<br>

## 🚀 How to Install

Just include the script in your project after loading p5.js:

```html
<script src="p5.particle.js"></script>
```

<br>

## 🛠️ How to Use

1. In your `setup()` function, load your particle system:

```javascript
loadParticle("myParticle", "particles/myParticle.json");
```

2. In your `draw()` loop, make sure to call:

```javascript
particleHandler();
```

3. When you want to start a particle system:

```javascript
startParticle("myParticle", mouseX, mouseY);
```

<br>

## ⚠️ Important Note

This code is old, and is prone to bugs.
Follow the documentation carefully and you won't run into any major problems.
If something unexpected happens, it's likely because of missing or wrong JSON values. Double-check the required fields, especially when enabling optional features like gravity or noise.

If you still hit issues, feel free to tweak the code, it's simple on purpose and easy to modify.
There's no fancy error handling inside; it's built to stay lightweight and flexible for quick projects.

<br>

## 📜 JSON Properties

**System Type**

- `type` (string, required): `"fountain"` or `"burst"`.
- `particle_deploy_freq` (number, required if type = fountain): Frames between particle spawns.

**Particle Count**

- `fixed_particle_count` (boolean): If true, uses a fixed number of particles. Default: `false`.
- `particle_count` (number, required if fixed_particle_count is true): Number of particles.
- `min_particle_count` and `max_particle_count` (numbers, required if fixed_particle_count is false): Random range for number of particles.

**Spawn Behavior**

- `edge_to_center_motion` (boolean): Particles spawn on a circle and move toward the center. Default: `false`.
- `distance_from_center` (number, required if edge_to_center_motion is true): Radius for edge spawn.

**Debug**

- `debug` (boolean): Draw debug visuals. Default: `false`.

**Appearance**

- `shape` (string): `"ellipse"` or `"rectangle"`. Default: `"ellipse"`.
- `fill_` (boolean): Fill the particle. Default: `true`.
- `stroke_` (boolean): Draw stroke. Default: `false`.
- `r`, `g`, `b` (numbers): Fill color RGB. Defaults: `255,255,255`.
- `stroke_r`, `stroke_g`, `stroke_b` (numbers): Stroke color RGB. Defaults: `0,0,0`.
- `stroke_weight` (number): Stroke width. Default: `1`.
- `alpha` (number): Transparency (0–255). Default: `255`.
- `stroke_alpha` (number): Stroke transparency (0–255). Default: `255`.

**Size**

- `x_radius`, `y_radius` (numbers): Fixed radius sizes.
- `randomized_radii` (boolean): Randomize particle sizes. Default: `false`.
- `min_x`, `max_x`, `min_y`, `max_y` (numbers): Size range if randomizing.
- `normalize` (boolean): Use the same value for both x and y if randomizing. Default: `false`.

**Rotation**

- `randomized_angular_velocity` (boolean): Randomize spin speed. Default: `false`.
- `angular_velocity` (number): Fixed spin speed if not random. Default: `0`.
- `min_angular_velocity` and `max_angular_velocity` (numbers): Random range if randomizing spin.
- `angular_acceleration` (number): Spin acceleration. Default: `0`.
- `match_angular_acceleration_to_angular_velocity` (boolean): Match spin direction automatically. Default: `false`.
- `randomized_angle` (boolean): Random starting rotation angle. Default: `false`.
- `angle` (number): Fixed starting angle if not random. Default: `0`.

**Forces**

- `min_force_x`, `max_force_x`, `min_force_y`, `max_force_y` (numbers): Initial random forces applied.

**Gravity**

- `simulate_gravity` (boolean): Apply gravity. Default: `false`.
- `fixed_gravity_scale` (boolean): Fixed or random gravity strength. Default: `true`.
- `gravity_scale_x`, `gravity_scale_y` (numbers): Gravity vectors for fixed gravity.
- `min_gravity_scale_x`, `max_gravity_scale_x`, `min_gravity_scale_y`, `max_gravity_scale_y` (numbers): Gravity random ranges if not fixed.

**Motion Toward Center**

- `motion_force` (number, required if edge_to_center_motion is true): Force magnitude to pull particles to center.

**Lifespan**

- `fixed_lifespan` (boolean): Fixed or random lifespan. Default: `true`.
- `lifespan` (number): Fixed lifespan if used.
- `min_lifespan`, `max_lifespan` (numbers): Randomized lifespan range if not fixed.
- `lifespan_start_delay` (number): Seconds before fading starts. Default: `0`.

**Damping and Slowdown**

- `slow_down` (number): Slow particle velocity over time (% per frame). Default: `0`.

**Noise**

- `simulate_perlin_noise` (boolean): Apply Perlin noise movement. Default: `false`.
- `offset_increment` (number, required if simulate_perlin_noise is true): How much noise offset increases every frame. **Recommended: 0.01**.
- `min_noise_force`, `max_noise_force` (numbers): Force range generated by Perlin noise.

<br>

## 📄 JSON Template

The `template.json` file inside the `example` directory contains a full particle config with **all** fields and **default values filled in**.
When creating new systems, you can either copy the template to use as a base, or pick one from the `particles` directory and tweak it to your heart's desire.

---

Built with 💓 towards p5.js and the processing foundation.

Software development is a form of artistic expression for me, and I thank everyone in the community who make it as accessible as it is 💞
