import fontAwesomeIcons from './fontAwesomeIconStyles'
import { disabledStyle, fittedStyle } from '../../../../styles/customCSS'
import { ICSSInJSStyle } from '../../../../../types/theme'
import { IconXSpacing } from '../../../../components/Icon/Icon'

const sizes = new Map([
  ['micro', 0.3],
  ['mini', 0.4],
  ['tiny', 0.5],
  ['small', 0.75],
  ['normal', 1],
  ['large', 1.5],
  ['big', 2],
  ['huge', 4],
  ['massive', 8],
])

const getFontIcon = (font, name) => {
  let content = ''
  let fontFamily = 'Icons'

  switch (font) {
    case 'FontAwesome':
    default: {
      fontFamily = name && name.includes('outline') ? 'outline-icons' : 'Icons'
      content = (name && `'\\${fontAwesomeIcons(name)}'`) || '?'
      break
    }
  }

  return { content, fontFamily }
}

const getSize = size => `${sizes.get(size)}em`

const getFontStyles = (font, name, size): ICSSInJSStyle => {
  const { fontFamily, content } = getFontIcon(font, name)

  return {
    fontFamily,
    width: '1.18em',
    fontStyle: 'normal',
    fontWeight: 400,
    textDecoration: 'inherit',
    textAlign: 'center',

    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    backfaceVisibility: 'hidden',

    lineHeight: 1,

    '::before': {
      content,
      boxSizing: 'inherit',
      background: '0 0',
    },
  }
}

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

const getBorderedStyles = (isFontBased, circular, borderColor, color): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(isFontBased),

    // TODO: "black" here should actually match the Icon's fill or text color
    boxShadow: `0 0 0 0.05em ${borderColor || color || 'black'} inset`,
    ...(circular ? { borderRadius: '50%' } : {}),
  }
}

const getPaddedStyle = (isFontBased): ICSSInJSStyle => ({
  padding: `0.5em ${isFontBased ? 0 : '0.5em'}`,
  width: '2em',
  height: '2em',
})

const iconStyles = {
  root: ({
    props: { disabled, font, svg, name, size, bordered, circular, xSpacing },
    variables: v,
  }): ICSSInJSStyle => {
    const isFontBased = !svg

    return {
      display: 'inline-block',
      fontSize: getSize(size),

      width: '1em',
      height: '1em',

      ...(isFontBased ? getFontStyles(font, name, size) : {}),

      ...(isFontBased && { color: v.color }),
      backgroundColor: v.backgroundColor,

      opacity: 1,
      margin: v.margin,

      speak: 'none',

      verticalAlign: 'middle',
      overflow: 'hidden',

      ...getXSpacingStyles(xSpacing, v.horizontalSpace),

      ...((bordered || v.borderColor || circular) &&
        getBorderedStyles(isFontBased, circular, v.borderColor, v.color)),

      ...(disabled && disabledStyle),
    }
  },

  svg: ({ variables: v }): ICSSInJSStyle => ({
    fill: v.color,
  }),
}

export default iconStyles
