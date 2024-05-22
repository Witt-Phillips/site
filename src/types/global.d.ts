// src/types/global.d.ts
import p5 from "p5";

export type P5jsContainerRef = HTMLDivElement;
export type P5jsSketch = (p: p5) => void;
export type P5jsContainerProps = {
  sketch: P5jsSketch;
};
