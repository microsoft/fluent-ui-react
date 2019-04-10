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
        <path fill="#fff" d="M28 29H8V3h15l5 5v21z" />
        <path d="M23 2H7v28h22V8zm0 1.5L27.5 8H23zM28 29H8V3h14v6h6z" fill="#a6a6a6" />
        <path
          fill="#c8c8c8"
          d="M16 11h10v1H16zM16 13h10v1H16zM16 15h10v1H16zM16 17h10v1H16zM16 19h10v1H16zM16 21h10v1H16zM16 23h10v1H16zM16 25h10v1H16zM10 5h6v1h-6z"
        />
        <path fill="#2c5898" d="M3 11l13-2v18L3 25V11z" />
        <path
          fill="#fff"
          d="M14.31 15l-1.8 7H10.8l-1.13-4.49a3.83 3.83 0 0 1-.11-.79 4.88 4.88 0 0 1-.12.79L8.26 22H6.48l-1.79-7h1.68l1 4.66a5.71 5.71 0 0 1 .09.8 4 4 0 0 1 .14-.82L8.82 15h1.65l1.12 4.7a5.9 5.9 0 0 1 .11.75 5.14 5.14 0 0 1 .1-.78l.96-4.67z"
        />
        <path d="M29 8l-6-6H7v28h22z" fill="url(#linear-gradient)" />
        <path fill="url(#linear-gradient-2)" d="M7 2v1h15v6h6v15.5h1V8l-6-6H7z" />
        <path fill="url(#linear-gradient-3)" d="M16 9L3 11v14l13 2V9z" />
        <path fill="url(#linear-gradient-4)" d="M16 29H7v-3.38L16 27v2z" />
        <path fill="url(#linear-gradient-5)" d="M22 9h6v2h-6z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
