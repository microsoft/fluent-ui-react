import * as React from 'react'
import { ThemeIconSpec, ThemeIcons, SvgIconSpec } from '../types'

import mergeThemes from '../../lib/mergeThemes'
import base from '../base'
import animations from './animations'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import fontFaces from './fontFaces'
import staticStyles from './staticStyles'

import { default as svgIconsAndStyles, teamsIconClassNames } from './components/Icon/svg'

import { TeamsSvgIconSpec, SvgIconSpecWithStyles } from './components/Icon/svg/types'
import cx from 'classnames'

const declareSvg = (svgIcon: SvgIconSpec): ThemeIconSpec => ({
  isSvg: true,
  icon: svgIcon,
})

export const getIcon = (iconAndMaybeStyles): SvgIconSpec => {
  return (iconAndMaybeStyles as any).styles
    ? (iconAndMaybeStyles as SvgIconSpecWithStyles).icon
    : (iconAndMaybeStyles as SvgIconSpec)
}

const themeIcons: ThemeIcons = Object.keys(svgIconsAndStyles as {
  [iconName: string]: TeamsSvgIconSpec
}).reduce<ThemeIcons>((accIcons, iconName) => {
  const iconAndMaybeStyles = svgIconsAndStyles[iconName]

  const icon: SvgIconSpec = getIcon(iconAndMaybeStyles)

  return { ...accIcons, ...{ [iconName]: declareSvg(icon) } }
}, {})

const circleIcon = declareSvg(({ classes }) => (
  <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
    <g>
      <path d="M16.5 9C12.4 9 9 12.4 9 16.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5S20.6 9 16.5 9zm0 14c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z" />
      <circle
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        cx="16"
        cy="16"
        r="8"
      />
    </g>
  </svg>
))

const icons: ThemeIcons = {
  ...themeIcons,
  'stardust-circle': circleIcon,
  'stardust-close': themeIcons['close'],
  'stardust-arrow-up': themeIcons['triangle-up'],
  'stardust-arrow-down': themeIcons['triangle-down'],
  'stardust-arrow-end': themeIcons['triangle-right'],
  'stardust-pause': themeIcons['pause'],
  'stardust-play': themeIcons['play'],
}

export default mergeThemes(base, {
  siteVariables,
  componentVariables,
  componentStyles,
  fontFaces,
  staticStyles,
  icons,
  animations,
})
