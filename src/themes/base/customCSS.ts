import { ICSSInJSStyle } from '../types'

export const disabledStyle: ICSSInJSStyle = {
  opacity: 0.45,
  cursor: 'not-allowed',
}

export const fittedStyle: ICSSInJSStyle = {
  margin: 0,
}

export const truncateStyle: ICSSInJSStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}
