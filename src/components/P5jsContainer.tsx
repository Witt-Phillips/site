// src/components/P5jsContainer.tsx
import React, { useEffect, useRef, useState } from "react";
import { P5jsContainerRef, P5jsSketch } from "../types/global";
import p5 from "p5";

export const P5jsContainer: React.FC<{ sketch: P5jsSketch }> = ({ sketch }) => {
  const parentRef = useRef<P5jsContainerRef>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let p5instance: p5;

    const initP5 = async () => {
      try {
        const P5 = (await import("p5")).default;
        p5instance = new P5((p) => {
          sketch(p, parentRef.current!);
        });
      } catch (error) {
        console.error(error);
      }
    };

    initP5();

    return () => {
      if (p5instance) p5instance.remove();
    };
  }, [isMounted, sketch]);

  return (
    <div ref={parentRef} className="w-full h-full"></div>
  );
};

export default P5jsContainer;
