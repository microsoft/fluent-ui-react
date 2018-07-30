import fontAwesomeIcons from './fontAwesomeIconRules'
import { disabledStyle, fittedStyle } from '../../styles/customCSS'
import { IconProps, IconXSpacing } from './Icon'
import { IconVariables } from './iconVariables'
import { CSSProperties } from '../../../node_modules/@types/react'

interface IconRulesParams {
  props: IconProps
  variables: IconVariables
}

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

const getXSpacingStyles = (xSpacing: IconXSpacing, horizontalSpace: string): CSSProperties => {
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

const getBorderedStyles = (circular, borderColor, color): CSSProperties => ({
  lineHeight: '1',
  padding: '0.5em 0',
  boxShadow: `0 0 0 0.1em ${borderColor || color || 'black'} inset`,
  width: '2em',
  height: '2em',
  ...(circular ? { borderRadius: '50%' } : { verticalAlign: 'baseline' }),
})

const iconRules = {
  root: ({
    props: { color, disabled, kind, name, size, bordered, circular, xSpacing },
    variables: v,
  }: IconRulesParams) => {
    const { fontFamily, content } = getIcon(kind, name)
    const iconColor = color || v.color

    return {
      fontFamily,
      color: iconColor,
      display: 'inline-block',
      opacity: 1,
      margin: v.margin,
      width: '1.18em',
      height: '1em',
      fontSize: getSize(size),
      fontStyle: 'normal',
      fontWeight: 400,
      textDecoration: 'inherit',
      textAlign: 'center',
      speak: 'none',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      backfaceVisibility: 'hidden',
      verticalAlign: 'middle',
      lineHeight: 1,

      '::before': {
        content,
        boxSizing: 'inherit',
        background: '0 0',
      },

      ...(disabled && disabledStyle),

      ...getXSpacingStyles(xSpacing, v.horizontalSpace),

      ...((bordered || circular) && getBorderedStyles(circular, v.borderColor, iconColor)),
    }
  },
}

export default iconRules
