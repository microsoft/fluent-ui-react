import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="5.08"
          y1="3.61"
          x2="27.96"
          y2="30.87"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.86" stopColor="#5e5e5e" stopOpacity="0.06" />
          <stop offset="1" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="22.15"
          y1="9.1"
          x2="26.11"
          y2="5.14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.01" />
          <stop offset="0.64" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="0.78" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.89" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="0.99" stopColor="#fff" stopOpacity="0.24" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-3"
          x1="9.5"
          y1="26.44"
          x2="9.5"
          y2="9.53"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.53" stopColor="#fff" stopOpacity="0.01" />
          <stop offset="0.72" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="0.85" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.96" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-4"
          x1="11.28"
          y1="29.35"
          x2="11.62"
          y2="26.21"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#828282" stopOpacity="0" />
          <stop offset="0.86" stopColor="#303030" stopOpacity="0.13" />
          <stop offset="1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-5"
          x1="25"
          y1="10.94"
          x2="25"
          y2="9.06"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#828282" stopOpacity="0" />
          <stop offset="0.86" stopColor="#303030" stopOpacity="0.06" />
          <stop offset="1" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <g>
        <polygon fill="#fff" points="28 29 8 29 8 3 23 3 28 8 28 29" />
        <path fill="#f5ba9d" d="M19,7a5,5,0,0,1,5,5H19Z" />
        <path fill="#a6a6a6" d="M23,2H7V30H29V8Zm0,1.5L27.5,8H23ZM28,29H8V3H22V9h6Z" />
        <path fill="#c8c8c8" d="M24,13a6,6,0,1,1-6-6v6Z" />
        <rect fill="#c8c8c8" x="16" y="23" width="10" height="1" />
        <rect fill="#c8c8c8" x="16" y="21" width="10" height="1" />
        <rect fill="#c8c8c8" x="16" y="25" width="10" height="1" />
        <polygon fill="#f04e23" points="3 11 16 9 16 27 3 25 3 11" />
        <path
          fill="#fff"
          d="M8.85,19.24V22H7V14H9.9Q13,14,13,16.55a2.42,2.42,0,0,1-.89,1.95,3.59,3.59,0,0,1-2.38.74Zm0-3.86v2.49h.73q1.48,0,1.48-1.26T9.58,15.38Z"
        />
        <path fill="url(#linear-gradient)" d="M29,8,23,2H7V30H29Z" />
        <polygon
          fill="url(#linear-gradient-2)"
          points="7 2 7 3 22 3 22 9 28 9 28 24.5 29 24.5 29 8 23 2 7 2"
        />
        <polygon fill="url(#linear-gradient-3)" points="16 9 3 11 3 25 16 27 16 9" />
        <polygon fill="url(#linear-gradient-4)" points="16 29 7 29 7 25.62 16 27 16 29" />
        <rect fill="url(#linear-gradient-5)" x="22" y="9" width="6" height="2" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
