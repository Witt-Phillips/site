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
    <div className="relative w-full h-screen bg-mainGray">
      <P5jsContainer sketch={boidsSketch} />
      {/* <P5jsContainer sketch={generalSketch} /> */}
      <div className="absolute bottom-10 ml-40 transform -translate-y-1/2 text-left text-white">
        <h1 className="text-9xl font-bold">Hi there, <br /> I&apos;m Witt.</h1>
      </div>
    </div>
  );
};

export default Home;
