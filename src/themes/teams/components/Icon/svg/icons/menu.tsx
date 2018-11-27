import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg className={classes.svg} viewBox="0 0 32 32" role="presentation">
      <g className={classes.filledPart}>
        <path d="M9,11h13c0.6,0,1-0.4,1-1s-0.4-1-1-1H9c-0.6,0-1,0.4-1,1S8.4,11,9,11zM22,19H9c-0.6,0-1,0.4-1,1s0.4,1,1,1h13c0.6,0,1-0.4,1-1S22.6,19,22,19zM22,14H9c-0.6,0-1,0.4-1,1s0.4,1,1,1h13c0.6,0,1-0.4,1-1S22.6,14,22,14z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
