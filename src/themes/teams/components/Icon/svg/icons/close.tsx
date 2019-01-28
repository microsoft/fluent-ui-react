import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={classes.outlinePart}
          d="M16.707,16l4.2427-4.2427c0.1953-0.1953,0.1953-0.5117,0-0.707s-0.5117-0.1953-0.707,0L16,15.293l-4.2427-4.2427 c-0.1953-0.1953-0.5117-0.1953-0.707,0s-0.1953,0.5117,0,0.707L15.293,16l-4.2427,4.2427c-0.1953,0.1953-0.1953,0.5117,0,0.707 c0.0977,0.0977,0.2256,0.1465,0.3535,0.1465s0.2559-0.0488,0.3535-0.1465L16,16.707l4.2427,4.2427 c0.0977,0.0977,0.2256,0.1465,0.3535,0.1465s0.2559-0.0488,0.3535-0.1465c0.1953-0.1953,0.1953-0.5117,0-0.707L16.707,16z"
        />
        <path
          className={classes.filledPart}
          d="M17.4141,16l3.8892-3.8892c0.3906-0.3906,0.3906-1.0234,0-1.4141c-0.3901-0.3906-1.0239-0.3906-1.4141,0L16,14.5859 l-3.8892-3.8892c-0.3901-0.3906-1.0239-0.3906-1.4141,0c-0.3906,0.3906-0.3906,1.0234,0,1.4141L14.5859,16l-3.8892,3.8892 c-0.3906,0.3906-0.3906,1.0234,0,1.4141c0.1951,0.1953,0.4512,0.293,0.707,0.293s0.512-0.0977,0.707-0.293L16,17.4141l3.8892,3.8892 c0.1951,0.1953,0.4512,0.293,0.707,0.293s0.512-0.0977,0.707-0.293c0.3906-0.3906,0.3906-1.0234,0-1.4141L17.4141,16z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
