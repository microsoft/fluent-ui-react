import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg
      role="presentation"
      focusable="false"
      viewBox="8 8 16 16"
      className={classes.svgFlippingInRtl}
    >
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M20.9,15.7l-7-7c-0.2-0.2-0.5-0.2-0.7,0c0,0,0,0,0,0c-0.2,0.2-0.2,0.5,0,0.7c0,0,0,0,0,0l6.6,6.6l-6.6,6.6c-0.2,0.2-0.2,0.5,0,0.7c0,0,0,0,0,0c0.2,0.2,0.5,0.2,0.7,0c0,0,0,0,0,0l7-7C21,16.3,21,16.2,21,16C21,15.9,21,15.8,20.9,15.7z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M21.2,15.3l-7-7C14,8.1,13.8,8,13.5,8c-0.1,0-0.3,0-0.4,0.1c-0.1,0.1-0.2,0.1-0.3,0.2s-0.2,0.2-0.2,0.3c-0.1,0.1-0.1,0.2-0.1,0.4c0,0.1,0,0.3,0.1,0.4c0,0.1,0.1,0.2,0.2,0.3l6.3,6.3l-6.3,6.3c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3s0.2,0.2,0.3,0.2c0.1,0,0.2,0.1,0.4,0.1c0.3,0,0.5-0.1,0.7-0.3l7-7c0.2-0.2,0.3-0.4,0.3-0.7C21.5,15.7,21.4,15.5,21.2,15.3z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
