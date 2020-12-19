class Vehicle {
  constructor (x, y) {
    this.position = new Vector2D (x, y);
    this.velocity = new Vector2D (0, 0);
    this.acceleration = new Vector2D (0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.1;
  }

  setSeekTarget (x, y) {
    this.seekTarget = new Vector2D (x, y);
  }

  applyForce (force) {
    this.acceleration.add(force);
  }

  update () {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  seek () {
    let desired = Vector2D.sub(this.seekTarget, this.position);
    desired.setMag(this.maxSpeed);
    let steer = Vector2D.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  arrive () {
    let desired = Vector2D.sub(this.seekTarget, this.position);

    let speed = this.maxSpeed;
    let dist = desired.mag();
    if (dist < 100) {speed = this.maxSpeed / 100 * dist;}
    desired.setMag(speed);

    let steer = Vector2D.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  flee (target, radius) {
    let desired = Vector2D.sub(this.position, target);
    if (desired.mag() < radius) {
      desired.setMag(this.maxSpeed);
      let steer = Vector2D.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      steer.mult(5);
      this.applyForce(steer);
    }
  }

  render (world, colour_callback) {
    colour_callback();
    let inter = world.scale == 1 ? 0 : 1;
    world.ctx.fillRect(this.position.x, this.position.y, world.scale-inter, world.scale-inter);
  }
}
