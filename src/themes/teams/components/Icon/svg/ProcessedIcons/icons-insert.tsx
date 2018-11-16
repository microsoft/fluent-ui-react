import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M11.5 16c-.1 0-.3 0-.4-.1l-2-2c-.2-.2-.2-.5 0-.7s.5-.2.7 0l1.6 1.6L17 9.2c.2-.2.5-.2.7 0s.2.5 0 .7l-6 6c.1.1-.1.1-.2.1zM20.2 19.5l2.6-2.6c.2-.2.2-.5 0-.7s-.5-.2-.7 0l-2.6 2.6-2.6-2.6c-.2-.2-.5-.2-.7 0s-.2.5 0 .7l2.6 2.6-2.6 2.6c-.2.2-.2.5 0 .7.1.1.2.1.4.1s.3 0 .4-.1l2.6-2.6 2.6 2.6c.1.1.2.1.4.1s.3 0 .4-.1c.2-.2.2-.5 0-.7l-2.8-2.6z" />
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
