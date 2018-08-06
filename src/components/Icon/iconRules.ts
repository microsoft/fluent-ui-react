import fontAwesomeIcons from './fontAwesomeIconRules'
import { disabledStyle, fittedStyle } from '../../styles/customCSS'
import { IconXSpacing } from './Icon'
import { IconVariables } from './iconVariables'
import * as React from 'react'

export interface IconRulesParams {
  props: any
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

const getXSpacingStyles = (
  xSpacing: IconXSpacing,
  horizontalSpace: string,
): React.CSSProperties => {
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

const paddedStyle: React.CSSProperties = {
  padding: '0.5em 0',
  width: '2em',
  height: '2em',
}

const getBorderedStyles = (circular, borderColor, color): React.CSSProperties => ({
  ...paddedStyle,
  boxShadow: `0 0 0 0.1em ${borderColor || color || 'black'} inset`,
  ...(circular ? { borderRadius: '50%' } : {}),
})

const iconRules = {
  root: ({
    props: { disabled, kind, name, size, bordered, circular, xSpacing },
    variables: v,
  }: IconRulesParams) => {
    const { fontFamily, content } = getIcon(kind, name)

    return {
      fontFamily,
      color: v.color,
      backgroundColor: v.backgroundColor,
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

      ...getXSpacingStyles(xSpacing, v.horizontalSpace),

      ...((bordered || v.borderColor || circular) &&
        getBorderedStyles(circular, v.borderColor, v.color)),

      ...(v.backgroundColor && {
        ...paddedStyle,
        ...(bordered || v.borderColor || { boxShadow: 'none' }),
      }),

      '::before': {
        content,
        boxSizing: 'inherit',
        background: '0 0',
      },

      ...(disabled && disabledStyle),
    }
  },
}

export default iconRules
