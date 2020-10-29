import React from 'react';

export default function Arrow({ left }) {
  return (
    <svg width="32px" height="42px" viewBox="0 0 32 42">
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        {left ? (
          <g
            id="play-button"
            transform="translate(16.000000, 21.000000) rotate(-180.000000) translate(-16.000000, -21.000000) translate(0.000000, -0.000000)"
            fill="#080808"
            fillRule="nonzero"
          >
            <path
              d="M31.068,20.176 L2.068,0.176 C1.761,-0.035 1.363,-0.057 1.035,0.114 C0.706,0.287 0.5,0.627 0.5,0.999 L0.5,40.999 C0.5,41.371 0.706,41.712 1.035,41.885 C1.181,41.961 1.341,41.999 1.5,41.999 C1.699,41.999 1.897,41.939 2.068,41.822 L31.068,21.822 C31.339,21.635 31.5,21.328 31.5,20.999 C31.5,20.67 31.338,20.363 31.068,20.176 Z"
              id="Path"
            ></path>
          </g>
        ) : (
          <g id="play-button" fill="#080808" fillRule="nonzero">
            <path
              d="M31.068,20.176 L2.068,0.176 C1.761,-0.035 1.363,-0.057 1.035,0.114 C0.706,0.287 0.5,0.627 0.5,0.999 L0.5,40.999 C0.5,41.371 0.706,41.712 1.035,41.885 C1.181,41.961 1.341,41.999 1.5,41.999 C1.699,41.999 1.897,41.939 2.068,41.822 L31.068,21.822 C31.339,21.635 31.5,21.328 31.5,20.999 C31.5,20.67 31.338,20.363 31.068,20.176 Z"
              id="Path"
            ></path>
          </g>
        )}
      </g>
    </svg>
  );
}
