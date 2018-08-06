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

const getSize = (size, isFontBased) =>
  isFontBased ? `${sizes.get(size)}em` : `${sizes.get(size)}rem`

const getFontStyles = (font, name, size) => {
  const { fontFamily, content } = getFontIcon(font, name)

  return {
    fontFamily,
    width: '1.18em',
    height: '1em',
    fontSize: getSize(size, true),
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

const getBorderedStyles = (
  isFontBased,
  circular,
  borderColor,
  color,
  size,
): React.CSSProperties => {
  const borderWidth = isFontBased ? '0.05em' : `${0.05 * sizes.get(size)}rem`

  return {
    ...getPaddedStyle(isFontBased, size),

    boxShadow: `0 0 0 ${borderWidth} ${borderColor || color || 'black'} inset`,
    ...(circular ? { borderRadius: '50%' } : {}),
  }
}

const getPaddedStyle = (isFontBased, size) => ({
  padding: isFontBased ? '0.5em 0' : `${0.5 * sizes.get(size)}rem`,
  width: isFontBased ? '2em' : `${2 * sizes.get(size)}rem`,
  height: isFontBased ? '2em' : `${2 * sizes.get(size)}rem`,
})

const iconRules = {
  root: ({
    props: { disabled, font, name, size, bordered, circular, xSpacing },
    variables: v,
  }: IconRulesParams) => {
    const isFontBased = !!font

    return {
      display: 'inline-block',
      width: getSize(size, isFontBased),
      height: getSize(size, isFontBased),

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
        getBorderedStyles(isFontBased, circular, v.borderColor, v.color, size)),

      ...(v.backgroundColor && {
        ...getPaddedStyle(isFontBased, size),
        ...(bordered || v.borderColor || { boxShadow: 'none' }),
      }),

      ...(disabled && disabledStyle),
    }
  },

  svg: ({ variables: v }) => ({
    fill: v.color,
  }),
}

export default iconRules
