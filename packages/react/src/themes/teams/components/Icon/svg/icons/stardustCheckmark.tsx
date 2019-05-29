import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 20 20" className={classes.svg}>
      <g>
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
