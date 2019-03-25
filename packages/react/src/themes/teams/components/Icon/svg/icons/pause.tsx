import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <g className={cx(teamsIconClassNames.filled, classes.filledPart)}>
        <path d="M12.5,22V10h1v12H12.5z" />
        <path d="M18.5,22V10h1v12H18.5z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
