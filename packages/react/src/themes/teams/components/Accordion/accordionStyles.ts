import { ICSSInJSStyle } from '../../../types'

const accordionStyles = {
  root: (): ICSSInJSStyle => ({
    verticalAlign: 'middle',
    display: 'flex',
    flexDirection: 'column',
    marginBlockEnd: 0,
    marginBlockStart: 0,
  }),
  expandedContent: (): ICSSInJSStyle => ({
    display: 'block',
  }),
  collapsedContent: (): ICSSInJSStyle => ({
    display: 'none',
  }),
}

export default accordionStyles
