import { SliderVariables } from './sliderVariables'
import { SliderProps, SliderState } from '../../../../components/Slider/Slider'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { selectors } from '../../../../styles/selectors'

const getSliderSlotStyles = (p: SliderProps, v: SliderVariables, slot: 'rail' | 'track') => ({
  cursor: 'pointer',
  pointerEvents: 'none',
  position: 'absolute',
  border: 0,
  height: v.railHeight,
  marginTop: `calc(${v.height} / 2 - ${v.railHeight} / 2)`,

  ...(slot === 'rail' && { width: '100%', background: v.railColor }),
  ...(slot === 'track' && { background: v.trackColor }),
  ...(p.disabled && slot === 'rail' && { background: v.disabledRailColor }),
  ...(p.disabled && slot === 'track' && { background: v.disabledTrackColor }),
})

const getFluidStyles = (p: SliderProps) => p.fluid && !p.vertical && { width: '100%' }

const sliderStyles: ComponentSlotStylesInput<SliderProps & SliderState, SliderVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',

    ...(p.vertical && { flexDirection: 'column' }),
    ...(p.disabled && { pointerEvents: 'none' }),
    ...getFluidStyles(p),
  }),

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

  input: ({ props: p, variables: v }) => {
    const thumbStyles = { border: 0, width: '1px' }

    return {
      '-webkit-appearance': 'none',
      cursor: 'pointer',
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0,
      opacity: 0,

      [selectors.WEBKIT_THUMB]: {
        ...thumbStyles,
        '-webkit-appearance': 'none',
      },
      [selectors.MOZ_THUMB]: thumbStyles,
      [selectors.MS_THUMB]: {
        ...thumbStyles,
        marginTop: `calc(-${v.thumbHeight} / 2)`,
      },

      [selectors.MS_FILL_LOWER]: { display: 'none' },
      [selectors.MS_FILL_UPPER]: { display: 'none' },

      ':focus': { outline: 0 },
      ...getFluidStyles(p),
    }
  },

  rail: ({ props, variables }) => getSliderSlotStyles(props, variables, 'rail'),

  slider: ({ props: p, variables: v }) => {
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

  sliderWrapper: ({ props: p, variables: v }) => ({
    height: v.height,
    ...(p.vertical && {
      height: v.length,
      width: v.height,
    }),
    ...getFluidStyles(p),
  }),

  track: ({ props, variables }) => getSliderSlotStyles(props, variables, 'track'),

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
