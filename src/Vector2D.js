class Vector2D {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  add (vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  static add (vec1, vec2) {
    return new Vector2D (vec1.x + vec2.x, vec1.y + vec2.y);
  }

  sub (vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  static sub (vec1, vec2) {
    return new Vector2D (vec1.x - vec2.x, vec1.y - vec2.y);
  }

  mult (num) {
    this.x *= num;
    this.y *= num;
  }

  static mult (vec, num) {
    return new Vector2D (vec.x * num, vec.y * num);
  }

  dot (vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  static dot (vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y;
  }

  mag() {
    return this.dot(this) ** 0.5;
  }

  normalize () {
    if (this.mag() != 0) {
      this.x /= this.mag();
      this.y /= this.mag();
    }
  }

  setMag (value) {
    this.normalize();
    this.mult(value);
  }

  limit (value) {
    if (this.mag() > value) {
      this.setMag(value);
    }
  }

  dist (vec) {
    let result = Vector2D.sub(this, vec);
    return result.mag();
  }

  static dist (vec1, vec2) {
    let result = Vector2D.sub(vec1, vec2);
    return result.mag();
  }
}
