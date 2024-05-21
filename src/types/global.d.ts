// src/types/global.d.ts
import p5Types from "p5";

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;
type P5jsContainer = ({ sketch }: { sketch: P5jsSketch }) => React.JSX.Element;
