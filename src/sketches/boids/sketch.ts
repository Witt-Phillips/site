import p5 from 'p5';
import FoodList from './foodList.js';
import Flock from './flock.js';
import { P5jsSketch } from "../../types/global";

let foodSpawnInterval: NodeJS.Timeout;
let previousTick: number;

export const sketch: P5jsSketch = (p5, parentRef) => {
  let foodList: FoodList;
  let flock: Flock;

  p5.setup = () => {
    p5.createCanvas(parentRef.clientWidth, parentRef.clientHeight).parent(parentRef);

    // Initialize FoodList
    foodList = new FoodList(p5, 10, 750);
    setFoodSpawnInterval(foodList.tick);
    previousTick = foodList.tick;

    // Initialize flock
    flock = new Flock(p5, 100, 0);
  };

  p5.draw = () => {
    p5.background(50);

    // Run flock
    flock.run(foodList, 1, 1, 1, 1, 1, 1);
    
    // Run food list
    foodList.run();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(parentRef.clientWidth, parentRef.clientHeight);
  };

  // Control the rate at which food spawns
  function setFoodSpawnInterval(tick: number) {
    if (foodSpawnInterval) {
      clearInterval(foodSpawnInterval);
    }
    foodSpawnInterval = setInterval(() => {
      foodList.add();
    }, tick);
  }
};
