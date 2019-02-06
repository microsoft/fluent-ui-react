import * as React from 'react'
import cx from 'classnames'
import { TeamsProcessedSvgIconSpec } from '../types'
import { teamsIconClassNames } from '../teamsIconClassNames'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={cx(teamsIconClassNames.outline, classes.outlinePart)}>
          <path d="M16 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-15c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11.5c-1.4 0-2.8-.5-3.9-1.6l.7-.7c1.8 1.8 4.6 1.8 6.4 0l.7.7c-1 1-2.5 1.6-3.9 1.6z" />
          <circle cx="13" cy="15" r="1" />
          <circle cx="19" cy="15" r="1" />
        </g>
        <path
          className={cx(teamsIconClassNames.filled, classes.filledPart)}
          d="M24 16.734a7.069 7.069 0 0 1-.262 1.926A7.464 7.464 0 0 1 23 20.395 7.285 7.285 0 0 1 20.395 23a7.381 7.381 0 0 1-1.734.734 7.036 7.036 0 0 1-1.927.266h-.468a7.031 7.031 0 0 1-1.926-.262A7.381 7.381 0 0 1 12.605 23 7.285 7.285 0 0 1 10 20.395a7.4 7.4 0 0 1-.734-1.734A7.031 7.031 0 0 1 9 16.734v-.468a7.033 7.033 0 0 1 .262-1.926A7.4 7.4 0 0 1 10 12.605 7.285 7.285 0 0 1 12.605 10a7.443 7.443 0 0 1 1.734-.734A7.05 7.05 0 0 1 16.266 9h.469a7.055 7.055 0 0 1 1.926.262 7.443 7.443 0 0 1 1.734.738A7.285 7.285 0 0 1 23 12.605a7.464 7.464 0 0 1 .734 1.734A7.071 7.071 0 0 1 24 16.266v.469zm-3.867 2.438l-.7-.7a4.154 4.154 0 0 1-5.859 0l-.7.7a5.1 5.1 0 0 0 1.664 1.113 5.109 5.109 0 0 0 3.938 0 5.114 5.114 0 0 0 1.657-1.113zM15 15a.984.984 0 0 0-.078-.387 1 1 0 0 0-.535-.535 1 1 0 0 0-.773 0 1 1 0 0 0-.535.535 1 1 0 0 0 0 .773 1 1 0 0 0 .535.535 1 1 0 0 0 .773 0 1 1 0 0 0 .535-.535A.981.981 0 0 0 15 15zm5 0a.984.984 0 0 0-.078-.387 1 1 0 0 0-.535-.535 1 1 0 0 0-.773 0 1 1 0 0 0-.535.535 1 1 0 0 0 0 .773 1 1 0 0 0 .535.535 1 1 0 0 0 .773 0 1 1 0 0 0 .535-.535A.981.981 0 0 0 20 15z"
        />
      </g>
    </svg>
  ),
  styles: {},
  exportedAs: 'emoji',
} as TeamsProcessedSvgIconSpec
