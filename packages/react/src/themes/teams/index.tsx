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
      <path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.3c-3.5 0-6.3-2.8-6.3-6.3s2.8-6.3 6.3-6.3 6.3 2.8 6.3 6.3-2.8 6.3-6.3 6.3z" />
      <circle
        className={cx(teamsIconClassNames.filled, classes.filledPart)}
        cx="16"
        cy="16"
        r="7"
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
