import { ICSSInJSStyle } from '../../../types'

const accordionStyles = {
  root: (): ICSSInJSStyle => ({
    verticalAlign: 'middle',
    display: 'flex',
    flexDirection: 'column',
    marginBlockEnd: 0,
    marginBlockStart: 0,
  }),
}

export default accordionStyles
