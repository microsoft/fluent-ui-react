import { ICSSInJSStyle } from '../../../types'

const accordionContentStyles = {
  root: ({ props }): ICSSInJSStyle => ({
    display: 'none',
    verticalAlign: 'middle',
    ...(props.active && { display: 'block' }),
    marginInlineStart: 0,
  }),
}

export default accordionContentStyles
