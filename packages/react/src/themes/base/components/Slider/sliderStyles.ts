import * as _ from 'lodash'

import { SliderVariables } from './sliderVariables'
import { SliderProps, SliderState } from '../../../../components/Slider/Slider'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { selectors } from '../../../../styles/selectors'

const getTrackColor = (p: SliderProps, v: SliderVariables) => {
  const min = _.toNumber(p.min)
  const max = _.toNumber(p.max)
  const value = _.toNumber(p.value)
  const percentage = (100 * (value - min)) / (max - min)

  // this ensures the track has 'trackColor' color before the thumb and 'trackColorRight' color after the thumb
  return (
    `linear-gradient(to right, ${v.trackColor} 0%, ${v.trackColor} ${percentage}%,` +
    ` ${v.trackColorRight} ${percentage}%, ${v.trackColorRight} 100%)`
  )
}

const sliderStyles: ComponentSlotStylesInput<SliderProps & SliderState, SliderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',

    ...(p.vertical && { flexDirection: 'column' }),
    ...(p.fluid && !p.vertical && { width: '100%' }),
    ...(p.disabled && { pointerEvents: 'none' }),
  }),

  inputWrapper: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    height: v.height,
    width: v.width,

    ...(p.vertical && { height: v.width, width: v.height }),
    ...(p.fluid && !p.vertical && { width: '100%' }),
  }),

  input: ({ props: p, variables: v }): ICSSInJSStyle => {
    const transformOriginValue = `calc(${v.width} / 2)`

    const thumbStyles: React.CSSProperties = {
      cursor: 'pointer',
      border: 0,
      borderRadius: '100%',
      height: v.thumbHeight,
      width: v.thumbWidth,
      marginTop: `calc((${v.trackWidth} - ${v.thumbHeight}) / 2)`,
      background: v.thumbColor,
      ...(p.disabled && { background: v.disabledThumbColor }),
    }

    const trackStyles: React.CSSProperties = {
      cursor: 'pointer',
      border: 0,
      height: v.trackWidth,
      background: getTrackColor(p, v),
      ...(p.disabled && { background: v.disabledTrackColor }),
    }

    return {
      '-webkit-appearance': 'none',
      margin: 0,
      padding: 0,
      backgroundColor: 'transparent',
      height: v.height,
      width: v.width,

      [selectors.WEBKIT_TRACK]: trackStyles,
      [selectors.MOZ_TRACK]: trackStyles,
      [selectors.MS_TRACK]: trackStyles,

      [selectors.WEBKIT_THUMB]: { '-webkit-appearance': 'none', ...thumbStyles },
      [selectors.MOZ_THUMB]: thumbStyles,
      [selectors.MS_THUMB]: { ...thumbStyles, marginTop: 0 },

      [selectors.MS_FILL_LOWER]: { display: 'none' },
      [selectors.MS_FILL_UPPER]: { display: 'none' },

      ...(p.vertical && {
        transform: 'rotate(-90deg)',
        transformOrigin: `${transformOriginValue} ${transformOriginValue}`,
      }),

      ...(p.fluid && !p.vertical && { width: '100%' }),

      ':focus': { outline: 0 },
    }
  },

  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    cursor: 'pointer',
    color: v.iconColor,
    width: v.iconSize,
    height: v.iconSize,

    ...(p.vertical && p.iconPosition === 'start' && { marginBottom: v.iconSpace }),
    ...(p.vertical && p.iconPosition !== 'start' && { marginTop: v.iconSpace }),
    ...(!p.vertical && p.iconPosition === 'start' && { marginRight: v.iconSpace }),
    ...(!p.vertical && p.iconPosition !== 'start' && { marginLeft: v.iconSpace }),

    ...(p.disabled && { background: v.disabledIconColor }),
  }),
}

export default sliderStyles
