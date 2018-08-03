import { ICSSInJSStyle } from '../../../../../types/theme'

const accordionContentStyles = {
  root: ({ props }): ICSSInJSStyle => ({
    display: 'none',
    verticalAlign: 'middle',
    ...(props.active && { display: 'block' }),
  }),
}

export default accordionContentStyles
