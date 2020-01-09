import { SliderVariables } from './sliderVariables'
import Slider, { SliderProps } from '../../../../components/Slider/Slider'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'

export const selectors = {
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
export const thumbFromPreviousSiblingSelector = `&+ .${Slider.slotClassNames.thumb}`

const getFluidStyles = (p: SliderProps) => p.fluid && !p.vertical && { width: '100%' }

const sliderStyles: ComponentSlotStylesPrepared<SliderProps, SliderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    height: v.height,

    ...(p.disabled && { pointerEvents: 'none' }),
    ...(p.vertical && { height: v.length, width: v.height }),
    ...getFluidStyles(p),
  }),

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
