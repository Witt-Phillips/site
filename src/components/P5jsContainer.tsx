"use client";

import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { sketch } from "../sketches/mysketch";

const P5jsContainer: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && parentRef.current) {
      const p5Instance = new p5(sketch, parentRef.current);
      
      return () => {
        p5Instance.remove();
      };
    }
  }, []);

  return <div ref={parentRef} className="w-full h-full"></div>;
};

export default P5jsContainer;
