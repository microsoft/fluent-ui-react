import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <path d="M10.3 13l3-3h.7v12h-.7l-3-3H8v-6h2.3zm2.7 7.3v-8.6L10.7 14H9v4h1.7l2.3 2.3zm8.9-6.4L19.7 16l2.1 2.1-.7.7-2.1-2.1-2.1 2.1-.7-.7 2.1-2.1-2.1-2.1.7-.7 2.1 2.1 2.1-2.1.8.7z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
