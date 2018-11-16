import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M16 22c-3.3 0-6.3-2.1-7.8-5.5-.1-.3-.1-.7 0-1C9.7 12.1 12.7 10 16 10s6.3 2.1 7.8 5.5c.1.3.1.7 0 1-1.5 3.4-4.5 5.5-7.8 5.5zm0-11c-2.9 0-5.5 1.9-6.9 4.9v.2c1.3 3 4 4.9 6.9 4.9 2.9 0 5.5-1.9 6.9-4.9v-.2c-1.4-3-4-4.9-6.9-4.9z" />
      <path d="M16 19c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
