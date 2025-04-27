const system_map = new Map();

var particle_systems = [];
var startHandler = false;

p5.prototype.particleHandler = function () {
  startHandler = true;
  for (let i = particle_systems.length - 1; i > -1; i--) {
    particle_systems[i].update();
    if (particle_systems[i].properties.debug) {
      particle_systems[i].show();
    }

    if (particle_systems[i].dead()) {
      particle_systems.splice(i, 1);
    }
  }
};

p5.prototype.loadParticle = function (name, directory) {
  loadJSON(
    directory,
    (data) => {
      system_map.set(name, data);
    },
    (err) => {
      console.error(`Particle "${name}" could not be loaded: ${err}`);
    }
  );
};

p5.prototype.startParticle = function (name, x, y) {
  if (startHandler == false) {
    console.err(
      `Particle handler is not started. Try putting "particleHandler();" in the draw function.`
    );
  }

  let property = system_map.get(name);
  if (property) {
    particle_systems.push(new Particle_System(x, y, property));
  } else {
    console.err(
      `Particle "${name}" not found. Make sure to load the particle before using it.`
    );
  }
};

function Particle_System(x, y, properties) {
  this.properties = properties;
  this.stop = false;
  this.x = x;
  this.y = y;

  this.particle_count = 0;

  if (this.properties.edge_to_center_motion) {
    this.angle = 0;
  }

  if (this.properties.fixed_particle_count == true) {
    this.particle_count = this.properties.particle_count;
  } else {
    this.particle_count = floor(
      random(
        this.properties.min_particle_count,
        this.properties.max_particle_count + 1
      )
    );
  }

  this.particles = [];

  this.show = function () {
    push();
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(degrees(45));
    fill(255, 0, 0, 100);
    noStroke();
    rect(0, 0, 20, 20);
    pop();

    push();
    textAlign(CENTER);
    fill(0);
    text(this.particles.length, this.x, this.y + 5);
    pop();
  };

  this.update = function () {
    for (let i = this.particles.length - 1; i > -1; i--) {
      this.particles[i].show();
      if (!this.particles[i].dead()) {
        this.particles[i].update();
      }

      if (this.particles[i].properties.edge_to_center_motion) {
        this.particles[i].edge_to_center(createVector(this.x, this.y));
      }

      if (this.particles[i].dead() && this.stop) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length < this.particle_count && this.stop == false) {
      if (this.properties.type == "fountain") {
        if (frameCount % this.properties.particle_deploy_freq == 0) {
          if (this.properties.edge_to_center_motion) {
            this.angle = random(360);
            let x =
              this.properties.distance_from_center * cos(this.angle) + this.x;
            let y =
              this.properties.distance_from_center * sin(this.angle) + this.y;
            this.particles.push(new Particle(x, y, this.properties));
          } else {
            this.particles.push(new Particle(this.x, this.y, this.properties));
          }
        }
      } else if (this.properties.type == "burst") {
        if (this.properties.edge_to_center_motion) {
          for (let i = 0; i < this.particle_count; i++) {
            this.angle = random(360);
            let x =
              this.properties.distance_from_center * cos(this.angle) + this.x;
            let y =
              this.properties.distance_from_center * sin(this.angle) + this.y;
            this.particles.push(new Particle(x, y, this.properties));
          }
        } else {
          for (let i = 0; i < this.particle_count; i++) {
            this.particles.push(new Particle(this.x, this.y, this.properties));
          }
        }
      }
    }

    if (this.particles.length >= this.particle_count) {
      this.stop = true;
    }
  };

  this.dead = function () {
    if (this.particles.length <= 0 && this.stop) {
      return true;
    } else {
      return false;
    }
  };
}

function Particle(x, y, properties) {
  this.properties = properties;
  this.position = createVector(x, y);
  this.velocity = createVector();
  this.acceleration = createVector();

  this.timer = 0;

  this.alpha = this.properties.alpha;
  this.stroke_alpha = this.properties.stroke_alpha;

  if (this.properties.simulate_perlin_noise) {
    this.x_offset = random(1000);
    this.y_offset = random(1000);
  }

  if (this.properties.randomized_angular_velocity) {
    this.angular_velocity = random(
      this.properties.min_angular_velocity,
      this.properties.max_angular_velocity
    );
  } else {
    this.angular_velocity = this.properties.angular_velocity;
  }

  this.angular_acceleration = this.properties.angular_acceleration;

  if (this.properties.match_angular_acceleration_to_angular_velocity) {
    if (this.angular_velocity < 0) {
      if (this.angular_acceleration > 0) {
        this.angular_acceleration = -this.angular_acceleration;
      }
    } else if (this.angular_velocity > 0) {
      if (this.angular_acceleration < 0) {
        this.angular_acceleration = -this.angular_acceleration;
      }
    }
  }

  if (this.properties.randomized_angle) {
    this.angle = random(0, 180);
  } else {
    this.angle = this.properties.angle;
  }

  if (this.properties.randomized_radii) {
    if (this.properties.normalize) {
      this.x_radius = random(this.properties.min_x, this.properties.max_x);
      this.y_radius = this.x_radius;
    } else {
      this.x_radius = random(this.properties.min_x, this.properties.max_x);
      this.y_radius = random(this.properties.min_y, this.properties.max_y);
    }
  } else {
    this.x_radius = this.properties.x_radius;
    this.y_radius = this.properties.y_radius;
  }

  this.force_x = random(
    this.properties.min_force_x,
    this.properties.max_force_x
  );
  this.force_y = random(
    this.properties.min_force_y,
    this.properties.max_force_y
  );

  if (this.properties.simulate_gravity) {
    if (this.properties.fixed_gravity_scale) {
      this.gravity_scale_x = this.properties.gravity_scale_x;
      this.gravity_scale_y = this.properties.gravity_scale_y;
    } else {
      this.gravity_scale_x = random(
        this.properties.min_gravity_scale_x,
        this.properties.max_gravity_scale_x
      );
      this.gravity_scale_y = random(
        this.properties.min_gravity_scale_y,
        this.properties.max_gravity_scale_y
      );
    }
  }

  if (this.properties.fixed_lifespan) {
    this.lifespan = this.properties.lifespan;
  } else {
    this.lifespan = random(
      this.properties.min_lifespan,
      this.properties.max_lifespan + 1
    );
  }

  this.alpha_decreasement = this.properties.alpha / this.lifespan;

  if (this.properties.fill_) {
    this.r = this.properties.r;
    this.g = this.properties.g;
    this.b = this.properties.b;
  }

  if (this.properties.stroke_) {
    this.stroke_r = this.properties.stroke_r;
    this.stroke_g = this.properties.stroke_g;
    this.stroke_b = this.properties.stroke_b;
  }

  this.alpha = this.properties.alpha;

  this.show = function () {
    push();
    rectMode(CENTER);

    if (this.properties.debug) {
      noFill();
      if (this.dead()) {
        stroke(0, 10);
      } else {
        stroke(0, 100);
      }

      rect(
        this.position.x,
        this.position.y,
        this.x_radius * 3,
        this.y_radius * 3
      );
    }

    translate(this.position.x, this.position.y);
    rotate(radians(this.angle));
    if (this.properties.fill_) {
      fill(this.r, this.g, this.b, this.alpha);
    } else {
      noFill();
    }

    if (this.properties.stroke_) {
      stroke(this.stroke_r, this.stroke_g, this.stroke_b, this.stroke_alpha);
      strokeWeight(this.properties.stroke_weight);
    } else {
      noStroke();
    }

    if (this.properties.shape == "ellipse") {
      ellipse(0, 0, this.x_radius * 2, this.y_radius * 2);
    } else if (this.properties.shape == "rectangle") {
      rect(0, 0, this.x_radius * 2, this.y_radius * 2);
    }
    pop();
  };

  this.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    if (this.timer < this.properties.lifespan_start_delay * 60) {
      this.timer++;
    } else {
      this.alpha -= this.alpha_decreasement;
      this.stroke_alpha -= this.alpha_decreasement;
    }

    this.angular_velocity += this.angular_acceleration;
    this.angle += this.angular_velocity;

    this.velocity.mult((100 - this.properties.slow_down) / 100);

    if (this.properties.simulate_gravity) {
      this.applyForce(this.gravity_scale_x, this.gravity_scale_y);
    }

    if (this.properties.simulate_perlin_noise) {
      this.x_offset += this.properties.offset_increment;
      this.y_offset += this.properties.offset_increment;
      let force_x = map(
        noise(this.x_offset),
        0,
        1,
        this.properties.min_noise_force,
        this.properties.max_noise_force
      );
      let force_y = map(
        noise(this.y_offset),
        0,
        1,
        this.properties.min_noise_force,
        this.properties.max_noise_force
      );
      this.applyForce(force_x, force_y);
    }
  };

  this.edge_to_center = function (destination) {
    let dest = createVector(destination.x, destination.y);
    dest.sub(this.position);
    dest.setMag(this.properties.motion_force);
    this.applyForce(dest.x, dest.y);
  };

  this.dead = function () {
    if (this.alpha <= 0) {
      return true;
    } else {
      return false;
    }
  };

  this.applyForce = function (force_x, force_y) {
    let force = createVector(force_x, force_y);
    this.acceleration.add(force);
  };

  this.applyForce(this.force_x, this.force_y);
}
