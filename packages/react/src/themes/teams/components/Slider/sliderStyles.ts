import * as React from 'react'
import { SliderVariables } from './sliderVariables'
import Slider, { SliderProps } from '../../../../components/Slider/Slider'
import { ComponentSelectorsAndStyles, ICSSInJSStyle } from '../../../types'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { backportComponentStyle } from '../../../../lib/resolveComponentRules'

const selectors = {
  WEBKIT_THUMB: '::-webkit-slider-thumb',
  MOZ_THUMB: '::-moz-range-thumb',
  MS_FILL_LOWER: '::-ms-fill-lower',
  MS_FILL_UPPER: '::-ms-fill-upper',
  MS_THUMB: '::-ms-thumb',
}

const getCommonSlotStyles = (v: SliderVariables): ICSSInJSStyle => ({
  cursor: 'pointer',
  pointerEvents: 'none',
  position: 'absolute',
  border: 0,
  height: v.railHeight,
  marginTop: `calc(${v.height} / 2 - ${v.railHeight} / 2)`,
})

// this selector is used to identify the thumb slot from a previous sibling
const thumbFromPreviousSiblingSelector = `&+ .${Slider.slotClassNames.thumb}`

const sliderStyles: ComponentSelectorsAndStyles<SliderProps, SliderVariables> = v => {
  const thumbStyles = { border: 0, width: '1px' }

  const activeThumbStyles: React.CSSProperties = {
    height: v.activeThumbHeight,
    width: v.activeThumbWidth,
    background: v.activeThumbColor,
    marginTop: `calc(${v.height} / 2  - ${v.activeThumbHeight} / 2)`,
    marginLeft: `calc(-${v.activeThumbWidth} / 2)`,
  }

  const transformOriginValue = `calc(${v.length} / 2)`

  const borderFocusStyles = getBorderFocusStyles({
    siteVariables: {
      borderWidth: v.focusBorderWidth,
      borderRadius: v.focusBorderRadius,
      focusInnerBorderColor: v.focusInnerBorderColor,
      focusOuterBorderColor: v.focusOuterBorderColor,
    },
    borderPadding: v.thumbBorderPadding,
  })

  return {
    root: [
      [null, { height: v.height }],
      [{ disabled: true }, { pointerEvents: 'none' }],
      [{ vertical: true }, { height: v.length, width: v.height }],
      [{ fluid: true, vertical: false }, { width: '100%' }],
    ],

    input: [
      [
        null,
        {
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
          ':active': { [thumbFromPreviousSiblingSelector]: activeThumbStyles },
          ':focus': {
            outline: 0,
            [thumbFromPreviousSiblingSelector]: borderFocusStyles[':focus'],
          },
          ':focus-visible': {
            [thumbFromPreviousSiblingSelector]: {
              ...borderFocusStyles[':focus-visible'],
              ...activeThumbStyles,
            },
          },
        },
      ],
      [{ fluid: true, vertical: false }, { width: '100%' }],
    ],

    inputWrapper: [
      [
        null,
        {
          position: 'relative',
          display: 'inline-block',
          height: v.height,
          width: v.length,
        },
      ],
      [
        { vertical: true },
        {
          transform: 'rotate(-90deg)',
          transformOrigin: `${transformOriginValue} ${transformOriginValue}`,
        },
      ],
      [{ fluid: true, vertical: false }, { width: '100%' }],
    ],

    rail: [
      [
        null,
        {
          width: '100%',
          background: v.railColor,
          ...getCommonSlotStyles(v),
        },
      ],
      [{ disabled: true }, { background: v.disabledRailColor }],
    ],

    track: [
      [
        null,
        {
          background: v.trackColor,
          ...getCommonSlotStyles(v),
        },
      ],
      [{ disabled: true }, { background: v.disabledTrackColor }],
    ],

    thumb: [
      [
        null,
        {
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
        },
      ],
      [{ disabled: true }, { background: v.disabledThumbColor }],
    ],
  }
}

export default backportComponentStyle(sliderStyles)
