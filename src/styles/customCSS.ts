import { ICSSInJSStyle } from '../../types/theme'

export const disabledStyle: ICSSInJSStyle = {
  backgroundColor: '#edebe9', // gray12
  borderColor: 'transparent',
  color: '#e1dfdd', // gray08
  cursor: 'default',
}

export const fittedStyle: ICSSInJSStyle = {
  margin: 0,
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
