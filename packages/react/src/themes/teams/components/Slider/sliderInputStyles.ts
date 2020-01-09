import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { SliderInputProps } from '../../../../components/Slider/SliderInput'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import { selectors, thumbFromPreviousSiblingSelector } from './sliderStyles'
import { SliderVariables } from './sliderVariables'

const getFluidStyles = (p: SliderInputProps) => p.fluid && !p.vertical && { width: '100%' }

const sliderInputStyles: ComponentSlotStylesPrepared<SliderInputProps, SliderVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const activeThumbStyles: ICSSInJSStyle = {
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
}

export default sliderInputStyles
