import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path
          className={classes.outlinePart}
          d="M18.989 8.853a6.019 6.019 0 0 1 2.17 2.17c.535.911.803 1.908.803 2.989 0 .719-.128 1.418-.384 2.096a5.943 5.943 0 0 1-1.099 1.832l-1.623 1.863a.485.485 0 0 1-.372.171.454.454 0 0 1-.326-.124.45.45 0 0 1-.171-.365c0-.135.042-.245.125-.334l1.615-1.863c.398-.455.705-.965.92-1.529a4.885 4.885 0 0 0 .322-1.747c0-.901-.223-1.732-.668-2.492a4.973 4.973 0 0 0-1.809-1.809A4.856 4.856 0 0 0 16 9.045c-.901 0-1.732.223-2.492.667a4.973 4.973 0 0 0-1.809 1.809 4.847 4.847 0 0 0-.667 2.492 4.95 4.95 0 0 0 1.234 3.268l1.622 1.871a.46.46 0 0 1 .125.326.47.47 0 0 1-.17.373.459.459 0 0 1-.326.124.47.47 0 0 1-.373-.171l-1.623-1.863a5.962 5.962 0 0 1-1.483-3.928c0-1.077.268-2.071.803-2.985a5.994 5.994 0 0 1 2.174-2.174 5.8 5.8 0 0 1 2.986-.804c1.081 0 2.077.268 2.988.803zm-.652 12.263c.098.098.148.215.148.349s-.05.251-.148.349a.478.478 0 0 1-.349.147h-3.975a.465.465 0 0 1-.353-.155.494.494 0 0 1-.144-.341c0-.14.052-.258.155-.353a.49.49 0 0 1 .342-.144h3.975c.134 0 .251.05.349.148zm-.496 1.988a.478.478 0 0 1 .147.349.476.476 0 0 1-.147.349.479.479 0 0 1-.349.148H14.51a.459.459 0 0 1-.352-.156.49.49 0 0 1-.144-.342c0-.139.052-.257.156-.353a.49.49 0 0 1 .341-.144h2.982c.133.001.249.05.348.149z"
        />
        <path
          className={classes.filledPart}
          d="M18.973 8.804a6.019 6.019 0 0 1 2.17 2.17c.535.911.803 1.907.803 2.989 0 .719-.128 1.418-.384 2.096a5.943 5.943 0 0 1-1.099 1.832l-1.623 1.863a.47.47 0 0 1-.372.171H13.5a.471.471 0 0 1-.373-.171l-1.622-1.863a5.962 5.962 0 0 1-1.483-3.928c0-1.077.268-2.071.803-2.985a5.994 5.994 0 0 1 2.174-2.174A5.794 5.794 0 0 1 15.984 8c1.082 0 2.078.268 2.989.804zm-4.976 12.114a.46.46 0 0 0-.353.156.493.493 0 0 0-.144.342c0 .139.052.257.156.353a.493.493 0 0 0 .342.144h3.975c.135 0 .251-.049.349-.147s.148-.215.148-.349a.473.473 0 0 0-.148-.349.479.479 0 0 0-.349-.148h-3.976zm.496 1.988a.46.46 0 0 0-.353.156.494.494 0 0 0-.144.341c0 .14.052.258.156.353a.49.49 0 0 0 .341.144h2.981c.135 0 .251-.05.349-.148s.148-.214.148-.349a.473.473 0 0 0-.148-.349.479.479 0 0 0-.349-.148h-2.981z"
        />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
