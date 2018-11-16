import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <g className={classes.outlinePart}>
        <path d="M22.044 10.663l1.81-1.81a.5.5 0 1 0-.708-.707l-15 15a.5.5 0 1 0 .707.707l4.27-4.268 3.08 2.313A.471.471 0 0 0 16.5 22a.48.48 0 0 0 .352-.148A.481.481 0 0 0 17 21.5v-5.793l2.112-2.113a4.139 4.139 0 0 1-.445 5.352.5.5 0 1 0 .708.707A5.13 5.13 0 0 0 20.889 16a5.11 5.11 0 0 0-1.07-3.113l1.518-1.517A7.223 7.223 0 0 1 23 16a7.23 7.23 0 0 1-2.132 5.146.5.5 0 1 0 .707.707A8.223 8.223 0 0 0 24 16a8.214 8.214 0 0 0-1.956-5.337zM16 20.5l-2.164-1.629L16 16.707V20.5zM8.36 18.406c.203.397.48.594.835.594h1.774l1.026-1.026c-.03 0-.051-.005-.081-.005h-.258c-.265 0-.664.006-1.195.015-.531.011-.927.016-1.188.016A7.257 7.257 0 0 1 9 16c0-.698.09-1.364.273-2 .266 0 .665.005 1.196.016.53.01.93.015 1.195.015h.258c.073 0 .187-.005.344-.015.286-.02.468-.06.546-.118L16 11.5v2.47l1-1V10.5a.483.483 0 0 0-.148-.352.484.484 0 0 0-.649-.046L12.343 13H9.196c-.354 0-.633.198-.836.594-.161.318-.265.74-.312 1.265C8.016 15.214 8 15.594 8 16s.016.784.047 1.133c.047.531.15.956.312 1.273z" />
      </g>
      <g className={classes.filledPart}>
        <path d="M22.044 10.663l1.81-1.81a.5.5 0 1 0-.708-.707l-15 15a.5.5 0 1 0 .707.707l4.27-4.268 3.08 2.313A.471.471 0 0 0 16.5 22a.48.48 0 0 0 .352-.148A.481.481 0 0 0 17 21.5v-5.793l2.112-2.113a4.139 4.139 0 0 1-.445 5.352.5.5 0 1 0 .708.707A5.13 5.13 0 0 0 20.889 16a5.11 5.11 0 0 0-1.07-3.113l1.518-1.517A7.223 7.223 0 0 1 23 16a7.23 7.23 0 0 1-2.132 5.146.5.5 0 1 0 .707.707A8.223 8.223 0 0 0 24 16a8.214 8.214 0 0 0-1.956-5.337zM8.36 18.406c.203.397.48.594.835.594h1.774L17 12.97V10.5a.483.483 0 0 0-.148-.352.484.484 0 0 0-.649-.046L12.343 13H9.196c-.354 0-.633.198-.836.594-.161.318-.265.74-.312 1.265C8.016 15.214 8 15.594 8 16s.016.784.047 1.133c.047.531.15.956.312 1.273z" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
