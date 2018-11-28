import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <path d="M23.7 20.3L17.6 9.9c-.2-.3-.4-.5-.7-.7-.6-.3-1.3-.3-1.9 0-.3.2-.5.4-.7.7l-6 10.4c-.2.2-.3.6-.3.9 0 .5.2.9.5 1.3.4.3.9.5 1.4.5h12.3c.5 0 1-.2 1.3-.5.4-.4.5-.8.5-1.3 0-.3-.1-.7-.3-.9zm-.9 1.5c-.2.2-.4.3-.7.3H9.9c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.6 0-.2 0-.3.1-.4l6.1-10.4.3-.3c.1-.1.3-.1.5-.1s.3 0 .5.1c.1.1.3.2.3.3l6.1 10.4c.1.1.1.3.1.4.2.2.1.4-.1.6zM16 18.3c.3 0 .5-.2.5-.5v-4.7c0-.3-.2-.5-.5-.5s-.5.2-.5.5v4.7c0 .3.2.5.5.5z" />
      <circle cx="16" cy="20.4" r=".7" />
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
