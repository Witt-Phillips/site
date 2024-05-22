"use client";

import React from "react";
import dynamic from "next/dynamic";
import { sketch as boidsSketch } from "../sketches/boids/sketch";
import {sketch as generalSketch} from "../sketches/mysketch";

// Dynamically import the P5jsContainer to avoid SSR issues
const P5jsContainer = dynamic(() => import("../components/P5jsContainer"), {
  ssr: false,
});

const Home: React.FC = () => {
  return (
  <div className="bg-mainGray">
    {/* landing page */}
    <div className="relative w-full h-screen bg-inherit">
      <P5jsContainer sketch={boidsSketch} />
      <div className="absolute bottom-10 ml-40 transform -translate-y-1/2 text-left text-porcelain">
        <h1 className="text-9xl font-bold">Hi there, <br /> I&apos;m Witt.</h1>
      </div>
    </div>

    {/* second page */}
    <div className="w-full h-[50vh] flex justify-center items-center bg-inherit">
      <div className="text-center text-porcelain">
        <h2 className="text-5xl font-bold">I'm a student, researcher, <br /> and lover of ridiculous socks.</h2>
      </div>
    </div>
  </div>
  );
};

export default Home;
