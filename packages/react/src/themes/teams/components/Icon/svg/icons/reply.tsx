import * as React from 'react'
import cx from 'classnames'
import { TeamsSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M22.844 11.648c.098.1.148.217.148.352a4.85 4.85 0 0 1-.687 2.508c-.22.37-.483.708-.79 1.015-.307.308-.646.57-1.015.79a4.842 4.842 0 0 1-2.508.687h-7.297l3.149 3.148c.098.1.148.217.148.352 0 .136-.05.253-.148.352-.1.1-.217.148-.352.148a.477.477 0 0 1-.351-.148l-4-4a.48.48 0 0 1-.149-.352c0-.135.05-.252.149-.352l4-4a.48.48 0 0 1 .351-.148c.135 0 .253.05.352.148.098.1.148.217.148.352 0 .136-.05.253-.148.352L10.704 16h7.288c.713 0 1.383-.185 2.008-.555a3.946 3.946 0 0 0 1.445-1.437c.365-.63.547-1.3.547-2.008 0-.135.049-.252.149-.352a.48.48 0 0 1 .351-.148c.135 0 .252.05.352.148z"
      />
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M22.867 11.078a1.007 1.007 0 0 1 .625.922c0 .49-.065.968-.195 1.434a5.603 5.603 0 0 1-2.54 3.308 5.417 5.417 0 0 1-2.765.758h-6.086l2.29 2.29a.972.972 0 0 1 .296.71c0 .266-.099.498-.297.695-.093.094-.203.168-.328.223s-.25.082-.375.082c-.135 0-.265-.024-.39-.074a.87.87 0 0 1-.32-.215l-3.993-4a.967.967 0 0 1-.297-.711.97.97 0 0 1 .297-.71l3.992-4a.881.881 0 0 1 .32-.216c.126-.049.256-.074.391-.074a1.007 1.007 0 0 1 1 1 .97.97 0 0 1-.297.71l-2.289 2.29h6.086c.469 0 .916-.09 1.344-.273a3.54 3.54 0 0 0 1.883-1.883A3.4 3.4 0 0 0 21.492 12c0-.125.027-.25.082-.375s.129-.234.223-.328a.952.952 0 0 1 1.07-.219z"
      />
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
