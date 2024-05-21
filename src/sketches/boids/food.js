// src/sketches/food.js
class Food {
    constructor(p) {
      this.p = p;
      this.position = p.createVector(p.random(p.width), p.random(p.height));
      this.size = 30;
      this.minSize = 2;
      this.currSize = this.minSize;
      //this.currSize = this.size;
      this.color = p.createVector(150, 100, 255);
      this.consumed = false;
    }
  
    draw() {
      this.p.strokeWeight(this.currSize / 12);
      this.p.stroke(this.color.x, this.color.y, this.color.z, this.transparency);
      this.p.fill(this.color.x, this.color.y, this.color.z, 50); //this.p.min(this.transparency, 100));
      //this.p.fill(this.color.x, this.color.y, this.color.z, 50);
      //this.p.point(this.position.x, this.position.y);
      this.p.circle(this.position.x, this.position.y, this.currSize);
    }
  }
  
  export default Food;
  