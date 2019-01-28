import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path
        className={classes.outlinePart}
        d="M23.684 19.246a1.492 1.492 0 0 0-.998-.567l-2.503-.325a.503.503 0 0 1-.369-.246l-1.828-3.158h.434l.575.575c.283.283.654.424 1.026.424s.742-.14 1.025-.424a1.453 1.453 0 0 0 0-2.05l-1.004-1.003a1.444 1.444 0 0 0-1.025-.424l-2.937.002a1.98 1.98 0 0 0-.462-.235A2.48 2.48 0 0 0 16 10.5a2.5 2.5 0 1 0-5 0c0 .984.574 1.827 1.4 2.235l-.97.49-.87-.868c-.584-.585-1.536-.585-2.12 0s-.586 1.537 0 2.122l1.701 1.701a1.502 1.502 0 0 0 1.716.288l1.378-.67.223.385-2.11 2.254a1.504 1.504 0 0 0-.24 1.708l1.552 3.037a1.502 1.502 0 0 0 2.019.653c.356-.182.62-.492.744-.874.123-.38.09-.787-.094-1.147l-.961-1.846 1.524-1.023 1.998 1.806c.24.26.565.426.915.469l3.51.436a1.506 1.506 0 0 0 1.673-1.303 1.488 1.488 0 0 0-.304-1.107zm-4.667-6.298c.147 0 .285.057.39.161l1.002 1.002a.55.55 0 0 1-.777.778l-.839-.84h-1.328l-.637-1.1h2.19zM13.5 9c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5-1.5-.673-1.5-1.5.673-1.5 1.5-1.5zm8.938 11.664l-3.51-.436a.548.548 0 0 1-.336-.187l-2.32-2.1a.5.5 0 0 0-.613-.044l-2.22 1.49a.5.5 0 0 0-.165.647l1.166 2.238a.496.496 0 0 1-.217.673.5.5 0 0 1-.673-.218l-1.552-3.038a.502.502 0 0 1 .08-.569l2.364-2.524a.5.5 0 0 0 .068-.593l-.643-1.109a.5.5 0 0 0-.651-.2l-1.796.874a.498.498 0 0 1-.572-.095L9.146 13.77a.5.5 0 0 1 .708-.706l1.126 1.123a.5.5 0 0 0 .579.092l2.884-1.457a.99.99 0 0 1 .762-.1c.258.07.474.236.608.469l3.136 5.417c.232.401.645.676 1.105.736l2.505.326h.003a.497.497 0 0 1 .434.558.504.504 0 0 1-.558.435z"
      />
      <path
        className={classes.filledPart}
        d="M23.684 19.246a1.492 1.492 0 0 0-.998-.567l-2.503-.325a.503.503 0 0 1-.369-.246l-1.828-3.158h.434l.575.575c.283.283.654.424 1.026.424s.742-.14 1.025-.424a1.453 1.453 0 0 0 0-2.05l-1.004-1.003a1.444 1.444 0 0 0-1.025-.424l-2.937.002a1.98 1.98 0 0 0-.462-.235A2.48 2.48 0 0 0 16 10.5a2.5 2.5 0 1 0-5 0c0 .984.574 1.827 1.4 2.235l-.97.49-.87-.868c-.584-.585-1.536-.585-2.12 0s-.586 1.537 0 2.122l1.701 1.701a1.502 1.502 0 0 0 1.716.288l1.378-.67.223.385-2.11 2.254a1.504 1.504 0 0 0-.24 1.708l1.552 3.037a1.502 1.502 0 0 0 2.019.653c.356-.182.62-.492.744-.874.123-.38.09-.787-.094-1.147l-.961-1.846 1.524-1.023 1.998 1.806c.24.26.565.426.915.469l3.51.436a1.506 1.506 0 0 0 1.673-1.303 1.488 1.488 0 0 0-.304-1.107z"
      />
    </svg>
  ),
  styles: {},
  rotateInRtl: true,
} as TeamsSvgIconSpec
