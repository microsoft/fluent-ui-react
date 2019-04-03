import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <defs>
        <linearGradient
          id="onenote-1"
          x1="6.0695"
          x2="28.1195"
          y1="29.2192"
          y2="2.9393"
          gradientTransform="matrix(1 0 0 -1 0 32)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".86" stopColor="#5e5e5e" stopOpacity=".06" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>
        <linearGradient
          id="onenote-2"
          x1="9.5"
          x2="9.5"
          y1="5.56"
          y2="22.47"
          gradientTransform="matrix(1 0 0 -1 0 32)"
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
          id="onenote-3"
          x1="11.2791"
          x2="11.6191"
          y1="2.6501"
          y2="5.7901"
          gradientTransform="matrix(1 0 0 -1 0 32)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#828282" stopOpacity="0" />
          <stop offset=".86" stopColor="#303030" stopOpacity=".13" />
          <stop offset="1" stopOpacity=".2" />
        </linearGradient>
        <linearGradient
          id="onenote-4"
          x1="22.52"
          x2="30.44"
          y1="21.52"
          y2="29.44"
          gradientTransform="matrix(1 0 0 -1 0 32)"
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
      </defs>
      <g>
        <path fill="#fff" d="M7.5 2.5h19v2h2v5h-2v20h-19z" />
        <path fill="#a6a6a6" d="M26 3v2h2v4h-2v20H8V3h18m1-1H7v28h20V10h2V4h-2V2z" />
        <path fill="#7719aa" d="M3 11l13-2v18L3 25z" />
        <path
          fill="#fff"
          d="M13 22h-1.77L8 17c-.1415-.213-.2716-.4333-.39-.66V22H6v-8h1.89L11 18.87c.14.22.27.4367.39.65-.023-.3663-.023-.7337 0-1.1V14H13v8z"
        />
        <path
          fill="#c8c8c8"
          d="M16 11h8v1h-8zM16 13h8v1h-8zM16 15h8v1h-8zM16 17h8v1h-8zM16 19h8v1h-8zM16 21h8v1h-8zM16 23h8v1h-8zM16 25h8v1h-8zM10 5h6v1h-6z"
        />
        <path fill="url(#onenote-1)" d="M27 2H7v28h20V10h2V4h-2V2z" />
        <path fill="url(#onenote-2)" d="M16 9L3 11v14l13 2z" />
        <path fill="url(#onenote-3)" d="M16 29H7v-3.38L16 27z" />
        <path fill="url(#onenote-4)" d="M26 3v2h2v4h-2v20H8V3h18m1-1H7v28h20V10h2V4h-2V2z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
