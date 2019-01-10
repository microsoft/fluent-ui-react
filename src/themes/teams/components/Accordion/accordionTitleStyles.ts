import { ICSSInJSStyle } from '../../../types'
import { getSideArrow } from '../../utils'

const accordionTitleStyles = {
  root: ({ props, theme }): ICSSInJSStyle => {
    const { active } = props
    const { arrowDown } = theme.siteVariables
    const sideArrow = getSideArrow(theme)
    return {
      display: 'inline-block',
      verticalAlign: 'middle',
      padding: '.5rem 0',
      cursor: 'pointer',
      '::before': {
        userSelect: 'none',
        content: active ? `"${arrowDown}"` : `"${sideArrow}"`,
      },
    }
  },
}

export default accordionTitleStyles
