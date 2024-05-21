import { P5jsSketch } from "../../types/global";
import FoodList from './foodList.js';
import Flock from './flock.js';
import {BoidType} from './boid.js'; // Ensure BoidType is exported from boid.js

let foodSpawnInterval: NodeJS.Timeout;
let previousTick: number;

export const sketch: P5jsSketch = (p5, parentRef) => {
  let foodList: FoodList;
  let flock: Flock;

  p5.setup = () => {
    p5.createCanvas(parentRef.clientWidth, parentRef.clientHeight).parent(parentRef);

    // Initialize FoodList and Flock
    foodList = new FoodList(p5, 10, 750);
    flock = new Flock(p5, 10, 0); // Example initialization
    setFoodSpawnInterval(foodList.tick);
    previousTick = foodList.tick;
  };

  p5.draw = () => {
    p5.background(50);
    // Update food spawn tick if changed
    let currentTick = 750; // Example value, update based on your slider logic
    if (currentTick !== previousTick) {
      foodList.tick = currentTick;
      setFoodSpawnInterval(foodList.tick);
      previousTick = currentTick;
    }

    // Run simulation
    flock.run(foodList, 1, 1, 1, 2, 1, 1); // Example values for sliders
    // Update food
    foodList.run();
  };

  p5.mousePressed = () => {
    if (p5.keyIsDown(p5.SHIFT)) {
      flock.genBoid(p5.mouseX, p5.mouseY, BoidType.PREDATOR);
    } else if (p5.keyIsDown(32)) { // 32 is the keyCode for spacebar
      flock.genBoid(p5.mouseX, p5.mouseY, BoidType.PLAYER_PREDATOR);
    } else {
      flock.genBoid(p5.mouseX, p5.mouseY, BoidType.PREY);
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(parentRef.clientWidth, parentRef.clientHeight);
  };

  function setFoodSpawnInterval(tick: number) {
    if (foodSpawnInterval) {
      clearInterval(foodSpawnInterval);
    }
    foodSpawnInterval = setInterval(() => {
      foodList.add();
    }, tick);
  }
};
