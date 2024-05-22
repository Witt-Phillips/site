import { P5jsSketch } from "../../types/global";
import Flock from "./flock";
import FoodList from "./foodList";

let foodSpawnInterval: NodeJS.Timeout;

export const sketch: P5jsSketch = (p5) => {
  let flock: Flock | undefined;
  let foodList: FoodList | undefined;
  let parentElement: HTMLElement | null = null;

  const setupCanvas = () => {
    if (typeof window !== "undefined") {
      parentElement = document.getElementById("p5-container");
      if (parentElement) {
        p5.createCanvas(parentElement.clientWidth, parentElement.clientHeight).parent(parentElement);

        // Initialize the flock
        flock = new Flock(p5, 10, 2); // Example: 10 prey boids, 2 predator boids

        // Initialize FoodList
        foodList = new FoodList(p5, 10, 750);
        setFoodSpawnInterval(foodList.tick);
      } else {
        requestAnimationFrame(setupCanvas);
      }
    }
  };

  const setFoodSpawnInterval = (tick: number) => {
    if (foodSpawnInterval) {
      clearInterval(foodSpawnInterval);
    }
    foodSpawnInterval = setInterval(() => {
      if (foodList) {
        foodList.add();
      }
    }, tick);
  };

  p5.setup = () => {
    setupCanvas();
  };

  p5.draw = () => {
    p5.clear(); // Clear the canvas with transparency

    // Run and draw the flock
    if (flock && foodList) {
      flock.run(foodList, 1, 1, 1, 2, 1, 1); // Example values for alignment, cohesion, separation, etc.
    }

    // Run and draw the food list
    if (foodList) {
      foodList.run();
    }
  };

  p5.windowResized = () => {
    if (typeof window !== "undefined") {
      parentElement = document.getElementById("p5-container");
      if (parentElement) {
        p5.resizeCanvas(parentElement.clientWidth, parentElement.clientHeight);
      }
    }
  };
};
