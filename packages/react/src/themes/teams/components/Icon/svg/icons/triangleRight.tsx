import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes, rtl }) => (
    <svg
      role="presentation"
      focusable="false"
      viewBox="8 8 16 16"
      className={rtl ? classes.flipInRtl : classes.svg}
    >
      <path d="M19 16l-4-3.5v7z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
