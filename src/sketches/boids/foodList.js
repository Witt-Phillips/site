// src/sketches/foodList.js
import Food from './food.js';

class FoodList {
  constructor(p, size, tick) {
    this.p = p;
    this.list = [];
    this.tick = tick; // food respawn rate

    for (let i = 0; i < size; i++) {
      this.list.push(new Food(p));
    }
  }

  run() {
    for (let food of this.list) {
      // collapse out
      if (food.consumed) {
        food.currSize--;
      } else {
        // expand in
        food.currSize = this.p.min(food.currSize + 1, food.size);
      }

      food.draw();

      // remove if eaten
      if (food.currSize < food.minSize) {
        const idx = this.list.indexOf(food);
        if (idx !== -1) {
          this.list.splice(idx, 1);
        }
      }
    }
  }

  add() {
    this.list.push(new Food(this.p));
  }
}

export default FoodList;
