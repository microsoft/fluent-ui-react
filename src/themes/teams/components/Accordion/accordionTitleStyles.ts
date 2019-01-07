import { ICSSInJSStyle } from '../../../types'

const accordionTitleStyles = {
  root: ({ props, theme }): ICSSInJSStyle => {
    const { active } = props
    const { arrowDown, arrowRight } = theme.siteVariables
    return {
      display: 'inline-block',
      verticalAlign: 'middle',
      padding: '.5rem 0',
      cursor: 'pointer',
      '::before': {
        userSelect: 'none',
        content: active ? `"${arrowDown}"` : `"${arrowRight}"`,
      },
    }
  },
}

export default accordionTitleStyles
