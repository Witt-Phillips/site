class Food {
  constructor(p) {
    this.p = p;

    if (typeof window !== "undefined") {
      this.position = p.createVector(p.random(p.width), p.random(p.height));
    } else {
      this.position = { x: 0, y: 0 }; // Default values for SSR safety
    }

    this.size = 30;
    this.minSize = 2;
    // this.minSize = this.size;
    this.currSize = this.minSize;
    this.color = p.createVector(150, 100, 255);
    this.consumed = false;
  }

  draw() {
    if (typeof window !== "undefined") {
      this.p.strokeWeight(this.currSize / 12);
      this.p.stroke(this.color.x, this.color.y, this.color.z, this.transparency);
      this.p.fill(this.color.x, this.color.y, this.color.z, 50); // this.p.min(this.transparency, 100));
      this.p.circle(this.position.x, this.position.y, this.currSize);
    }
  }
}

export default Food;
