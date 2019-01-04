import { ICSSInJSStyle } from '../../../types'
import constants from '../../constants'

const accordionTitleStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '.5rem 0',
    cursor: 'pointer',
  }),
  arrow: ({ props }): ICSSInJSStyle => {
    const { active } = props
    const { arrowDown, arrowRight } = constants.unicodeCharacters
    return {
      '::before': {
        userSelect: 'none',
        content: active ? `"${arrowDown}"` : `"${arrowRight}"`,
      },
    }
  },
}

export default accordionTitleStyles
