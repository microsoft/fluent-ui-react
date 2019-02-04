import * as React from 'react'
import cx from 'classnames'
import { TeamsSvgIconSpec } from '../types'
import { teamsIconSlotClassNames } from '../teamsIconSlotClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconSlotClassNames.outline, classes.outlinePart)}
        d="M16 19c1.7 0 3-1.3 3-3v-5c0-1.7-1.3-3-3-3s-3 1.3-3 3v5c0 1.7 1.3 3 3 3zm-2-8c0-1.1.9-2 2-2s2 .9 2 2v5c0 1.1-.9 2-2 2s-2-.9-2-2v-5zm8 5c0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 2.8-2.2 5-5 5s-5-2.2-5-5c0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 3.1 2.4 5.7 5.5 6v1.5c0 .3.2.5.5.5s.5-.2.5-.5V22c3.1-.3 5.5-2.9 5.5-6z"
      />
      <path
        className={cx(teamsIconSlotClassNames.filled, classes.filledPart)}
        d="M21.844 15.648c.098.1.148.217.148.352 0 1-.247 1.953-.742 2.86A6.133 6.133 0 0 1 19.281 21a5.84 5.84 0 0 1-2.789.977V23.5c0 .136-.05.253-.148.352-.099.1-.216.148-.352.148s-.253-.049-.351-.148a.48.48 0 0 1-.149-.352v-1.523A5.824 5.824 0 0 1 12.703 21a5.95 5.95 0 0 1-1.969-2.14A5.88 5.88 0 0 1 9.992 16a.48.48 0 0 1 .149-.352.48.48 0 0 1 .351-.148c.135 0 .253.05.352.148.098.1.148.217.148.352 0 .896.23 1.732.688 2.508a4.915 4.915 0 0 0 1.804 1.805c.776.459 1.613.687 2.508.687s1.732-.229 2.508-.688a5.1 5.1 0 0 0 1.016-.789c.307-.306.57-.645.789-1.015A4.848 4.848 0 0 0 20.992 16c0-.135.05-.252.149-.352.098-.098.215-.148.351-.148s.253.05.352.148zm-4.7-7.414a3.031 3.031 0 0 1 1.614 1.614c.156.367.234.751.234 1.152v5c0 .401-.077.783-.23 1.145a3.081 3.081 0 0 1-1.621 1.621c-.365.156-.747.234-1.149.234s-.782-.078-1.144-.234-.684-.375-.965-.657-.5-.602-.656-.964A2.857 2.857 0 0 1 12.992 16v-5c0-.4.078-.784.235-1.148a3.07 3.07 0 0 1 1.62-1.621c.363-.154.744-.231 1.145-.231s.785.078 1.152.234z"
      />
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
