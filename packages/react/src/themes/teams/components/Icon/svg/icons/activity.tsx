import * as React from "react";
import * as cx from "classnames";
import { TeamsSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={cx(teamsIconClassNames.outline, classes.outlinePart)}
        d="M16.5,22C16.5,22,16.5,22,16.5,22c-0.2,0-0.4-0.2-0.5-0.4l-2.1-9.4l-1.4,3.5C12.4,15.9,12.2,16,12,16H9
           c-0.3,0-0.5-0.2-0.5-0.5S8.7,15,9,15h2.7l1.9-4.7c0.1-0.2,0.3-0.3,0.5-0.3c0.2,0,0.4,0.2,0.4,0.4l2.1,9.1l2-6.7
           c0.1-0.2,0.2-0.3,0.4-0.4c0.2,0,0.4,0.1,0.5,0.2l1.4,2.3H23c0.3,0,0.5,0.2,0.5,0.5S23.3,16,23,16h-2.5c-0.2,0-0.3-0.1-0.4-0.2
           l-0.9-1.5L17,21.6C16.9,21.9,16.7,22,16.5,22z"
      ></path>
      <path
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        d="M16.5,22.5C16.5,22.5,16.5,22.5,16.5,22.5c-0.5,0-0.9-0.3-1-0.8l-1.8-7.9l-0.8,2c-0.2,0.4-0.5,0.6-0.9,0.6H9
           c-0.6,0-1-0.4-1-1s0.4-1,1-1h2.3l1.7-4.4c0.2-0.4,0.6-0.7,1-0.6c0.4,0,0.8,0.3,0.9,0.8l1.6,7.3l1.4-4.8c0.1-0.4,0.4-0.7,0.8-0.7
           c0.4-0.1,0.8,0.1,1,0.5l1.2,2H23c0.6,0,1,0.4,1,1s-0.4,1-1,1h-2.5c-0.4,0-0.7-0.2-0.9-0.5l-0.3-0.5l-1.9,6.3
           C17.3,22.2,16.9,22.5,16.5,22.5z"
      ></path>
    </svg>
  ),
  styles: {},
  isSvg: true
} as TeamsSvgIconSpec