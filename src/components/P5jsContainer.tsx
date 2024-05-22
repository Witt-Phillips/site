"use client";

import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { P5jsContainerProps } from "../types/global";

const P5jsContainer: React.FC<P5jsContainerProps> = ({ sketch }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && parentRef.current) {
      const p5Instance = new p5(sketch, parentRef.current!);

      return () => {
        p5Instance.remove();
      };
    }
  }, [sketch]);

  return <div ref={parentRef} id="p5-container" className="w-full h-full"></div>;
};

export default P5jsContainer;
