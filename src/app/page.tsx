// src/app/page.tsx
'use client';

import React from 'react';
import { P5jsContainer } from '../components/P5jsContainer';
import { sketch } from '../sketches/boids/sketch';

const Home: React.FC = () => {
  return (
    <div className="relative w-full h-screen">
      <P5jsContainer sketch={sketch} />
      <div className="absolute top-1/2 left-0 px-20 transform -translate-y-1/2 text-left text-white">
        <h1 className="text-9xl font-bold">Hi there, <br /> I'm Witt.</h1>
      </div>
    </div>
  );
};

export default Home;
