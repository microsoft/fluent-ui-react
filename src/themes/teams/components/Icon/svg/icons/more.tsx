import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg viewBox="0 0 32 32" role="presentation" focusable="false">
      <g className={classes.filledPart}>
        <circle cx="22" cy="16" r="2" />
        <circle cx="16" cy="16" r="2" />
        <circle cx="10" cy="16" r="2" />
      </g>
      <g className={classes.outlinePart}>
        <circle cx="22" cy="16" r="1.5" />
        <circle cx="16" cy="16" r="1.5" />
        <circle cx="10" cy="16" r="1.5" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
