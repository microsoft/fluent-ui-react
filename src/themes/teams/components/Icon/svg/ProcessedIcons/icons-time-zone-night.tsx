import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={classes.filledPart}
          d="M15.914 8.344c.231.136.415.318.55.547.137.23.204.48.204.75 0 .026-.003.064-.008.113-.005.05-.01.093-.016.129a10.004 10.004 0 0 0-.156 1.797c0 1.187.2 2.342.598 3.46.398 1.12.972 2.145 1.719 3.075s1.634 1.707 2.66 2.332c.224.13.396.304.516.52.12.216.18.454.18.714 0 .313-.086.597-.255.852a1.543 1.543 0 0 1-.675.57 8.125 8.125 0 0 1-3.25.656 7.8 7.8 0 0 1-3.891-1.043 8.506 8.506 0 0 1-2.96-2.781 7.766 7.766 0 0 1-1.29-4.355c0-1.047.19-2.051.57-3.012s.923-1.818 1.63-2.574a8.186 8.186 0 0 1 2.487-1.813c.105-.051.205-.087.301-.105a2.5 2.5 0 0 1 .324-.035c.277 0 .53.068.762.203z"
        />
        <path
          className={classes.outlinePart}
          d="M15.914 8.344c.231.136.415.318.55.547.137.23.204.48.204.75 0 .026-.003.064-.008.113-.005.05-.01.093-.016.129a10.004 10.004 0 0 0-.156 1.797c0 1.187.2 2.341.598 3.46.398 1.12.972 2.145 1.719 3.075s1.634 1.707 2.66 2.332c.224.13.396.304.516.52s.18.453.18.714a1.55 1.55 0 0 1-.93 1.422 8.125 8.125 0 0 1-3.25.656 7.8 7.8 0 0 1-3.891-1.043 8.517 8.517 0 0 1-2.96-2.781 7.766 7.766 0 0 1-1.29-4.355c0-1.047.19-2.051.57-3.012s.923-1.819 1.63-2.574a8.186 8.186 0 0 1 2.487-1.813c.105-.051.205-.087.301-.105.097-.018.204-.03.324-.035.277 0 .53.068.762.203zm-.957.836a7.246 7.246 0 0 0-2.195 1.593 7.045 7.045 0 0 0-1.426 2.25 7.128 7.128 0 0 0-.496 2.641 6.827 6.827 0 0 0 1.137 3.84c.668 1.024 1.535 1.837 2.597 2.441s2.198.91 3.406.914a6.866 6.866 0 0 0 2.852-.578c.11-.042.194-.105.254-.191a.486.486 0 0 0-.137-.692 11.19 11.19 0 0 1-2.922-2.55c-.823-1.018-1.453-2.141-1.89-3.367a11.196 11.196 0 0 1-.477-5.762.573.573 0 0 0-.136-.418.462.462 0 0 0-.356-.16.583.583 0 0 0-.211.039z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
