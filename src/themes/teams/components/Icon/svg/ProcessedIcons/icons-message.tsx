import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M21.5 9h-11C9.7 9 9 9.7 9 10.5V19c0 .7.5 1.4 1.2 1.5 1.8.4 3.8.7 5.8.7 1.1 0 2.2-.1 2.8-.1h.1l2.3 2.5c.2.2.5.4.8.4.1 0 .2 0 .4-.1.4-.1.7-.5.7-1V10.5C23 9.7 22.3 9 21.5 9zM17 17h-4v-1h4v1zm2-3h-6v-1h6v1z" />
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
