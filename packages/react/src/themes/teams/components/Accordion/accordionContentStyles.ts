import { ICSSInJSStyle } from '../../../types'

const accordionContentStyles = {
  root: ({ props }): ICSSInJSStyle => ({
    display: 'none',
    verticalAlign: 'middle',
    marginLeft: '24px',
    ...(props.active && { display: 'block' }),
    ...(props.indented && {
      // marginLeft should be IndicatorWidth + IconWidth
      marginLeft: '48px',
    }),
  }),
}

export default accordionContentStyles
