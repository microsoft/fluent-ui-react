import * as React from 'react'

export const truncateStyle: React.CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export const overflowWrap: React.CSSProperties = {
  overflow: 'overlay',
  overflowWrap: 'break-word',
}
