import fontAwesomeIcons from './fontAwesomeIconStyles'
import { disabledStyle, fittedStyle } from '../../../../styles/customCSS'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IconXSpacing } from '../../../../components/Icon/Icon'

const sizes = new Map([
  ['mini', 0.4],
  ['tiny', 0.5],
  ['small', 0.75],
  ['large', 1.5],
  ['big', 2],
  ['huge', 4],
  ['massive', 8],
])

const getIcon = (kind, name) => {
  let content = ''
  let fontFamily = 'Icons'

  switch (kind) {
    case 'FontAwesome':
    default: {
      fontFamily = name && name.includes('outline') ? 'outline-icons' : 'Icons'
      content = (name && `'\\${fontAwesomeIcons(name)}'`) || '?'
      break
    }
  }

  return { content, fontFamily }
}

const getSize = size => `${sizes.get(size)}em` || '1em'

const getXSpacingStyles = (xSpacing: IconXSpacing, horizontalSpace: string): ICSSInJSStyle => {
  switch (xSpacing) {
    case 'none':
      return fittedStyle
    case 'before':
      return { ...fittedStyle, marginLeft: horizontalSpace }
    case 'after':
      return { ...fittedStyle, marginRight: horizontalSpace }
    case 'both':
      return { ...fittedStyle, margin: `0 ${horizontalSpace}` }
  }
}

const getBorderedStyles = (circular, borderColor, color): ICSSInJSStyle => ({
  lineHeight: '1',
  padding: '0.5em 0',
  boxShadow: `0 0 0 0.1em ${borderColor || color || 'black'} inset`,
  width: '2em',
  height: '2em',
  ...(circular ? { borderRadius: '50%' } : { verticalAlign: 'baseline' }),
})

const iconStyles: IComponentPartStylesInput = {
  root: ({
    props: { color, disabled, kind, name, size, bordered, circular, xSpacing },
    variables,
  }): ICSSInJSStyle => {
    const { fontFamily, content } = getIcon(kind, name)
    const iconColor = color || variables.color

    return {
      fontFamily,
      color: iconColor,
      display: 'inline-block',
      opacity: 1,
      margin: variables.margin,
      width: '1.18em',
      height: '1em',
      fontSize: getSize(size),
      fontStyle: 'normal',
      fontWeight: 400,
      textDecoration: 'inherit',
      textAlign: 'center',
      speak: 'none',
      backfaceVisibility: 'hidden',
      verticalAlign: 'middle',
      lineHeight: 1,

      '::before': {
        content,
        boxSizing: 'inherit',
        background: '0 0',
      },

      ...(disabled && disabledStyle),

      ...getXSpacingStyles(xSpacing, variables.horizontalSpace),

      ...((bordered || circular) && getBorderedStyles(circular, variables.borderColor, iconColor)),
    }
  },
}

export default iconStyles
