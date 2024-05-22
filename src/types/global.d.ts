import p5 from "p5";

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5, parentRef: P5jsContainerRef) => void;
type P5jsContainerProps = {
  sketch: P5jsSketch;
};
