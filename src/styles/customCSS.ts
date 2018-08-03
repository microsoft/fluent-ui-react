import { ICSSInJSStyle } from '../../types/theme'

export const disabledStyle: ICSSInJSStyle = {
  opacity: 0.45,
  cursor: 'not-allowed',
}

export const fittedStyle: ICSSInJSStyle = {
  margin: 0,
  width: 'auto',
}

export const truncateStyle: ICSSInJSStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export const overflowWrapStyle: ICSSInJSStyle = {
  overflow: 'overlay',
  overflowWrap: 'break-word',
}
