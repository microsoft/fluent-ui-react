import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <path
        className={classes.outlinePart}
        d="M22.5 22h-13c-.827 0-1.5-.673-1.5-1.5v-9c0-.827.673-1.5 1.5-1.5h13c.827 0 1.5.673 1.5 1.5v9c0 .827-.673 1.5-1.5 1.5zm-13-11c-.275 0-.5.225-.5.5v9c0 .275.225.5.5.5h13c.275 0 .5-.225.5-.5v-9c0-.275-.225-.5-.5-.5h-13zm5.885 7.01l-.854-.52c-.003.004-.33.51-1.031.51-.745 0-1.5-.686-1.5-2s.755-2 1.5-2c.679 0 .972.478.983.499l.434-.249-.436.243.872-.486A2.143 2.143 0 0 0 13.5 13c-1.212 0-2.5 1.052-2.5 3s1.288 3 2.5 3a2.26 2.26 0 0 0 1.885-.99zm6 0l-.854-.52c-.003.004-.33.51-1.031.51-.745 0-1.5-.686-1.5-2s.755-2 1.5-2c.679 0 .972.478.983.499l.434-.249-.437.243.873-.486A2.143 2.143 0 0 0 19.5 13c-1.212 0-2.5 1.052-2.5 3s1.288 3 2.5 3a2.26 2.26 0 0 0 1.885-.99z"
      />
      <path
        className={classes.filledPart}
        d="M22.5 22h-13c-.827 0-1.5-.673-1.5-1.5v-9c0-.827.673-1.5 1.5-1.5h13c.827 0 1.5.673 1.5 1.5v9c0 .827-.673 1.5-1.5 1.5zm-7.115-3.99l-.854-.52c-.003.004-.33.51-1.031.51-.745 0-1.5-.686-1.5-2s.755-2 1.5-2c.679 0 .972.478.983.499l.434-.249-.436.243.872-.486A2.143 2.143 0 0 0 13.5 13c-1.212 0-2.5 1.052-2.5 3s1.288 3 2.5 3a2.26 2.26 0 0 0 1.885-.99zm6 0l-.854-.52c-.003.004-.33.51-1.031.51-.745 0-1.5-.686-1.5-2s.755-2 1.5-2c.679 0 .972.478.983.499l.434-.249-.437.243.873-.486A2.143 2.143 0 0 0 19.5 13c-1.212 0-2.5 1.052-2.5 3s1.288 3 2.5 3a2.26 2.26 0 0 0 1.885-.99z"
      />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
