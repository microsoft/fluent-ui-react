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
          <stop offset=".86" stopColor="#5e5e5e" stopOpacity=".06" />
          <stop offset="1" stopOpacity=".1" />
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
          <stop offset=".45" stopColor="#fff" stopOpacity=".01" />
          <stop offset=".64" stopColor="#fff" stopOpacity=".04" />
          <stop offset=".78" stopColor="#fff" stopOpacity=".08" />
          <stop offset=".89" stopColor="#fff" stopOpacity=".15" />
          <stop offset=".99" stopColor="#fff" stopOpacity=".24" />
          <stop offset="1" stopColor="#fff" stopOpacity=".25" />
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
          <stop offset=".53" stopColor="#fff" stopOpacity=".01" />
          <stop offset=".72" stopColor="#fff" stopOpacity=".03" />
          <stop offset=".85" stopColor="#fff" stopOpacity=".08" />
          <stop offset=".96" stopColor="#fff" stopOpacity=".15" />
          <stop offset="1" stopColor="#fff" stopOpacity=".18" />
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
          <stop offset=".86" stopColor="#303030" stopOpacity=".13" />
          <stop offset="1" stopOpacity=".2" />
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
          <stop offset=".86" stopColor="#303030" stopOpacity=".06" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>
      </defs>
      <g>
        <path fill="#fff" d="M28 29H8V3h15l5 5v21z" />
        <path fill="#a6a6a6" d="M23 2H7v28h22V8zm0 1.5L27.5 8H23zM28 29H8V3h14v6h6z" />
        <path
          fill="#c8c8c8"
          d="M22 23h4v1h-4zM22 25h4v1h-4zM22 19h4v1h-4zM22 21h4v1h-4zM22 15h4v1h-4zM22 17h4v1h-4zM22 11h4v1h-4zM22 13h4v1h-4zM17 23h4v1h-4zM17 25h4v1h-4zM17 19h4v1h-4zM17 21h4v1h-4zM17 15h4v1h-4zM17 17h4v1h-4zM17 11h4v1h-4zM17 13h4v1h-4z"
        />
        <path fill="#008641" d="M3 11l13-2v18L3 25V11z" />
        <path
          fill="#fff"
          d="M13 22h-2l-1.3-2.61a2.39 2.39 0 0 1-.15-.54 4.23 4.23 0 0 1-.17.56L8 22H6l2.41-4-2.2-4h2.07l1.08 2.4a4.31 4.31 0 0 1 .23.68q.06-.23.24-.7L11 14h1.9l-2.26 4z"
        />
        <path fill="url(#linear-gradient)" d="M29 8l-6-6H7v28h22z" />
        <path fill="url(#linear-gradient-2)" d="M7 2v1h15v6h6v15.5h1V8l-6-6H7z" />
        <path fill="url(#linear-gradient-3)" d="M16 9L3 11v14l13 2V9z" />
        <path fill="url(#linear-gradient-4)" d="M16 29H7v-3.38L16 27v2z" />
        <path fill="url(#linear-gradient-5)" d="M22 9h6v2h-6z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
