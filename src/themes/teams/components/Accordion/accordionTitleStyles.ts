import { ICSSInJSStyle } from '../../../types'

const accordionTitleStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '.5rem 0',
    cursor: 'pointer',
  }),
}

export default accordionTitleStyles
