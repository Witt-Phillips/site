// src/sketches/mysketch.ts
import { P5jsSketch } from "../types/global";

export const sketch: P5jsSketch = (p5, parentRef) => {
  p5.setup = () => {
    p5.createCanvas(parentRef.clientWidth, parentRef.clientHeight).parent(parentRef);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(parentRef.clientWidth, parentRef.clientHeight);
  };

  p5.draw = () => {
    p5.background(50);
    p5.circle(p5.width / 2, p5.height / 2, 50);
  };
};
