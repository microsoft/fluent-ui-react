import * as React from 'react'

export const disabledStyle: React.CSSProperties = {
  opacity: 0.45,
  cursor: 'not-allowed',
}

export const fittedStyle: React.CSSProperties = {
  margin: 0,
}

export const overflowWrapStyle: React.CSSProperties = {
  overflow: 'overlay',
  overflowWrap: 'break-word',
}

export const primaryActiveStyle: React.CSSProperties = {
  backgroundColor: '#464775',
}

export const secondaryActiveStyle: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,.25)',
}

export const truncateStyle: React.CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}
