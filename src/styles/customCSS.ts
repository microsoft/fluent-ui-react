import { CSSProperties } from 'react'

export const disabledStyle: CSSProperties = {
  opacity: 0.45,
  cursor: 'not-allowed',
}

export const fittedStyle: CSSProperties = {
  margin: 0,
  width: 'auto',
}

export const truncateStyle: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export const overflowWrapStyle: CSSProperties = {
  overflow: 'overlay',
  overflowWrap: 'break-word',
}
