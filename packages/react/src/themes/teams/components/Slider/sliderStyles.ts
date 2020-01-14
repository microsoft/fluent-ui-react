import * as React from 'react'
import { SliderVariables } from './sliderVariables'
import Slider, { SliderProps, SliderState } from '../../../../components/Slider/Slider'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const selectors = {
  WEBKIT_THUMB: '::-webkit-slider-thumb',
  MOZ_THUMB: '::-moz-range-thumb',
  MS_FILL_LOWER: '::-ms-fill-lower',
  MS_FILL_UPPER: '::-ms-fill-upper',
  MS_THUMB: '::-ms-thumb',
}

const getCommonSlotStyles = (p: SliderProps, v: SliderVariables): ICSSInJSStyle => ({
  cursor: 'pointer',
  pointerEvents: 'none',
  position: 'absolute',
  border: 0,
  height: v.railHeight,
  marginTop: `calc(${v.height} / 2 - ${v.railHeight} / 2)`,
})

// this selector is used to identify the thumb slot from a previous sibling
const thumbFromPreviousSiblingSelector = `&+ .${Slider.slotClassNames.thumb}`

const getFluidStyles = (p: SliderProps) => p.fluid && !p.vertical && { width: '100%' }

const sliderStyles: ComponentSlotStylesPrepared<SliderProps & SliderState, SliderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    height: v.height,

    ...(p.disabled && { pointerEvents: 'none' }),
    ...(p.vertical && { height: v.length, width: v.height }),
    ...getFluidStyles(p),
  }),

  input: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const activeThumbStyles: React.CSSProperties = {
      height: v.activeThumbHeight,
      width: v.activeThumbWidth,
      background: v.activeThumbColor,
      marginTop: `calc(${v.height} / 2  - ${v.activeThumbHeight} / 2)`,
      marginLeft: `calc(-${v.activeThumbWidth} / 2)`,
    }
    const borderFocusStyles = getBorderFocusStyles({
      siteVariables,
      borderPadding: v.thumbBorderPadding,
    })
    const thumbStyles = { border: 0, width: '1px' }

    return {
      '-webkit-appearance': 'none',
      cursor: 'pointer',
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0,
      opacity: 0,

      [selectors.WEBKIT_THUMB]: { ...thumbStyles, '-webkit-appearance': 'none' },
      [selectors.MOZ_THUMB]: thumbStyles,
      [selectors.MS_THUMB]: { ...thumbStyles, marginTop: `calc(-${v.thumbHeight} / 2)` },

      [selectors.MS_FILL_LOWER]: { display: 'none' },
      [selectors.MS_FILL_UPPER]: { display: 'none' },

      ...getFluidStyles(p),

      ':active': { [thumbFromPreviousSiblingSelector]: activeThumbStyles },

      ':focus': {
        outline: 0, // TODO: check if this is correct
        [thumbFromPreviousSiblingSelector]: borderFocusStyles[':focus'],
      },
      ':focus-visible': {
        [thumbFromPreviousSiblingSelector]: {
          ...borderFocusStyles[':focus-visible'],
          ...activeThumbStyles,
        },
      },
    }
  },

  inputWrapper: ({ props: p, variables: v }) => {
    const transformOriginValue = `calc(${v.length} / 2)`

    return {
      position: 'relative',
      display: 'inline-block',
      height: v.height,
      width: v.length,
      ...(p.vertical && {
        transform: 'rotate(-90deg)',
        transformOrigin: `${transformOriginValue} ${transformOriginValue}`,
      }),
      ...getFluidStyles(p),
    }
  },

  rail: ({ props: p, variables: v }) => ({
    width: '100%',
    background: v.railColor,

    ...getCommonSlotStyles(p, v),
    ...(p.disabled && { background: v.disabledRailColor }),
  }),

  track: ({ props: p, variables: v }) => ({
    background: v.trackColor,

    ...getCommonSlotStyles(p, v),
    ...(p.disabled && { background: v.disabledTrackColor }),
  }),

  thumb: ({ props: p, variables: v }) => ({
    border: 0,
    borderRadius: '100%',
    cursor: 'pointer',
    pointerEvents: 'none',
    position: 'absolute',

    background: v.thumbColor,
    height: v.thumbHeight,
    width: v.thumbWidth,
    marginTop: `calc(${v.height} / 2  - ${v.thumbHeight} / 2)`,
    marginLeft: `calc(-${v.thumbWidth} / 2)`,

    ...(p.disabled && { background: v.disabledThumbColor }),
  }),
}

export default sliderStyles
