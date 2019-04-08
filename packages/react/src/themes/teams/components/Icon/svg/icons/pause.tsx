import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M12.5 22V10h1v12h-1zM18.5 22V10h1v12h-1z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
