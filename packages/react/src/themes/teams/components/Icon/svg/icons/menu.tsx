import * as React from 'react'
import cx from 'classnames'
import { TeamsSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M14.3 21.3c-.1 0-.3 0-.4-.1l-4.8-4.8c-.2-.2-.2-.5 0-.7s.5-.2.7 0l4.4 4.4 7.9-7.9c.2-.2.5-.2.7 0s.2.5 0 .7l-8.3 8.3s-.1.1-.2.1z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M9 11h13c.6 0 1-.4 1-1s-.4-1-1-1H9c-.6 0-1 .4-1 1s.4 1 1 1zm13 8H9c-.6 0-1 .4-1 1s.4 1 1 1h13c.6 0 1-.4 1-1s-.4-1-1-1zm0-5H9c-.6 0-1 .4-1 1s.4 1 1 1h13c.6 0 1-.4 1-1s-.4-1-1-1z"
      />
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
