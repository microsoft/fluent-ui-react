import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg viewBox="0 0 32 32" role="presentation" className={classes.svg}>
      <g className={classes.outlinePart}>
        <path
          d="M12,23.3c-0.1,0-0.3,0-0.4-0.1c-0.4-0.2-0.6-0.5-0.6-0.9V9.9c0-0.7,0.5-1.3,1.2-1.5c2.4-0.6,5.2-0.6,7.7,0
            C20.5,8.6,21,9.2,21,9.9v12.4c0,0.4-0.2,0.8-0.6,0.9c-0.4,0.2-0.8,0.1-1.1-0.2L16,19.7L12.7,23C12.5,23.2,12.3,23.3,12,23.3z
            M16,18.7c0.3,0,0.5,0.1,0.7,0.3l3.3,3.3V9.9c0-0.2-0.2-0.4-0.4-0.5c-2.3-0.5-4.9-0.5-7.2,0C12.2,9.4,12,9.6,12,9.9v12.4l3.3-3.3
            C15.5,18.8,15.7,18.7,16,18.7z"
        />
      </g>
    </svg>
  ),
  styles: {
    svg: ({ variables }) => {
      return {
        fill: variables.color,
      }
    },
  },
} as TeamsSvgIconSpec
