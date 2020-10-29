import Head from 'next/head';

import ReactDOM from 'react-dom';
import * as THREE from 'three';
import React, { useState, useRef, useEffect } from 'react';
import { extend, Canvas, useFrame } from 'react-three-fiber';
import * as meshline from 'three.meshline';

import Logo from '../components/icons/Logo';
import Github from '../components/icons/Github';
import Random from '../components/icons/Random';

extend(meshline);

const numLines = 100;
const lines = new Array(numLines).fill();

function Fatline({ randomColors }) {
  const material = useRef();
  const [color, setColor] = useState(
    () => randomColors[parseInt(randomColors.length * Math.random())],
  );
  const [ratio] = useState(() => 0.5 + 0.5 * Math.random());
  const [width] = useState(() => Math.max(0.1, 0.3 * Math.random()));
  // Calculate wiggly curve
  const [curve] = useState(() => {
    let pos = new THREE.Vector3(
      30 - 60 * Math.random(),
      -5,
      10 - 20 * Math.random(),
    );
    return new Array(30)
      .fill()
      .map(() =>
        pos
          .add(
            new THREE.Vector3(
              2 - Math.random() * 4,
              4 - Math.random() * 2,
              5 - Math.random() * 10,
            ),
          )
          .clone(),
      );
  });
  // Hook into the render loop and decrease the materials dash-offset
  useFrame(() => (material.current.uniforms.dashOffset.value -= 0.0005));

  useEffect(() => {
    setColor(() => randomColors[parseInt(randomColors.length * Math.random())]);
  }, [randomColors]);

  return (
    <mesh>
      {/** MeshLine and CMRCurve are a OOP factories, not scene objects, hence all the imperative code in here :-( */}
      <meshLine onUpdate={(self) => (self.parent.geometry = self.geometry)}>
        <geometry onUpdate={(self) => self.parent.setGeometry(self)}>
          <catmullRomCurve3
            args={[curve]}
            onUpdate={(self) => (self.parent.vertices = self.getPoints(500))}
          />
        </geometry>
      </meshLine>
      {/** MeshLineMaterial on the other hand is a regular material, so we can just attach it */}
      <meshLineMaterial
        attach="material"
        ref={material}
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={ratio}
      />
    </mesh>
  );
}

function Scene({ randomColors }) {
  let group = useRef();
  let theta = 0;
  // Hook into the render loop and rotate the scene a bit
  useFrame(() =>
    group.current.rotation.set(
      0,
      5 * Math.sin(THREE.Math.degToRad((theta += 0.02))),
      0,
    ),
  );
  return (
    <group ref={group}>
      {lines.map((_, index) => (
        <Fatline key={index} randomColors={randomColors} />
      ))}
    </group>
  );
}

export default function Home() {
  const initialColors = ['#3f736b', '#479693', '#3eb5be', '#9ad8ff', '#f6f6ff'];
  const randomColor = (0x1000000 + Math.random() * 0xffffff)
    .toString(16)
    .substr(1, 6);
  const [background, setBackground] = useState('#' + randomColor);
  const [randomColors, setRandomColors] = useState(initialColors);

  const getRandomColors = async () => {
    // Proxy server that adds CORS header to the request
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `http://palett.es/API/v1/palette/from/${randomColor}`;
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    setBackground('#' + randomColor);
    setRandomColors(data);
  };

  return (
    <div className="main">
      <Head>
        <title>Random vibes.</title>
        <link
          href="https://fonts.googleapis.com/css?family=Playfair+Display:700"
          rel="stylesheet"
        />
      </Head>
      <Canvas
        style={{ background }}
        camera={{ position: [0, 50, 10], fov: 75 }}
      >
        <Scene randomColors={randomColors} />
      </Canvas>
      <a href="/" className="logo top-left">
        <Logo />
      </a>
      <a
        href="https://github.com/jurrianlammerts/next-three"
        className="logo top-right"
      >
        <Github />
      </a>
      <a onClick={() => getRandomColors()} className="logo bottom-left">
        <Random />
      </a>
      <span className="header">random vibes.</span>
    </div>
  );
}
