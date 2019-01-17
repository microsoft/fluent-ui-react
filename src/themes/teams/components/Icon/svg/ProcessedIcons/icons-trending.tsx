import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={classes.outlinePart}
          d="M23.733 9.666a.482.482 0 0 1 .167.369v3.975c0 .135-.05.251-.148.349a.48.48 0 0 1-.349.148c-.135 0-.251-.049-.349-.148s-.148-.215-.148-.349v-2.655l-6.087 6.956a.47.47 0 0 1-.372.171.456.456 0 0 1-.349-.148l-2.104-2.104-5.116 6.048a.486.486 0 0 1-.373.186.533.533 0 0 1-.326-.124.481.481 0 0 1-.179-.38c0-.119.039-.225.116-.318l5.466-6.46a.554.554 0 0 1 .178-.132.493.493 0 0 1 .209-.046.45.45 0 0 1 .342.148l2.111 2.104 5.746-6.568-2.679.334-.07.008c-.129 0-.243-.049-.341-.148a.489.489 0 0 1-.024-.675.513.513 0 0 1 .311-.17l3.975-.497a.482.482 0 0 1 .393.126z"
        />
        <path
          className={classes.filledPart}
          d="M22.96 9.541c.244 0 .461.083.652.249a.965.965 0 0 1 .342.745v3.975a.997.997 0 0 1-.994.994.954.954 0 0 1-.701-.291.955.955 0 0 1-.293-.703v-1.312l-4.719 5.442a.976.976 0 0 1-.338.252c-.133.06-.273.089-.424.089a.924.924 0 0 1-.373-.078 1.01 1.01 0 0 1-.318-.217l-1.715-1.708-4.27 5.124a.991.991 0 0 1-1.397.125c-.119-.093-.209-.207-.271-.342a.988.988 0 0 1 .14-1.055l4.969-5.963a.967.967 0 0 1 .753-.357 1.026 1.026 0 0 1 .714.287l1.731 1.731 4.061-4.689-1.404.179a.965.965 0 0 1-.617-.124.978.978 0 0 1-.494-.861c0-.249.084-.467.248-.656a.96.96 0 0 1 .621-.33l3.977-.497a.482.482 0 0 1 .12-.009z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
